import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const errors = [];
const skillRoots = ['.ai/skills', '.agents/skills'];

for (const skillRoot of skillRoots) {
  const absoluteRoot = path.join(root, skillRoot);
  if (!fs.existsSync(absoluteRoot)) continue;

  for (const entry of fs.readdirSync(absoluteRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const relative = path.posix.join(skillRoot, entry.name, 'SKILL.md');
    const absolute = path.join(root, relative);
    if (!fs.existsSync(absolute)) {
      errors.push(`${relative} is missing.`);
      continue;
    }

    const content = fs.readFileSync(absolute, 'utf8');
    const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!frontmatter) {
      errors.push(`${relative} is missing YAML frontmatter.`);
      continue;
    }

    const name = frontmatter[1].match(/^name:\s*["']?([^\r\n"']+)["']?\s*$/m)?.[1]?.trim();
    const description = frontmatter[1].match(/^description:\s*["']?([^\r\n]+?)["']?\s*$/m)?.[1]?.trim();

    if (!name || !/^[a-z0-9-]{1,64}$/.test(name)) errors.push(`${relative} has an invalid name.`);
    if (name && name !== entry.name) errors.push(`${relative} name must match its folder.`);
    if (!description || description.length < 20) errors.push(`${relative} needs a descriptive trigger.`);
    if (/\[TODO[:\]]|TODO: Complete/i.test(content)) errors.push(`${relative} contains scaffold TODO text.`);

    const lineCount = content.split(/\r?\n/).length;
    if (lineCount > 500) errors.push(`${relative} exceeds the 500-line progressive-disclosure limit.`);

    if (skillRoot === '.agents/skills') {
      const metadata = path.join(absoluteRoot, entry.name, 'agents', 'openai.yaml');
      if (!fs.existsSync(metadata)) errors.push(`${skillRoot}/${entry.name}/agents/openai.yaml is missing.`);
    }
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`[skills] ${error}`);
  process.exit(1);
}

console.log('[skills] skill metadata and progressive-disclosure checks passed.');
