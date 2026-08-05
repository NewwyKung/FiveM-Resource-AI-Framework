import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const schemaDirectory = path.join(root, 'docs', 'schemas');
const errors = [];
const schemas = new Map();

for (const name of fs.readdirSync(schemaDirectory).filter((file) => file.endsWith('.schema.json')).sort()) {
  const relative = path.posix.join('docs/schemas', name);
  try {
    const schema = JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
    schemas.set(name, schema);
    if (schema.$schema !== 'https://json-schema.org/draft/2020-12/schema') errors.push(`${relative} must use JSON Schema 2020-12`);
    if (typeof schema.$id !== 'string' || schema.$id.length === 0) errors.push(`${relative} is missing $id`);
    if (!schema.title) errors.push(`${relative} is missing title`);
  } catch (error) {
    errors.push(`${relative} is invalid JSON: ${error.message}`);
  }
}

const taskSchema = schemas.get('ai-task.schema.json');
const qualityGatesPath = path.join(root, '.ai', 'matrices', 'quality-gates.json');
if (!taskSchema) {
  errors.push('docs/schemas/ai-task.schema.json is required');
} else if (fs.existsSync(qualityGatesPath)) {
  const taskCharacteristics = taskSchema.properties?.characteristics?.items?.enum;
  const qualityGateIds = Object.keys(JSON.parse(fs.readFileSync(qualityGatesPath, 'utf8')));
  if (!Array.isArray(taskCharacteristics)) {
    errors.push('ai-task characteristics must define an enum');
  } else if (JSON.stringify([...taskCharacteristics].sort()) !== JSON.stringify([...qualityGateIds].sort())) {
    errors.push('ai-task characteristics enum must match .ai/matrices/quality-gates.json keys');
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`[schemas] ${error}`);
  process.exit(1);
}

console.log('[schemas] canonical schema documents passed structural validation.');
