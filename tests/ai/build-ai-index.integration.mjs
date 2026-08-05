import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const source = process.cwd();
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'fivem-ai-index-test-'));
const generator = path.join(source, 'scripts/build-ai-index.mjs');

function run(...args) {
  return spawnSync(process.execPath, [generator, ...args], { cwd: temp, encoding: 'utf8' });
}

try {
  const featureDirectory = path.join(temp, '.ai/features');
  fs.mkdirSync(featureDirectory, { recursive: true });
  fs.writeFileSync(path.join(featureDirectory, 'alpha.md'), '# Alpha\n');

  const generated = run();
  if (generated.status !== 0) throw new Error(`${generated.stdout}\n${generated.stderr}`);

  const indexPath = path.join(temp, '.ai/index.json');
  const lfContent = fs.readFileSync(indexPath, 'utf8');
  fs.writeFileSync(indexPath, lfContent.replaceAll('\n', '\r\n'));

  const crlfCheck = run('--check');
  if (crlfCheck.status !== 0) throw new Error(`CRLF-equivalent index was rejected:\n${crlfCheck.stdout}\n${crlfCheck.stderr}`);

  fs.writeFileSync(path.join(featureDirectory, 'beta.md'), '# Beta\n');
  const staleCheck = run('--check');
  if (staleCheck.status === 0) throw new Error('registry drift was not rejected');

  console.log('[ai-index-test] line-ending portability and drift validation passed.');
} catch (error) {
  console.error(`[ai-index-test] ${error.stack || error.message}`);
  process.exitCode = 1;
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
