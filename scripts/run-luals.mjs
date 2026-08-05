import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const tooling = JSON.parse(fs.readFileSync(path.join(root, 'tooling.config.json'), 'utf8'));
const expectedVersion = tooling.luaLanguageServer.version;
const executable = process.env[tooling.luaLanguageServer.executableEnvironmentVariable] || 'lua-language-server';

function run(arguments_, options = {}) {
  return spawnSync(executable, arguments_, { cwd: root, encoding: 'utf8', ...options });
}

const versionResult = run(['--version']);
if (versionResult.error?.code === 'ENOENT') {
  console.error(`[luals] ${executable} was not found. Install LuaLS ${expectedVersion} or set LUALS_BIN to its executable.`);
  process.exit(1);
}
if (versionResult.status !== 0) {
  console.error(`[luals] version check failed: ${(versionResult.stderr || versionResult.stdout).trim()}`);
  process.exit(versionResult.status ?? 1);
}

const actualVersion = `${versionResult.stdout}\n${versionResult.stderr}`.match(/\d+\.\d+\.\d+/)?.[0];
if (actualVersion !== expectedVersion) {
  console.error(`[luals] expected ${expectedVersion}, received ${actualVersion ?? 'an unknown version'}.`);
  process.exit(1);
}

const logPath = fs.mkdtempSync(path.join(os.tmpdir(), 'fivem-luals-'));
const diagnosis = run([
  `--check=${root}`,
  '--checklevel=Warning',
  `--configpath=${path.join(root, '.luarc.json')}`,
  `--logpath=${logPath}`,
]);

if (diagnosis.stdout) process.stdout.write(diagnosis.stdout);
if (diagnosis.stderr) process.stderr.write(diagnosis.stderr);
if (diagnosis.status !== 0) process.exit(diagnosis.status ?? 1);

const reportPath = path.join(logPath, 'check.json');
if (!fs.existsSync(reportPath)) {
  const output = `${diagnosis.stdout}\n${diagnosis.stderr}`;
  if (/Diagnosis completed?, no problems found/i.test(output)) {
    console.log(`[luals] LuaLS ${actualVersion} reported no warnings or errors.`);
    process.exit(0);
  }

  console.error(`[luals] diagnosis succeeded without a report or an explicit no-problems result: ${reportPath}.`);
  process.exit(1);
}

const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const diagnostics = Object.values(report).flatMap((entry) => Array.isArray(entry) ? entry : []);
if (diagnostics.length > 0) {
  console.error(`[luals] ${diagnostics.length} warning/error diagnostic(s); report: ${reportPath}`);
  process.exit(1);
}

console.log(`[luals] LuaLS ${actualVersion} reported no warnings or errors.`);
