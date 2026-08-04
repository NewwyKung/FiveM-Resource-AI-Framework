import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const integrationPath = path.join(root, 'integrations.json');

function fail(message) {
    console.error(`[integrations] ${message}`);
    process.exitCode = 1;
}

function exists(relativePath) {
    return fs.existsSync(path.join(root, relativePath));
}

if (!exists('integrations.json')) {
    fail('integrations.json is missing.');
    process.exit();
}

let manifest;
try {
    manifest = JSON.parse(fs.readFileSync(integrationPath, 'utf8'));
} catch (error) {
    fail(`integrations.json is invalid JSON: ${error.message}`);
    process.exit();
}

if (!Number.isInteger(manifest.version) || manifest.version < 1) {
    fail('version must be an integer greater than or equal to 1.');
}

if (!manifest.capabilities || typeof manifest.capabilities !== 'object') {
    fail('capabilities must be an object.');
    process.exit();
}

const allowedRuntimes = new Set(['shared', 'client', 'server']);

for (const [capability, config] of Object.entries(manifest.capabilities)) {
    if (!config || typeof config !== 'object') {
        fail(`${capability} must be an object.`);
        continue;
    }

    if (typeof config.provider !== 'string' || config.provider.length === 0) {
        fail(`${capability}.provider must be a non-empty string.`);
    }

    if (!Array.isArray(config.runtimes) || config.runtimes.length === 0) {
        fail(`${capability}.runtimes must contain at least one runtime.`);
    } else {
        for (const runtime of config.runtimes) {
            if (!allowedRuntimes.has(runtime)) {
                fail(`${capability}.runtimes contains unsupported runtime: ${runtime}`);
            }
        }
    }

    if (typeof config.verified !== 'boolean') {
        fail(`${capability}.verified must be boolean.`);
    }

    if (config.provider === 'none') {
        continue;
    }

    if (config.contract && !exists(config.contract)) {
        fail(`${capability}.contract does not exist: ${config.contract}`);
    }

    if (config.adapters) {
        for (const [runtime, adapterPath] of Object.entries(config.adapters)) {
            if (!allowedRuntimes.has(runtime)) {
                fail(`${capability}.adapters contains unsupported runtime: ${runtime}`);
            }
            if (typeof adapterPath !== 'string' || !exists(adapterPath)) {
                fail(`${capability}.${runtime} adapter does not exist: ${adapterPath}`);
            }
        }
    }

    if (config.optionDependencies) {
        for (const [option, dependencies] of Object.entries(config.optionDependencies)) {
            if (!Array.isArray(dependencies) || dependencies.some((value) => typeof value !== 'string')) {
                fail(`${capability}.optionDependencies.${option} must be an array of resource names.`);
            }
        }
    }
}

if (!process.exitCode) {
    console.log('[integrations] validation passed.');
}
