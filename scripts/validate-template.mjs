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
    '.ai/memory/environment.md',
    '.ai/skills/discover-requirements/SKILL.md',
    '.ai/examples/adapter-pattern/README.md',
    '.ai/examples/database-port/README.md',
    '.ai/examples/server-authoritative-event/README.md',
    '.ai/examples/resource-with-nui/README.md',
    'examples/resources/example_interaction/fxmanifest.lua',
    'tests/examples/example_interaction.md',
    'ui/src/app.css',
]) requirePath(required);

const forbiddenInactiveRuntimeFiles = [
    'config/config.integrations.lua',
    'shared/modules/integrations.lua',
];

for (const file of forbiddenInactiveRuntimeFiles) {
    if (exists(file)) errors.push(`Inactive runtime integration file must not ship by default: ${file}`);
}

if (exists('ui/src/app.css')) {
    const css = fs.readFileSync(path.join(root, 'ui/src/app.css'), 'utf8');
    for (const token of ['--scale:', '--base-screen-height: 1440', '--px-to-vh:']) {
        if (!css.includes(token)) errors.push(`ui/src/app.css is missing ${token}`);
    }
}

if (errors.length) {
    for (const error of errors) console.error(`[template] ${error}`);
    process.exit(1);
}

console.log('[template] validation passed.');
