import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const rootIndex = args.indexOf('--root');
const configIndex = args.indexOf('--config');
const root = path.resolve(rootIndex >= 0 ? args[rootIndex + 1] : process.cwd());
const allFiles = args.includes('--all-files');
const configPath = path.resolve(root, configIndex >= 0 ? args[configIndex + 1] : 'secret-scan.config.json');
const textExtensions = new Set([
  '.css', '.env', '.html', '.js', '.json', '.jsonc', '.lua', '.md', '.mjs', '.ps1',
  '.svelte', '.toml', '.ts', '.txt', '.yaml', '.yml',
]);
const ignoredDirectories = new Set(['.git', 'node_modules', 'release']);

function normalize(file) {
  return file.replaceAll('\\', '/');
}

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute, files);
    else files.push(normalize(path.relative(root, absolute)));
  }
  return files;
}

function workspaceFiles() {
  if (allFiles) return walk(root);
  const result = spawnSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], {
    cwd: root,
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    throw new Error(`unable to enumerate repository files: ${(result.stderr || result.stdout).trim()}`);
  }
  return result.stdout.split(/\r?\n/).filter(Boolean).map(normalize);
}

let config = { allowFiles: [], allowValues: [] };
if (fs.existsSync(configPath)) config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const allowFiles = new Set((config.allowFiles ?? []).map(normalize));
const allowValues = new Set((config.allowValues ?? []).map((value) => value.toLowerCase()));

const detectors = [
  ['private key', new RegExp(['-----BEGIN ', '(?:RSA |EC |OPENSSH )?', 'PRIVATE KEY-----'].join(''), 'g')],
  ['AWS access key', /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/g],
  ['GitHub token', /\b(?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{20,}\b/g],
  ['OpenAI key', /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/g],
  ['Slack token', /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g],
  ['webhook URL', /https:\/\/(?:discord(?:app)?\.com\/api\/webhooks|hooks\.slack\.com\/services)\/[^\s"']+/gi],
];
const assignment = /\b(api[_-]?key|api[_-]?secret|client[_-]?secret|password|private[_-]?key|token|webhook(?:[_-]?url)?)\b\s*[:=]\s*["']([^"'\r\n]{8,})["']/gi;
const findings = [];
const files = workspaceFiles();

for (const relative of files) {
  if (allowFiles.has(relative)) continue;
  const extension = path.extname(relative).toLowerCase();
  if (!textExtensions.has(extension) && path.basename(relative) !== '.env') continue;
  const absolute = path.join(root, relative);
  if (!fs.existsSync(absolute) || fs.statSync(absolute).size > 2_000_000) continue;
  const content = fs.readFileSync(absolute, 'utf8');

  for (const [label, detector] of detectors) {
    detector.lastIndex = 0;
    for (const match of content.matchAll(detector)) {
      const line = content.slice(0, match.index).split(/\r?\n/).length;
      findings.push(`${relative}:${line} (${label})`);
    }
  }

  assignment.lastIndex = 0;
  for (const match of content.matchAll(assignment)) {
    const value = match[2].trim().toLowerCase();
    if (allowValues.has(value) || /^(?:your[-_ ]|example|sample|test|dummy|<|\$\{|process\.env)/i.test(value)) continue;
    const line = content.slice(0, match.index).split(/\r?\n/).length;
    findings.push(`${relative}:${line} (credential assignment: ${match[1]})`);
  }
}

if (findings.length > 0) {
  for (const finding of findings) console.error(`[secrets] ${finding}`);
  console.error('[secrets] scan failed; remove the credential or add a narrowly scoped reviewed exception.');
  process.exit(1);
}

console.log(`[secrets] scanned ${files.length} files; no likely credentials found.`);
