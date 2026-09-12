#!/usr/bin/env node

/**
 * Qahera UI Kit — CLI Interface
 * 
 * Usage:
 *   node bin/qahera.js [command] [options]
 * 
 * Commands:
 *   add <components...>   Add component source files to your project (shadcn-style)
 *   init                  Initialize Qahera design tokens and CSS in your project
 *   list                  List all canonical components and their supported targets
 *   build                 (default) Runs the 8-stage pipeline and emits canonical registry
 *   validate              Performs strict schema and invariant validation without mutating artifacts
 *   version               Prints the current compiler version
 *   help                  Displays usage instructions
 */

'use strict';

const pkg = require('../package.json');
const { runQaheraCompiler } = require('../compiler/compiler');
const { addComponents, initProject, listComponents } = require('../cli/add');
const { buildCss } = require('../cli/build-css');

const args = process.argv.slice(2);
const command = args[0] || 'build';

if (command === 'version' || command === '-v' || command === '--version') {
  console.log(`Qahera Design System Compiler v${pkg.version}`);
  process.exit(0);
}

if (command === 'help' || command === '--help' || command === '-h') {
  printHelp();
  process.exit(0);
}

if (command === 'list' || command === 'ls') {
  listComponents();
  process.exit(0);
}

if (command === 'add') {
  addComponents(args.slice(1));
  process.exit(0);
}

if (command === 'init') {
  initProject(args.slice(1));
  process.exit(0);
}

if (command === 'build:css') {
  buildCss({ quiet: false });
  process.exit(0);
}

if (command === 'build' || command === 'compile') {
  buildCss({ quiet: false });
  const success = runQaheraCompiler({ writeArtifacts: true });
  process.exit(success ? 0 : 1);
}

if (command === 'validate' || command === 'check') {
  const success = runQaheraCompiler({ writeArtifacts: false });
  process.exit(success ? 0 : 1);
}

if (command === 'test' || command === 'audit') {
  const { runAllAudits } = require('../ci/audit-all');
  const success = runAllAudits();
  process.exit(success ? 0 : 1);
}

if (command === 'preview' || command === 'previews') {
  require('../cli/generate-previews');
  process.exit(0);
}

console.log(`Unknown command: ${command}`);
printHelp();
process.exit(1);

function printHelp() {
  console.log(`
🏛️  قاهرة · Qahera UI Kit CLI v${pkg.version}

Usage:
  npx qahera-ui [command] [options]
  qahera [command] [options]

Commands:
  init                     Scaffold tokens.css, components.css, and embed AI agent skill
                           Options:
                             --target, -t <react|php|html|htmx|js>  (default: react)
                             --dest, -d <path>
                             --overwrite, -y

  add <component...>       Add component, pattern, or template source files (shadcn-style)
                           Options:
                             --target, -t <react|php|html|htmx|js>  (default: react)
                             --dest, -d <path>                      (destination folder)
                             --overwrite, -y                        (overwrite existing files)
                             --all, -a                              (add all canonical components)

  list (or ls)             List all 42 components, 20 patterns, and 18 templates

  build                    Run the 8-stage compiler and emit registry artifacts

  build:css                Compile atomic component CSS into dist/qahera.css

  validate                 Validate schema, tokens, and contracts without emitting

  test (or audit)          Run 4-stage QA audit (A11y, RTL, RSC 0kb, Tokens)

  version                  Print compiler version

Examples:
  npx qahera-ui init --target=react
  npx qahera-ui add button modal card --target=react
  npx qahera-ui add button alert navbar --target=php --dest=./views/qahera
  npx qahera-ui add pattern:dashboard-stat --target=react
  npx qahera-ui add template:admin --target=react
  npx qahera-ui add --all --target=react
  npx qahera-ui list
`);
}
