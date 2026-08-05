import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const repositoryRoot = path.resolve(import.meta.dirname, '..', '..');
const scanner = path.join(repositoryRoot, 'scripts', 'scan-secrets.mjs');
const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'secret-scan-'));

function scan() {
  return spawnSync(process.execPath, [scanner, '--root', fixtureRoot, '--all-files'], {
    encoding: 'utf8',
  });
}

fs.writeFileSync(path.join(fixtureRoot, 'clean.json'), '{"token":"placeholder"}\n');
assert.equal(scan().status, 0, 'placeholder fixture should pass');

fs.writeFileSync(path.join(fixtureRoot, 'leaked.env'), 'API_KEY="sk-proj-1234567890abcdefghijklmnop"\n');
const leaked = scan();
assert.notEqual(leaked.status, 0, 'credential fixture should fail');
assert.match(leaked.stderr, /leaked\.env:1/, 'failure should identify the file and line');

console.log('[secrets-test] clean and leaking fixtures behaved as expected.');
