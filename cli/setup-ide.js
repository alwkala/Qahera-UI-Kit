/**
 * Qahera UI Kit — Zero-Touch IDE & Agent Configurator v1.7.0
 * 
 * Configures IDE autocomplete (VS Code, Cursor, Antigravity) and AI Agent MCP integration.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

function setupIde(args = []) {
  const isDryRun = args.includes('--dry-run');
  const targetCwd = process.cwd();

  console.log('\n\x1b[1;36m╔═══════════════════════════════════════════════════════════════════════════╗\x1b[0m');
  console.log('\x1b[1;36m║             QAHERA ZERO-TOUCH IDE & AGENT CONFIGURATOR                    ║\x1b[0m');
  console.log('\x1b[1;36m╚═══════════════════════════════════════════════════════════════════════════╝\x1b[0m\n');

  if (isDryRun) {
    console.log('\x1b[33m[DRY-RUN MODE]\x1b[0m No files will be written to disk.\n');
  }

  // 1. VS Code / Antigravity Custom Data Setup
  const vscodeDir = path.join(targetCwd, '.vscode');
  const settingsJsonPath = path.join(vscodeDir, 'settings.json');

  let settings = {};
  if (fs.existsSync(settingsJsonPath)) {
    try {
      settings = JSON.parse(fs.readFileSync(settingsJsonPath, 'utf8'));
    } catch (e) {
      settings = {};
    }
  }

  // Configure css.customData and html.customData
  const cssCustomData = settings['css.customData'] || [];
  const htmlCustomData = settings['html.customData'] || [];

  const cssRelPath = './node_modules/qahera-ui/dist/qahera.css-data.json';
  const htmlRelPath = './node_modules/qahera-ui/dist/qahera.html-data.json';

  let settingsModified = false;

  if (!cssCustomData.includes(cssRelPath)) {
    cssCustomData.push(cssRelPath);
    settings['css.customData'] = cssCustomData;
    settingsModified = true;
  }

  if (!htmlCustomData.includes(htmlRelPath)) {
    htmlCustomData.push(htmlRelPath);
    settings['html.customData'] = htmlCustomData;
    settingsModified = true;
  }

  if (settingsModified) {
    console.log(`[VS Code / Antigravity] Autocomplete configuration:`);
    console.log(`  Target: ${settingsJsonPath}`);
    console.log(`  Added: css.customData -> ${cssRelPath}`);
    console.log(`  Added: html.customData -> ${htmlRelPath}`);

    if (!isDryRun) {
      if (!fs.existsSync(vscodeDir)) fs.mkdirSync(vscodeDir, { recursive: true });
      fs.writeFileSync(settingsJsonPath, JSON.stringify(settings, null, 2), 'utf8');
      console.log(`  \x1b[32m✓ Written successfully.\x1b[0m\n`);
    } else {
      console.log(`  \x1b[90m(Dry-run skipped write)\x1b[0m\n`);
    }
  } else {
    console.log(`[VS Code / Antigravity] Autocomplete configuration is already up-to-date.\n`);
  }

  // 2. Cursor MCP Server Setup (.cursor/mcp.json)
  const cursorDir = path.join(targetCwd, '.cursor');
  const cursorMcpPath = path.join(cursorDir, 'mcp.json');

  let cursorConfig = { mcpServers: {} };
  if (fs.existsSync(cursorMcpPath)) {
    try {
      cursorConfig = JSON.parse(fs.readFileSync(cursorMcpPath, 'utf8'));
    } catch (e) {
      cursorConfig = { mcpServers: {} };
    }
  }

  cursorConfig.mcpServers = cursorConfig.mcpServers || {};
  cursorConfig.mcpServers.qahera = {
    command: 'npx',
    args: ['-y', 'qahera-ui', 'mcp']
  };

  console.log(`[Cursor MCP Server]:`);
  console.log(`  Target: ${cursorMcpPath}`);
  console.log(`  Registered server: "qahera" (npx -y qahera-ui mcp)`);

  if (!isDryRun) {
    if (!fs.existsSync(cursorDir)) fs.mkdirSync(cursorDir, { recursive: true });
    fs.writeFileSync(cursorMcpPath, JSON.stringify(cursorConfig, null, 2), 'utf8');
    console.log(`  \x1b[32m✓ Written successfully.\x1b[0m\n`);
  } else {
    console.log(`  \x1b[90m(Dry-run skipped write)\x1b[0m\n`);
  }

  // 3. Claude Desktop Configuration instructions
  console.log(`[Claude Desktop Configuration]:`);
  console.log(`  To enable Qahera in Claude Desktop, add this to your claude_desktop_config.json:\n`);
  const claudeSnippet = {
    mcpServers: {
      qahera: {
        command: "npx",
        args: ["-y", "qahera-ui", "mcp"]
      }
    }
  };
  console.log(`\x1b[33m${JSON.stringify(claudeSnippet, null, 2)}\x1b[0m\n`);

  console.log('\x1b[1;32m✓ Setup complete. All editor completions and agent protocols initialized.\x1b[0m\n');
  return true;
}

module.exports = { setupIde };

if (require.main === module) {
  setupIde(process.argv.slice(2));
}
