import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const output = path.join(root, '.ai/index.json');
const checkOnly = process.argv.includes('--check');

const sections = {
  features: '.ai/features',
  components: '.ai/components',
  events: '.ai/events',
  database: '.ai/database',
  providers: '.ai/integrations/providers',
};

function entries(directory) {
  const absolute = path.join(root, directory);
  if (!fs.existsSync(absolute)) return {};
  return Object.fromEntries(
    fs.readdirSync(absolute, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .filter((entry) => !['README.md', 'INDEX.md', 'TEMPLATE.md'].includes(entry.name))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((entry) => [entry.name.replace(/\.md$/, ''), `${directory}/${entry.name}`]),
  );
}

const index = {
  schemaVersion: 1,
  generatedFrom: 'registry filenames',
  ...Object.fromEntries(Object.entries(sections).map(([key, directory]) => [key, entries(directory)])),
};

const content = `${JSON.stringify(index, null, 2)}\n`;
if (checkOnly) {
  const existing = fs.existsSync(output)
    ? fs.readFileSync(output, 'utf8').replaceAll('\r\n', '\n')
    : null;
  if (existing !== content) {
    console.error('[ai-index] .ai/index.json is stale. Run: node scripts/build-ai-index.mjs');
    process.exit(1);
  }
  console.log('[ai-index] index is current.');
} else {
  fs.writeFileSync(output, content);
  console.log('[ai-index] wrote .ai/index.json');
}
