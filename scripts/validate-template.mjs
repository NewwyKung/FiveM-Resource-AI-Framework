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
  '.ai/examples/adapter-pattern/README.md',
  '.ai/examples/database-port/README.md',
  '.ai/examples/server-authoritative-event/README.md',
  '.ai/examples/resource-with-nui/README.md',
  'examples/resources/example_interaction/fxmanifest.lua',
  'tests/examples/example_interaction.md',
  'tests/release/create-release.integration.mjs',
  'scripts/build-ai-index.mjs',
  'scripts/create-release.mjs',
  'release.config.json',
  'ui/src/app.css',
]) requirePath(required);

for (const file of ['config/config.integrations.lua', 'shared/modules/integrations.lua']) {
  if (exists(file)) errors.push(`Inactive runtime integration file must not ship by default: ${file}`);
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

if (errors.length) {
  for (const error of errors) console.error(`[template] ${error}`);
  process.exit(1);
}
console.log('[template] validation passed.');
