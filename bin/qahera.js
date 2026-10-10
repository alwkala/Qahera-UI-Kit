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
const { buildIcons } = require('../cli/build-icons');
const { generateCssData } = require('../cli/generate-css-data');
const { generateHtmlData } = require('../cli/generate-html-data');
const { auditTemplate } = require('../cli/audit-template');
const { scaffoldTemplate } = require('../cli/scaffold-template');
const { startMcpServer } = require('../cli/mcp-server');
const { startDevServer } = require('../cli/preview-server');
const { lintFiles } = require('../cli/lint');
const { setupIde } = require('../cli/setup-ide');
const { syncDownstream } = require('../cli/sync-downstream');

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

if (command === 'mcp' || command === 'serve:mcp') {
  const isHttp = args.includes('--http');
  const portArg = args.find(a => a.startsWith('--port='));
  const port = portArg ? parseInt(portArg.split('=')[1], 10) : 3301;
  const quiet = args.includes('--quiet') || args.includes('-q');
  startMcpServer({
    mode: isHttp ? 'http' : 'stdio',
    port,
    quiet
  });
  // Long running process, do not exit
}

if (command === 'dev' || command === 'serve') {
  const portArg = args.find(a => a.startsWith('--port='));
  const port = portArg ? parseInt(portArg.split('=')[1], 10) : 3300;
  startDevServer({ port });
  // Long running process
}

if (command === 'lint' || command === 'check') {
  const target = args[1] || '.';
  const passed = lintFiles(target);
  process.exit(passed ? 0 : 1);
}

if (command === 'setup-ide' || command === 'configure') {
  setupIde(args.slice(1));
  process.exit(0);
}

if (command === 'sync:downstream' || command === 'sync') {
  syncDownstream();
  process.exit(0);
}

if (command === 'list' || command === 'ls') {
  listComponents();
  process.exit(0);
}

if (command === 'add') {
  addComponents(args.slice(1)).then(() => process.exit(0)).catch(e => {
    console.error(e.message);
    process.exit(1);
  });
}

if (command === 'init') {
  initProject(args.slice(1)).then(() => process.exit(0)).catch(e => {
    console.error(e.message);
    process.exit(1);
  });
}

if (command === 'build:css') {
  buildCss({ quiet: false });
  process.exit(0);
}

if (command === 'build:icons') {
  buildIcons({ quiet: false });
  process.exit(0);
}

if (command === 'build:css-data' || command === 'css-data') {
  generateCssData({ quiet: false });
  process.exit(0);
}

if (command === 'build:html-data' || command === 'html-data') {
  generateHtmlData({ quiet: false });
  process.exit(0);
}

if (command === 'build:ide-data' || command === 'ide-data') {
  generateCssData({ quiet: false });
  generateHtmlData({ quiet: false });
  process.exit(0);
}

if (command === 'cdn' || command === 'snippet') {
  const theme = args[1] || 'zamalek';
  printCdnBoilerplate(theme);
  process.exit(0);
}

if (command === 'build' || command === 'compile') {
  buildCss({ quiet: false });
  buildIcons({ quiet: false });
  generateCssData({ quiet: false });
  generateHtmlData({ quiet: false });
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

if (command === 'audit:template' || command === 'audit-template') {
  const target = args[1];
  if (!target) {
    console.error('\x1b[31m[ERROR]\x1b[0m Please specify template target directory. Example: node bin/qahera.js audit:template templates/fintech-wealth');
    process.exit(1);
  }
  const passed = auditTemplate(target);
  process.exit(passed ? 0 : 1);
}

if (command === 'template:scaffold' || command === 'scaffold:template') {
  const targetName = args[1];
  const passed = scaffoldTemplate(targetName, {
    dest: args[2],
    theme: args[3] || 'zamalek',
    overwrite: args.includes('--overwrite') || args.includes('-y')
  });
  process.exit(passed ? 0 : 1);
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
Qahera UI Kit CLI v${pkg.version} — Sovereign AI-Native Architecture

Usage:
  npx qahera-ui [command] [options]
  qahera [command] [options]

Commands:
  mcp                      Start Model Context Protocol (MCP) server for AI coding agents
                           Options:
                             --http             Run as HTTP JSON-RPC endpoint
                             --port=<number>    HTTP port (default: 3301)
                             --quiet, -q        Suppress startup banner

  dev (or serve)           Start local visual preview & dev hub server
                           Options:
                             --port=<number>    Server port (default: 3300)

  lint (or check) [path]   Audit code or directory for Qahera invariants and tokens

  setup-ide                Configure VS Code, Cursor, Antigravity IDE custom data & MCP
                           Options:
                             --dry-run          Preview changes without writing

  sync:downstream          Synchronize compiled dist assets to official website

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

  list (or ls)             List all 49 components, 21 patterns, and 20 templates

  build                    Run full compilation (CSS, Icons, and Registry artifacts)

  build:css                Compile atomic component CSS into dist/qahera.css

  build:icons              Compile canonical icons into React, PHP, JS, and SVG targets

  build:css-data           Generate VS Code / IDE CSS Custom Data map (qahera.css-data.json)

  build:html-data          Generate VS Code / IDE HTML Custom Data map (qahera.html-data.json)

  build:ide-data           Generate both CSS and HTML Custom Data maps for IDEs

  cdn [theme]              Emit ready-to-run HTML5 boilerplate connected to CDN (default: zamalek)

  validate                 Validate schema, tokens, and contracts without emitting

  test (or audit)          Run quality audits (Version, A11y, RTL, RSC 0kb, Tokens)

  version                  Print compiler version

Examples:
  npx qahera-ui mcp
  npx qahera-ui dev
  npx qahera-ui lint templates/fintech-wealth/index.html
  npx qahera-ui setup-ide
  npx qahera-ui init
  npx qahera-ui add button modal card --target=react
  npx qahera-ui add pattern:dashboard-stat --target=php
  npx qahera-ui add template:admin --target=react
  npx qahera-ui list
`);
}

function printCdnBoilerplate(theme = 'zamalek') {
  const version = pkg.version;
  console.log(`<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="${theme}" data-mode="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Qahera UI Kit · Quickstart (${theme})</title>

  <!-- Google Fonts: Alexandria (Headings) & Cairo (Body) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@600;700;800&family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- 1. Design Tokens -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qahera-ui@${version}/dist/qahera-tokens.min.css">

  <!-- 2. Cairo Themes -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qahera-ui@${version}/dist/qahera-themes.min.css">

  <!-- 3. Canonical Components -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qahera-ui@${version}/dist/qahera.min.css">

  <!-- Alpine.js (for interactive dropdowns, modals, tabs) -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
</head>
<body style="background-color: var(--qhr-surface-page, #0A0D14); color: var(--qhr-text-primary, #F8FAFC); font-family: var(--qhr-font-body, 'Cairo', sans-serif); padding: 2rem;">

  <div class="qhr-card qhr-card--elevated" style="max-width: 640px; margin: 0 auto; padding: 2rem;">
    <span class="qhr-badge qhr-badge--primary qhr-badge--pill">Qahera UI Kit v${version}</span>
    
    <h1 style="font-family: var(--qhr-font-heading, 'Alexandria', sans-serif); margin-block: 1rem 0.5rem; font-size: 1.75rem;">
      منظومة قاهرة عبر شبكة التوزيع السريعة
    </h1>
    
    <p style="color: var(--qhr-text-secondary); line-height: 1.7; margin-block-end: 1.5rem;">
      واجهة عربية معمارية أصيلة تعمل فورياً دون أي تثبيت لحزم Node.js. الثيم النشط: <strong>${theme}</strong>.
    </p>

    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
      <button class="qhr-btn qhr-btn--primary qhr-btn--md" type="button">
        زر رئيسي / Primary
      </button>
      <button class="qhr-btn qhr-btn--outline qhr-btn--md" type="button">
        زر ثانوي / Outline
      </button>
    </div>
  </div>

</body>
</html>`);
}
