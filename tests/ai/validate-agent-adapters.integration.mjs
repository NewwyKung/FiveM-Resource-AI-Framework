import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const source = process.cwd();
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'fivem-agent-adapter-test-'));
const validator = path.join(source, 'scripts/validate-agent-adapters.mjs');

function write(relativePath, content) {
  const file = path.join(temp, relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function runValidator() {
  return spawnSync(process.execPath, [validator], { cwd: temp, encoding: 'utf8' });
}

function assertFailure(result, expected) {
  if (result.status === 0) throw new Error(`expected validation failure containing: ${expected}`);
  const output = `${result.stdout}\n${result.stderr}`;
  if (!output.includes(expected)) throw new Error(`missing failure message "${expected}":\n${output}`);
}

function profile(entrypoint, adapter, skillRoot = null) {
  return {
    entrypoint,
    skillRoot,
    adapter,
    verificationStatus: 'static-only',
    testedVersion: null,
    runtimeVerifiedAt: null,
    verify: 'Run the documented smoke test.',
    source: 'https://example.com/primary-source',
  };
}

try {
  write('AGENTS.md', '# Agreement\nUse `.ai/CONTEXT_BUDGET.md` and `.ai/skills/INDEX.md`; select one primary skill.\n');
  write('CLAUDE.md', '# Claude Adapter\n@AGENTS.md\n');
  write('.gemini/settings.json', `${JSON.stringify({ context: { fileName: ['GEMINI.md', 'AGENTS.md'] } }, null, 2)}\n`);
  write('.github/copilot-instructions.md', '# Copilot Adapter\nUse AGENTS.md and `.ai/CONTEXT_BUDGET.md`; never edit `resource/html/` or `release/`.\n');
  write('.agents/skills/fivem-ui-workflow/SKILL.md', '# UI workflow\n');
  write('docs/ai-agents.md', '# Agent compatibility\n');

  const matrix = {
    schemaVersion: 2,
    documentedAt: '2026-08-05',
    canonicalInstructions: 'AGENTS.md',
    policy: { duplicateCanonicalRules: false, primarySkillLimit: 1, externalUiLensLimit: 1 },
    agents: {
      openaiCodex: profile('AGENTS.md', null, '.agents/skills'),
      claudeCode: profile('CLAUDE.md', 'CLAUDE.md'),
      geminiCli: profile('AGENTS.md', '.gemini/settings.json'),
      cursor: profile('AGENTS.md', null),
      githubCopilot: profile('.github/copilot-instructions.md', '.github/copilot-instructions.md', '.agents/skills'),
      kimiCode: profile('AGENTS.md', null, '.agents/skills'),
    },
  };
  const matrixPath = '.ai/matrices/agent-entrypoints.json';
  write(matrixPath, `${JSON.stringify(matrix, null, 2)}\n`);

  const clean = runValidator();
  if (clean.status !== 0) throw new Error(`valid fixture failed:\n${clean.stdout}\n${clean.stderr}`);

  write('GEMINI.md', '# Duplicate project memory\n');
  assertFailure(runValidator(), 'GEMINI.md duplicates AGENTS.md');
  fs.rmSync(path.join(temp, 'GEMINI.md'));

  write('.gemini/settings.json', `${JSON.stringify({ context: { fileName: 'AGENTS.md' } }, null, 2)}\n`);
  assertFailure(runValidator(), 'user-level memory is preserved');
  write('.gemini/settings.json', `${JSON.stringify({ context: { fileName: ['GEMINI.md', 'AGENTS.md'] } }, null, 2)}\n`);

  matrix.agents.claudeCode.adapter = 'missing-claude-adapter.md';
  write(matrixPath, `${JSON.stringify(matrix, null, 2)}\n`);
  assertFailure(runValidator(), 'missing adapter: missing-claude-adapter.md');

  console.log('[agent-adapter-test] adapter policy regression validation passed.');
} catch (error) {
  console.error(`[agent-adapter-test] ${error.stack || error.message}`);
  process.exitCode = 1;
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
