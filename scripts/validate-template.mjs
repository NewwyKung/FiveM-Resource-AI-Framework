import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function requirePath(relativePath) {
  if (!exists(relativePath)) errors.push(`Missing required path: ${relativePath}`);
}

for (const required of [
  'AGENTS.md',
  '.ai/CONTEXT_BUDGET.md',
  '.ai/index.json',
  '.ai/work/README.md',
  '.ai/work/TEMPLATE.md',
  '.ai/memory/environment.md',
  '.ai/memory/requirements/README.md',
  '.ai/memory/requirements/active',
  '.ai/memory/requirements/delivered',
  '.ai/memory/requirements/superseded',
  '.ai/rules/integrations.md',
  '.ai/skills/discover-requirements/SKILL.md',
  '.ai/skills/setup-dev-resource/SKILL.md',
  '.ai/examples/adapter-pattern/README.md',
  '.ai/examples/database-port/README.md',
  '.ai/examples/server-authoritative-event/README.md',
  '.ai/examples/resource-with-nui/README.md',
  'examples/resources/example_interaction/fxmanifest.lua',
  'tests/examples/example_interaction.md',
  'tests/release/create-release.integration.mjs',
  'scripts/build-ai-index.mjs',
  'scripts/create-release.mjs',
  'scripts/setup-dev-resource.ps1',
  'release.config.json',
  'ui/src/app.css',
  'html/.gitkeep',
  'release/.gitkeep',
]) requirePath(required);

const forbiddenPaths = [
  'Development',
  'web',
  'fivem-development.skill',
  'config/client',
  'config/server',
  'config/shared',
  'config/config.integrations.lua',
  'shared/modules/integrations.lua',
  'ui/src/lib/ComponentShowcase.svelte',
  'ui/src/lib/tokens.css',
];

for (const file of forbiddenPaths) {
  if (exists(file)) errors.push(`Legacy, redundant, or inactive path must not exist: ${file}`);
}

if (exists('html')) {
  const committedOutput = fs.readdirSync(path.join(root, 'html')).filter((name) => name !== '.gitkeep');
  if (committedOutput.length > 0) {
    errors.push(`Generated html output must not be committed: ${committedOutput.join(', ')}`);
  }
}

if (exists('ui/src/app.css')) {
  const css = fs.readFileSync(path.join(root, 'ui/src/app.css'), 'utf8');
  for (const token of ['--scale:', '--base-screen-height: 1440', '--px-to-vh:']) {
    if (!css.includes(token)) errors.push(`ui/src/app.css is missing ${token}`);
  }
}

if (exists('release.config.json')) {
  const policy = JSON.parse(fs.readFileSync(path.join(root, 'release.config.json'), 'utf8'));
  if (policy.secretKeys) errors.push('release.config.json must not use broad secretKeys auto-sanitization.');
  if (!Array.isArray(policy.jsonSecretPaths) || !Array.isArray(policy.textSanitizers)) {
    errors.push('release.config.json must define explicit jsonSecretPaths and textSanitizers arrays.');
  }
}

const staleTerms = [
  'Development/Svelte',
  'localhost:3301',
  'OVERLORD UI COMPONENTS',
  'v.2-Template-FiveM',
];
const scanRoots = ['AGENTS.md', '.ai', 'docs', 'scripts', 'ui', 'fxmanifest.lua'];
const allowedExtensions = new Set(['.md', '.json', '.js', '.mjs', '.ts', '.svelte', '.css', '.lua', '.ps1', '.html']);

function scan(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) return;
  const stat = fs.statSync(absolutePath);
  if (stat.isDirectory()) {
    for (const name of fs.readdirSync(absolutePath)) scan(path.join(relativePath, name));
    return;
  }
  if (!allowedExtensions.has(path.extname(relativePath))) return;
  const content = fs.readFileSync(absolutePath, 'utf8');
  for (const term of staleTerms) {
    if (content.includes(term)) errors.push(`Stale reference '${term}' found in ${relativePath}`);
  }
}

for (const scanRoot of scanRoots) scan(scanRoot);

if (errors.length) {
  for (const error of errors) console.error(`[template] ${error}`);
  process.exit(1);
}

console.log('[template] validation passed.');
