import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const requestedTargets = process.argv.slice(2);
const targets = requestedTargets.length > 0 ? requestedTargets : ['resource/ui/src'];
const errors = [];
const sourceFiles = [];
const supportedExtensions = new Set(['.css', '.js', '.svelte']);

function normalize(filePath) {
  return filePath.replaceAll('\\', '/');
}

function collect(target) {
  const absolute = path.resolve(root, target);
  if (!fs.existsSync(absolute)) {
    errors.push(`Missing UI quality target: ${target}`);
    return;
  }

  const stat = fs.statSync(absolute);
  if (stat.isFile()) {
    if (supportedExtensions.has(path.extname(absolute))) sourceFiles.push(absolute);
    return;
  }

  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    collect(path.join(absolute, entry.name));
  }
}

for (const target of targets) collect(target);

let hasMotion = false;
let hasReducedMotion = false;

for (const absolute of sourceFiles.sort()) {
  const relative = normalize(path.relative(root, absolute));
  const content = fs.readFileSync(absolute, 'utf8');

  if (/transition\s*:\s*all\b/i.test(content)) {
    errors.push(`${relative}: transition: all is forbidden; list intended properties explicitly.`);
  }
  if (/@(?:tailwind|apply)\b/i.test(content)) {
    errors.push(`${relative}: Tailwind directives are not part of the approved UI stack.`);
  }
  if (/\bfetch\s*\(/.test(content) && relative !== 'resource/ui/src/js/Post.js') {
    errors.push(`${relative}: raw fetch must stay in resource/ui/src/js/Post.js.`);
  }
  if (/GetParentResourceName\s*\(/.test(content) && relative !== 'resource/ui/src/js/Post.js') {
    errors.push(`${relative}: resource-name resolution must stay in resource/ui/src/js/Post.js.`);
  }

  hasMotion ||= /\b(?:animation|transition(?:-property)?)\s*:/i.test(content);
  hasReducedMotion ||= /prefers-reduced-motion/i.test(content);
}

if (hasMotion && !hasReducedMotion) {
  errors.push('UI motion exists without a prefers-reduced-motion policy in the checked targets.');
}

if (requestedTargets.length === 0) {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'resource', 'ui', 'package.json'), 'utf8'));
  const dependencies = { ...manifest.dependencies, ...manifest.devDependencies };
  for (const name of Object.keys(dependencies)) {
    if (name === 'tailwindcss' || name.startsWith('@tailwindcss/')) {
      errors.push(`resource/ui/package.json: unapproved dependency ${name}.`);
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`[ui-practices] ${error}`);
  process.exit(1);
}

console.log(`[ui-practices] checked ${sourceFiles.length} source files.`);
