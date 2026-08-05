import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const errors = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function lineCount(content) {
  return content.split(/\r?\n/).length;
}

const requiredPaths = [
  'AGENTS.md',
  'CLAUDE.md',
  '.gemini/settings.json',
  '.github/copilot-instructions.md',
  '.agents/skills/fivem-ui-workflow/SKILL.md',
  '.ai/matrices/agent-entrypoints.json',
  'docs/ai-agents.md',
];

for (const relativePath of requiredPaths) {
  if (!exists(relativePath)) errors.push(`Missing agent compatibility path: ${relativePath}`);
}

if (exists('AGENTS.md')) {
  const agents = read('AGENTS.md');
  if (lineCount(agents) > 200) errors.push('AGENTS.md exceeds the 200-line canonical context budget.');
  for (const token of ['.ai/CONTEXT_BUDGET.md', '.ai/skills/INDEX.md']) {
    if (!agents.includes(token)) errors.push(`AGENTS.md is missing canonical routing token: ${token}`);
  }
  if (!/one primary (?:workflow|skill)/i.test(agents)) {
    errors.push('AGENTS.md must limit routing to one primary workflow or skill.');
  }
}

if (exists('CLAUDE.md')) {
  const claude = read('CLAUDE.md');
  if (!/^@AGENTS\.md\s*$/m.test(claude)) errors.push('CLAUDE.md must import AGENTS.md with @AGENTS.md.');
  if (lineCount(claude) > 20) errors.push('CLAUDE.md must remain a thin adapter of at most 20 lines.');
}

if (exists('.gemini/settings.json')) {
  try {
    const settings = JSON.parse(read('.gemini/settings.json'));
    const contextFiles = Array.isArray(settings.context?.fileName)
      ? settings.context.fileName
      : [settings.context?.fileName];
    if (JSON.stringify(contextFiles) !== JSON.stringify(['GEMINI.md', 'AGENTS.md'])) {
      errors.push('.gemini/settings.json must discover GEMINI.md before AGENTS.md so user-level memory is preserved.');
    }
  } catch (error) {
    errors.push(`.gemini/settings.json is invalid JSON: ${error.message}`);
  }
}

if (exists('GEMINI.md')) errors.push('GEMINI.md duplicates AGENTS.md; use .gemini/settings.json instead.');
if (exists('.cursor/rules/project.mdc')) {
  errors.push('.cursor/rules/project.mdc duplicates Cursor native AGENTS.md discovery.');
}

if (exists('.github/copilot-instructions.md')) {
  const copilot = read('.github/copilot-instructions.md');
  if (!copilot.includes('AGENTS.md')) errors.push('Copilot instructions must route to AGENTS.md.');
  for (const token of ['.ai/CONTEXT_BUDGET.md', 'resource/html/', 'release/']) {
    if (!copilot.includes(token)) errors.push(`Copilot fallback is missing safety token: ${token}`);
  }
  if (lineCount(copilot) > 20) errors.push('Copilot instructions must remain a thin adapter of at most 20 lines.');
}

if (exists('.ai/matrices/agent-entrypoints.json')) {
  try {
    const matrix = JSON.parse(read('.ai/matrices/agent-entrypoints.json'));
    const expectedAgents = ['openaiCodex', 'claudeCode', 'geminiCli', 'cursor', 'githubCopilot', 'kimiCode'];

    if (matrix.schemaVersion !== 2) errors.push('Agent entrypoint matrix must use schemaVersion 2.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(matrix.documentedAt ?? '')) {
      errors.push('Agent entrypoint matrix needs a documentedAt date.');
    }
    if (matrix.canonicalInstructions !== 'AGENTS.md') {
      errors.push('Agent entrypoint matrix must keep AGENTS.md canonical.');
    }
    if (matrix.policy?.duplicateCanonicalRules !== false || matrix.policy?.primarySkillLimit !== 1) {
      errors.push('Agent entrypoint matrix must prohibit duplication and limit primary skills to one.');
    }

    for (const agent of expectedAgents) {
      const profile = matrix.agents?.[agent];
      if (!profile) {
        errors.push(`Agent entrypoint matrix is missing ${agent}.`);
        continue;
      }
      if (!profile.entrypoint || !exists(profile.entrypoint)) {
        errors.push(`Agent ${agent} has a missing entrypoint: ${profile.entrypoint ?? 'unset'}`);
      }
      if (profile.adapter !== null && (!profile.adapter || !exists(profile.adapter))) {
        errors.push(`Agent ${agent} has a missing adapter: ${profile.adapter ?? 'unset'}`);
      }
      if (profile.skillRoot !== null && (!profile.skillRoot || !exists(profile.skillRoot))) {
        errors.push(`Agent ${agent} has a missing skill root: ${profile.skillRoot ?? 'unset'}`);
      }
      if (!['static-only', 'runtime-verified'].includes(profile.verificationStatus)) {
        errors.push(`Agent ${agent} has an invalid verificationStatus: ${profile.verificationStatus ?? 'unset'}`);
      }
      if (profile.verificationStatus === 'runtime-verified' && (!profile.testedVersion || !/^\d{4}-\d{2}-\d{2}$/.test(profile.runtimeVerifiedAt ?? ''))) {
        errors.push(`Agent ${agent} runtime verification needs testedVersion and runtimeVerifiedAt.`);
      }
      if (!/^https:\/\//.test(profile.source ?? '')) errors.push(`Agent ${agent} needs a primary source URL.`);
    }
  } catch (error) {
    errors.push(`Agent entrypoint matrix is invalid JSON: ${error.message}`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`[agents] ${error}`);
  process.exit(1);
}

console.log('[agents] static agent adapter policy passed.');
