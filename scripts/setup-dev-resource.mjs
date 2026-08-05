import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import readline from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDirectory, '..');
const resourceRoot = path.join(root, 'resource');

function parseArguments(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (!argument.startsWith('--')) throw new Error(`Unexpected argument: ${argument}`);

    const separator = argument.indexOf('=');
    if (separator !== -1) {
      values[argument.slice(2, separator)] = argument.slice(separator + 1);
      continue;
    }

    const key = argument.slice(2);
    if (key === 'force' || key === 'help') {
      values[key] = true;
      continue;
    }

    const next = argv[index + 1];
    if (!next || next.startsWith('--')) throw new Error(`Missing value for --${key}`);
    values[key] = next;
    index += 1;
  }
  return values;
}

function printHelp() {
  console.log(`Create a development link from an FXServer resources folder to ./resource.

Usage:
  npm run setup:dev -- --resources "/path/to/resources/[local]" --name my_resource

Options:
  --resources <path>   FXServer resources folder or category folder
  --name <value>       Resource directory name (default: repository directory)
  --force              Replace an existing symbolic link or junction
  --help               Show this help

The command refuses to remove a real directory.`);
}

function validateName(value) {
  if (!value || value === '.' || value === '..' || path.basename(value) !== value) {
    throw new Error('Resource name must be a single directory name.');
  }
  if (value.includes('/') || value.includes('\\')) {
    throw new Error('Resource name must not contain path separators.');
  }
  return value;
}

function getExistingLinkType(targetPath) {
  try {
    const stats = fs.lstatSync(targetPath);
    if (!stats.isSymbolicLink()) return 'real';
    return 'link';
  } catch (error) {
    if (error.code === 'ENOENT') return 'missing';
    throw error;
  }
}

const argumentsMap = parseArguments(process.argv.slice(2));
if (argumentsMap.help) {
  printHelp();
  process.exit(0);
}

if (!fs.existsSync(path.join(resourceRoot, 'fxmanifest.lua'))) {
  throw new Error(`Invalid resource root: fxmanifest.lua was not found in ${resourceRoot}`);
}

const needsPrompt = !argumentsMap.resources || !argumentsMap.name;
if (needsPrompt && (!process.stdin.isTTY || !process.stdout.isTTY)) {
  throw new Error('Missing --resources or --name. Interactive setup requires a terminal.');
}

const terminal = needsPrompt
  ? readline.createInterface({ input: process.stdin, output: process.stdout })
  : null;

try {
  let resourcesPath = argumentsMap.resources;
  if (!resourcesPath) {
    resourcesPath = (await terminal.question('FXServer resources/category folder: ')).trim();
  }

  if (!resourcesPath) throw new Error('Resources path must not be empty.');
  const resolvedResources = path.resolve(resourcesPath);
  if (!fs.existsSync(resolvedResources) || !fs.statSync(resolvedResources).isDirectory()) {
    throw new Error(`Resources folder was not found: ${resolvedResources}`);
  }

  const defaultName = path.basename(root);
  let resourceName = argumentsMap.name;
  if (!resourceName) {
    resourceName = (await terminal.question(`Resource name (${defaultName}): `)).trim() || defaultName;
  }
  resourceName = validateName(resourceName);

  const linkPath = path.join(resolvedResources, resourceName);
  const existingType = getExistingLinkType(linkPath);

  if (existingType !== 'missing') {
    if (!argumentsMap.force) {
      throw new Error(`Destination already exists: ${linkPath}. Use --force only to replace an existing link.`);
    }
    if (existingType === 'real') {
      throw new Error(`Refusing to remove a real directory or file: ${linkPath}`);
    }
    fs.rmSync(linkPath, { force: true, recursive: false });
  }

  fs.symlinkSync(resourceRoot, linkPath, process.platform === 'win32' ? 'junction' : 'dir');

  console.log('\nDevelopment resource link created.');
  console.log(`Resource: ${linkPath}`);
  console.log(`Source:   ${resourceRoot}`);
  console.log(`\nAdd or verify this line in server.cfg: ensure ${resourceName}`);
} finally {
  terminal?.close();
}
