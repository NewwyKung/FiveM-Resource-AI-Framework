import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const args = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
    const key = process.argv[i];
    if (!key.startsWith('--')) continue;
    const next = process.argv[i + 1];
    if (next && !next.startsWith('--')) {
        args.set(key, next);
        i += 1;
    } else {
        args.set(key, true);
    }
}

const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const metadata = readJson('resource.json');
const policy = readJson('release.config.json');
const resourceName = String(args.get('--name') || metadata.name || 'resource')
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, '-');
const outputRoot = path.join(root, policy.outputDirectory || 'release');
const skipUiBuild = args.has('--skip-ui-build');
const dryRun = args.has('--dry-run');

function parseVersion(value) {
    const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(String(value || ''));
    if (!match) throw new Error(`Invalid semantic version: ${value}`);
    return match.slice(1).map(Number);
}

function formatVersion(parts) {
    return parts.join('.');
}

function compareVersions(a, b) {
    for (let i = 0; i < 3; i += 1) {
        if (a[i] !== b[i]) return a[i] - b[i];
    }
    return 0;
}

function bumpVersion(parts, type) {
    const [major, minor, patch] = parts;
    if (type === 'major') return [major + 1, 0, 0];
    if (type === 'minor') return [major, minor + 1, 0];
    return [major, minor, patch + 1];
}

function resolveVersion() {
    if (args.get('--version')) return formatVersion(parseVersion(args.get('--version')));
    const current = parseVersion(metadata.version || '1.0.0');
    const released = fs.existsSync(outputRoot)
        ? fs.readdirSync(outputRoot)
            .map((name) => name.startsWith(`${resourceName}-`) ? name.slice(resourceName.length + 1) : null)
            .filter(Boolean)
            .map((value) => { try { return parseVersion(value); } catch { return null; } })
            .filter(Boolean)
        : [];
    if (released.length === 0) return formatVersion(current);
    const highest = released.reduce((max, item) => compareVersions(item, max) > 0 ? item : max, current);
    return formatVersion(bumpVersion(highest, args.get('--bump') || 'patch'));
}

const version = resolveVersion();
const releaseName = `${resourceName}-${version}`;
const destination = path.join(outputRoot, releaseName);

function run(command, commandArgs) {
    const result = spawnSync(command, commandArgs, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });
    if (result.status !== 0) throw new Error(`${command} ${commandArgs.join(' ')} failed.`);
}

function excluded(relativePath) {
    const normalized = relativePath.replaceAll('\\', '/');
    return (policy.exclude || []).some((pattern) => {
        if (pattern.startsWith('**/')) return normalized.endsWith(pattern.slice(3).replace('*', ''));
        if (pattern.includes('*')) {
            const regex = new RegExp(`^${pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replaceAll('**', '.*').replaceAll('*', '[^/]*')}$`);
            return regex.test(normalized);
        }
        return normalized === pattern;
    });
}

function copyEntry(source, target, relativePath) {
    if (excluded(relativePath)) return;
    const stat = fs.statSync(source);
    if (stat.isDirectory()) {
        fs.mkdirSync(target, { recursive: true });
        for (const child of fs.readdirSync(source)) {
            copyEntry(path.join(source, child), path.join(target, child), path.join(relativePath, child));
        }
        if (fs.existsSync(target) && fs.readdirSync(target).length === 0) fs.rmSync(target, { recursive: true, force: true });
        return;
    }
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(source, target);
}

function scrubJson(value, secretKeys, changes, prefix = '') {
    if (Array.isArray(value)) return value.map((item, index) => scrubJson(item, secretKeys, changes, `${prefix}[${index}]`));
    if (!value || typeof value !== 'object') return value;
    for (const [key, child] of Object.entries(value)) {
        const location = prefix ? `${prefix}.${key}` : key;
        if (secretKeys.has(key.toLowerCase()) && child != null && child !== '') {
            value[key] = null;
            changes.push(location);
        } else {
            value[key] = scrubJson(child, secretKeys, changes, location);
        }
    }
    return value;
}

function sanitizeFile(file, changes) {
    const extension = path.extname(file).toLowerCase();
    if (!['.lua', '.json', '.js', '.mjs', '.cjs', '.ts'].includes(extension)) return;
    const secretKeys = new Set((policy.secretKeys || []).map((key) => key.toLowerCase()));
    let content = fs.readFileSync(file, 'utf8');
    if (extension === '.json') {
        const parsed = JSON.parse(content);
        scrubJson(parsed, secretKeys, changes);
        content = `${JSON.stringify(parsed, null, 2)}\n`;
    } else {
        const keys = [...secretKeys].map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
        const replacement = extension === '.lua' ? '$1 = nil' : "$1 = ''";
        const assignment = new RegExp(`\\b(${keys})\\b\\s*=\\s*(['\"]).*?\\2`, 'gi');
        content = content.replace(assignment, (match, key) => {
            changes.push(`${path.relative(destination, file)}:${key}`);
            return replacement.replace('$1', key);
        });
    }
    fs.writeFileSync(file, content);
}

function walk(directory, callback) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const full = path.join(directory, entry.name);
        if (entry.isDirectory()) walk(full, callback);
        else callback(full);
    }
}

function patchManifest(file) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/^\s*--\s*ui_page\s+['"]html\/index\.html['"]\s*$/m, "ui_page 'html/index.html'");
    content = content.replace(/^\s*ui_page\s+['"]https?:\/\/localhost:[^'"]+['"]\s*$/gm, '');
    content = content.replace(/^version\s+['"][^'"]+['"]$/m, `version '${version}'`);
    if (!/^\s*ui_page\s+['"]html\/index\.html['"]\s*$/m.test(content) && fs.existsSync(path.join(destination, 'html', 'index.html'))) {
        content += "\nui_page 'html/index.html'\n";
    }
    fs.writeFileSync(file, content.replace(/\n{3,}/g, '\n\n'));
}

function scanSecrets() {
    const patterns = (policy.secretValuePatterns || []).map((pattern) => new RegExp(pattern, 'i'));
    const findings = [];
    walk(destination, (file) => {
        if (fs.statSync(file).size > 5_000_000) return;
        const content = fs.readFileSync(file, 'utf8');
        for (const pattern of patterns) {
            if (pattern.test(content)) findings.push(`${path.relative(destination, file)} matched ${pattern}`);
        }
    });
    if (findings.length) throw new Error(`Secret scan failed:\n${findings.join('\n')}`);
}

if (!skipUiBuild && metadata.ui?.enabled !== false) run('npm', ['run', 'build', '--prefix', 'ui']);
if (metadata.ui?.enabled !== false && !fs.existsSync(path.join(root, 'html', 'index.html'))) {
    throw new Error('html/index.html is missing. Build the UI or provide an existing production build.');
}
if (fs.existsSync(destination)) throw new Error(`Release already exists: ${path.relative(root, destination)}`);
if (dryRun) {
    console.log(JSON.stringify({ releaseName, version, destination: path.relative(root, destination), skipUiBuild }, null, 2));
    process.exit(0);
}

fs.mkdirSync(destination, { recursive: true });
for (const include of policy.include || []) {
    const source = path.join(root, include);
    if (fs.existsSync(source)) copyEntry(source, path.join(destination, include), include);
}

const manifestPath = path.join(destination, 'fxmanifest.lua');
if (!fs.existsSync(manifestPath)) throw new Error('Release is missing fxmanifest.lua.');
patchManifest(manifestPath);

const sanitized = [];
walk(destination, (file) => sanitizeFile(file, sanitized));
scanSecrets();

const releaseMetadata = {
    resource: resourceName,
    version,
    generatedAt: new Date().toISOString(),
    uiBuildSkipped: skipUiBuild,
    sanitizedFields: sanitized,
};
fs.writeFileSync(path.join(destination, 'RELEASE.json'), `${JSON.stringify(releaseMetadata, null, 2)}\n`);

metadata.name = resourceName;
metadata.version = version;
fs.writeFileSync(path.join(root, 'resource.json'), `${JSON.stringify(metadata, null, 2)}\n`);
let sourceManifest = fs.readFileSync(path.join(root, 'fxmanifest.lua'), 'utf8');
sourceManifest = sourceManifest.replace(/^version\s+['"][^'"]+['"]$/m, `version '${version}'`);
fs.writeFileSync(path.join(root, 'fxmanifest.lua'), sourceManifest);

console.log(`Release created: ${path.relative(root, destination)}`);
