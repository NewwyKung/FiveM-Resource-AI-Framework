import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'fivem-ui-practices-'));
const cleanDirectory = path.join(fixtureRoot, 'clean');
const badDirectory = path.join(fixtureRoot, 'bad');

function run(target) {
  return spawnSync(process.execPath, ['scripts/check-ui-practices.mjs', target], {
    cwd: root,
    encoding: 'utf8',
  });
}

try {
  fs.mkdirSync(cleanDirectory, { recursive: true });
  fs.writeFileSync(path.join(cleanDirectory, 'clean.css'), `
.panel { transition: opacity 120ms ease-out; }
@media (prefers-reduced-motion: reduce) { .panel { transition: none; } }
`);

  fs.mkdirSync(badDirectory, { recursive: true });
  fs.writeFileSync(path.join(badDirectory, 'bad.css'), '.panel { transition: all 200ms ease; }');
  fs.writeFileSync(path.join(badDirectory, 'bad.js'), "fetch('https://example.invalid');");

  const clean = run(cleanDirectory);
  if (clean.status !== 0) throw new Error(`clean UI fixture failed:\n${clean.stderr}${clean.stdout}`);

  const bad = run(badDirectory);
  if (bad.status === 0) throw new Error('bad UI fixture unexpectedly passed');
  if (!bad.stderr.includes('transition: all') || !bad.stderr.includes('raw fetch')) {
    throw new Error(`bad UI fixture did not report expected findings:\n${bad.stderr}`);
  }

  console.log('[ui-practices-test] clean and violating fixtures behaved as expected.');
} finally {
  fs.rmSync(fixtureRoot, { recursive: true, force: true });
}
