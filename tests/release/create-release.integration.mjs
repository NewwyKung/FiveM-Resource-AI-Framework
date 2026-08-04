import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const source = process.cwd();
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'fivem-release-test-'));

function fail(message) {
  console.error(`[release-test] ${message}`);
  process.exitCode = 1;
}
function copyFilter(entry) {
  const relative = path.relative(source, entry).replaceAll('\\', '/');
  return !relative.startsWith('.git') && !relative.startsWith('release/') && !relative.startsWith('resource/ui/node_modules');
}

try {
  fs.cpSync(source, temp, { recursive: true, filter: copyFilter });
  fs.mkdirSync(path.join(temp, 'resource/config'), { recursive: true });
  fs.mkdirSync(path.join(temp, 'resource/html'), { recursive: true });
  fs.writeFileSync(path.join(temp, 'resource/config/release-test.json'), JSON.stringify({ service: { webhook: 'https://discord.com/api/webhooks/test/secret' } }, null, 2));
  fs.writeFileSync(path.join(temp, 'resource/html/index.html'), '<!doctype html><title>release test</title>');

  const policyPath = path.join(temp, 'release.config.json');
  const policy = JSON.parse(fs.readFileSync(policyPath, 'utf8'));
  policy.jsonSecretPaths = [{ file: 'config/release-test.json', path: 'service.webhook', replacement: null }];
  fs.writeFileSync(policyPath, `${JSON.stringify(policy, null, 2)}\n`);

  const result = spawnSync(process.execPath, ['scripts/create-release.mjs', '--name', 'release_test', '--version', '0.0.1', '--skip-ui-build'], { cwd: temp, encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`${result.stdout}\n${result.stderr}`);

  const release = path.join(temp, 'release/release_test-0.0.1');
  const required = ['fxmanifest.lua', 'RELEASE.json', 'config/release-test.json'];
  for (const file of required) if (!fs.existsSync(path.join(release, file))) fail(`missing ${file}`);

  for (const forbidden of ['.ai', '.github', 'docs', 'examples', 'tests', 'scripts', 'resource', 'ui']) {
    if (fs.existsSync(path.join(release, forbidden))) fail(`forbidden path included: ${forbidden}`);
  }

  const manifest = fs.readFileSync(path.join(release, 'fxmanifest.lua'), 'utf8');
  if (manifest.includes('localhost')) fail('release manifest contains localhost');
  if (!manifest.includes("version '0.0.1'")) fail('release manifest version was not patched');
  if (!manifest.includes("ui_page 'html/index.html'")) fail('production ui_page is missing');

  const sanitized = JSON.parse(fs.readFileSync(path.join(release, 'config/release-test.json'), 'utf8'));
  if (sanitized.service.webhook !== null) fail('explicit JSON secret path was not sanitized');

  const metadata = JSON.parse(fs.readFileSync(path.join(release, 'RELEASE.json'), 'utf8'));
  if (!metadata.sanitizedFields.includes('config/release-test.json:service.webhook')) fail('sanitization evidence is missing');
  if (!metadata.uiBuildSkipped) fail('release metadata did not record UI build reuse');

  const sourceManifest = fs.readFileSync(path.join(temp, 'resource/fxmanifest.lua'), 'utf8');
  const sourceMetadata = JSON.parse(fs.readFileSync(path.join(temp, 'resource.json'), 'utf8'));
  if (!sourceManifest.includes("version '0.0.1'")) fail('source manifest version was not synchronized');
  if (sourceMetadata.version !== '0.0.1') fail('resource metadata version was not synchronized');

  if (!process.exitCode) console.log('[release-test] release package validation passed.');
} catch (error) {
  fail(error.stack || error.message);
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
