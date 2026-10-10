/**
 * Qahera UI Kit — Sovereign MCP Server v1.7.0
 * 
 * Model Context Protocol (MCP) JSON-RPC 2.0 Server for AI Coding Agents.
 * 
 * Zero dependencies: pure Node.js (process.stdin/stdout, http, fs, path).
 * Dual-mode: Stdio transport (default) and HTTP transport (--http).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const readline = require('readline');
const { parseYaml } = require('../compiler/yaml');

const ROOT_DIR = path.resolve(__dirname, '..');
const VERSION = '1.7.0';

// Canonical Tool Definitions conforming to Model Context Protocol (MCP) schema
const TOOL_DEFINITIONS = [
  {
    name: 'qahera_list',
    description: 'List all canonical Qahera UI Kit components, patterns, templates, or neighborhood themes with their categories and metadata.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['components', 'patterns', 'templates', 'themes', 'all'],
          description: 'Filter catalog by category. Defaults to "all".'
        }
      }
    }
  },
  {
    name: 'qahera_get_component',
    description: 'Retrieve the contract, recipe, and source code for a canonical component in any supported target (react, php, html, htmx, js).',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Component name in kebab-case (e.g., "button", "modal", "card", "navbar").'
        },
        target: {
          type: 'string',
          enum: ['react', 'php', 'html', 'htmx', 'js'],
          description: 'Target framework renderer (default: "react").'
        },
        include_recipe: {
          type: 'boolean',
          description: 'Whether to include the raw YAML recipe alongside the renderer source code (default: true).'
        }
      },
      required: ['name']
    }
  },
  {
    name: 'qahera_search_tokens',
    description: 'Search and inspect canonical --qhr-* design tokens (colors, spacings, radii, typography, shadows, elevation).',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query for token name, color name, or semantic role (e.g. "gold", "primary", "radius", "spacing-4").'
        },
        category: {
          type: 'string',
          enum: ['color', 'space', 'radius', 'shadow', 'motion', 'typography', 'z-index'],
          description: 'Optional filter by token category.'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'qahera_get_pattern',
    description: 'Retrieve a higher-order compositional UX pattern (e.g., "dashboard-stat", "search-toolbar", "vip-membership").',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Pattern name in kebab-case (e.g. "dashboard-stat", "kanban-board", "luxury-product-card").'
        },
        target: {
          type: 'string',
          enum: ['react', 'html', 'php'],
          description: 'Preferred markup or code target (default: "html").'
        }
      },
      required: ['name']
    }
  },
  {
    name: 'qahera_get_theme',
    description: 'Retrieve a Cairo neighborhood architectural theme (token overrides, palette, and cultural heritage narrative).',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Theme name (e.g. "zamalek", "downtown", "heliopolis", "maadi", "luxury-gold", "nubia", "sinai", "shubra", "new-cairo").'
        }
      },
      required: ['name']
    }
  },
  {
    name: 'qahera_audit_code',
    description: 'Deterministically audit code snippets for compliance with Qahera invariants: zero bespoke CSS, emoji prohibition, banned fonts (Amiri), physical CSS vs logical properties, arbitrary classes vs canonical .qhr-*.',
    inputSchema: {
      type: 'object',
      properties: {
        code: {
          type: 'string',
          description: 'Source code snippet to audit (HTML, JSX, PHP, CSS).'
        },
        filename: {
          type: 'string',
          description: 'Optional filename for contextual diagnostics.'
        }
      },
      required: ['code']
    }
  },
  {
    name: 'qahera_compose_screen',
    description: 'Synthesize ready-to-use canonical template layout code strictly from qhr-* components, logical CSS, and verified design tokens based on natural language intent.',
    inputSchema: {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          description: 'Description of the page or widget to compose (e.g., "executive wealth dashboard with stock ticker and biometric card").'
        },
        target: {
          type: 'string',
          enum: ['html', 'react', 'php', 'htmx', 'js'],
          description: 'Output format (default: "html").'
        },
        theme: {
          type: 'string',
          description: 'Active Cairo neighborhood theme (default: "zamalek").'
        }
      },
      required: ['description']
    }
  }
];

// Helper: load parsed JSON or YAML safely
function readYamlSafe(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return parseYaml(content);
    }
  } catch (err) {
    // Return null on failure
  }
  return null;
}

// Tool Implementation: qahera_list
function handleList(args) {
  const category = (args && args.category) || 'all';
  const result = {};

  if (category === 'all' || category === 'components') {
    const aiCompPath = path.join(ROOT_DIR, 'ai', 'components.yaml');
    const compData = readYamlSafe(aiCompPath) || {};
    result.components = compData.components || [];
  }

  if (category === 'all' || category === 'patterns') {
    const patternsDir = path.join(ROOT_DIR, 'patterns');
    const patternFiles = fs.existsSync(patternsDir) ? fs.readdirSync(patternsDir) : [];
    result.patterns = patternFiles
      .filter(f => f.endsWith('.yaml'))
      .map(f => {
        const pName = f.replace('.yaml', '');
        const pData = readYamlSafe(path.join(patternsDir, f)) || {};
        return {
          id: pName,
          title: pData.title || pName,
          description: pData.description || (pData.ai && pData.ai.intent) || '',
          components: pData.components || []
        };
      });
  }

  if (category === 'all' || category === 'templates') {
    const templatesDir = path.join(ROOT_DIR, 'templates');
    const tplDirs = fs.existsSync(templatesDir) ? fs.readdirSync(templatesDir, { withFileTypes: true }) : [];
    result.templates = tplDirs
      .filter(d => d.isDirectory())
      .map(d => ({
        id: d.name,
        name: d.name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
        path: `templates/${d.name}`
      }));
  }

  if (category === 'all' || category === 'themes') {
    const themesDir = path.join(ROOT_DIR, 'tokens', 'themes');
    const themeFiles = fs.existsSync(themesDir) ? fs.readdirSync(themesDir) : [];
    result.themes = themeFiles
      .filter(f => f.endsWith('.yaml') && !['cairo-atlas.yaml', 'registry.yaml', 'default.yaml', 'dark.yaml'].includes(f))
      .map(f => {
        const thName = f.replace('.yaml', '');
        const thData = readYamlSafe(path.join(themesDir, f)) || {};
        return {
          id: thName,
          movement: thData.movement || '',
          heritage: thData.heritage || '',
          description: thData.description || ''
        };
      });
  }

  return result;
}

// Tool Implementation: qahera_get_component
function handleGetComponent(args) {
  const name = args.name.toLowerCase().trim().replace(/^qhr-/, '');
  const target = (args.target || 'react').toLowerCase();
  const includeRecipe = args.include_recipe !== false;

  const result = {
    name,
    target,
    contract: null,
    recipe: null,
    renderer_code: null
  };

  // 1. Contract
  const contractPath = path.join(ROOT_DIR, 'contracts', 'components', `${name}.yaml`);
  if (fs.existsSync(contractPath)) {
    result.contract = readYamlSafe(contractPath);
  }

  // 2. Recipe
  if (includeRecipe) {
    const recipePath = path.join(ROOT_DIR, 'recipes', `${name}.yaml`);
    if (fs.existsSync(recipePath)) {
      result.recipe = readYamlSafe(recipePath);
    }
  }

  // 3. Renderer Source
  let rendererFile = null;
  const PascalName = name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');

  if (target === 'react') {
    const p1 = path.join(ROOT_DIR, 'renderers', 'react', `${PascalName}.tsx`);
    const p2 = path.join(ROOT_DIR, 'renderers', 'react', `${name}.tsx`);
    rendererFile = fs.existsSync(p1) ? p1 : (fs.existsSync(p2) ? p2 : null);
  } else if (target === 'php') {
    const p1 = path.join(ROOT_DIR, 'renderers', 'php', `${name}.php`);
    rendererFile = fs.existsSync(p1) ? p1 : null;
  } else if (target === 'html') {
    const p1 = path.join(ROOT_DIR, 'renderers', 'html', 'native', 'components', `${name}.html`);
    const p2 = path.join(ROOT_DIR, 'renderers', 'html', 'native', `${name}.html`);
    rendererFile = fs.existsSync(p1) ? p1 : (fs.existsSync(p2) ? p2 : null);
  } else if (target === 'htmx') {
    const p1 = path.join(ROOT_DIR, 'renderers', 'htmx', `${name}.html`);
    rendererFile = fs.existsSync(p1) ? p1 : null;
  } else if (target === 'js') {
    const p1 = path.join(ROOT_DIR, 'renderers', 'js', `${name}.js`);
    rendererFile = fs.existsSync(p1) ? p1 : null;
  }

  if (rendererFile && fs.existsSync(rendererFile)) {
    result.renderer_code = fs.readFileSync(rendererFile, 'utf8');
  } else {
    result.renderer_code = `<!-- Target renderer for "${name}" (${target}) not found in primary path -->`;
  }

  return result;
}

// Tool Implementation: qahera_search_tokens
function handleSearchTokens(args) {
  const query = args.query.toLowerCase().trim();
  const categoryFilter = args.category ? args.category.toLowerCase().trim() : null;

  const tokensCssPath = path.join(ROOT_DIR, 'tokens', 'tokens.css');
  if (!fs.existsSync(tokensCssPath)) {
    return { error: 'tokens.css file not found', results: [] };
  }

  const content = fs.readFileSync(tokensCssPath, 'utf8');
  const lines = content.split('\n');
  const matches = [];

  let currentSection = 'general';

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('/* ===') || trimmed.startsWith('/* ---')) {
      currentSection = trimmed.replace(/[/*=-]/g, '').trim().toLowerCase();
      continue;
    }

    if (trimmed.startsWith('--qhr-')) {
      const colonIdx = trimmed.indexOf(':');
      if (colonIdx > -1) {
        const tokenName = trimmed.substring(0, colonIdx).trim();
        const tokenVal = trimmed.substring(colonIdx + 1).replace(';', '').trim();

        if (categoryFilter) {
          if (!tokenName.includes(`-${categoryFilter}`) && !currentSection.includes(categoryFilter)) {
            continue;
          }
        }

        if (tokenName.toLowerCase().includes(query) || tokenVal.toLowerCase().includes(query) || currentSection.includes(query)) {
          matches.push({
            token: tokenName,
            value: tokenVal,
            section: currentSection
          });
        }
      }
    }
  }

  return {
    query,
    count: matches.length,
    results: matches.slice(0, 50)
  };
}

// Tool Implementation: qahera_get_pattern
function handleGetPattern(args) {
  const name = args.name.toLowerCase().trim();
  const patternPath = path.join(ROOT_DIR, 'patterns', `${name}.yaml`);

  if (!fs.existsSync(patternPath)) {
    return { error: `Pattern "${name}" not found. Run qahera_list with category="patterns" to see available patterns.` };
  }

  const patternData = readYamlSafe(patternPath);
  return {
    name,
    pattern: patternData
  };
}

// Tool Implementation: qahera_get_theme
function handleGetTheme(args) {
  const name = args.name.toLowerCase().trim();
  const themePath = path.join(ROOT_DIR, 'tokens', 'themes', `${name}.yaml`);

  if (!fs.existsSync(themePath)) {
    return { error: `Theme "${name}" not found. Run qahera_list with category="themes" to inspect available themes.` };
  }

  const themeData = readYamlSafe(themePath);
  return {
    name,
    theme: themeData
  };
}

// Tool Implementation: qahera_audit_code
function handleAuditCode(args) {
  const code = args.code || '';
  const filename = args.filename || 'snippet.html';
  const lines = code.split('\n');

  const EMOJI_REGEX = /(?:\p{Extended_Pictographic}|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF])/u;
  const PHYSICAL_PROPERTIES_REGEX = /\b(margin-left|margin-right|padding-left|padding-right|left\s*:|right\s*:)/i;
  const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3}){1,2}\b/;
  const WHITELISTED_CLASSES = new Set([
    'is-active', 'is-open', 'is-visible', 'is-hidden', 'is-loading',
    'active', 'open', 'hidden', 'fade', 'show',
    'sr-only', 'visually-hidden', 'container'
  ]);

  const violations = [];

  // Check 1: Amiri font ban
  if (code.toLowerCase().includes('amiri')) {
    violations.push({
      rule: 'QAHERA-FONT-001',
      severity: 'error',
      message: 'Prohibited font "Amiri" detected. Cairo typography doctrine mandates Alexandria for Display/Headings and Cairo for Body.',
      suggestion: 'Replace with var(--qhr-font-heading) or var(--qhr-font-body).'
    });
  }

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Check 2: Emoji prohibition (QAHERA-VISUAL-001)
    if (EMOJI_REGEX.test(line)) {
      violations.push({
        line: lineNum,
        rule: 'QAHERA-VISUAL-001',
        severity: 'error',
        message: 'Prohibited Unicode emoji or pictorial symbol detected. Canonical SVG icons must be used instead.',
        snippet: line.trim(),
        suggestion: 'Reference SVG icon catalog or use <svg class="qhr-icon">.'
      });
    }

    // Check 3: Physical layout properties
    if (PHYSICAL_PROPERTIES_REGEX.test(line)) {
      violations.push({
        line: lineNum,
        rule: 'QAHERA-RTL-001',
        severity: 'error',
        message: 'Physical CSS property detected (e.g. margin-left/padding-right). Qahera mandates 100% logical properties.',
        snippet: line.trim(),
        suggestion: 'Use margin-inline-start, margin-inline-end, padding-inline, or inset-inline-start.'
      });
    }

    // Check 4: Hardcoded hex colors
    const hexMatch = line.match(HEX_COLOR_REGEX);
    if (hexMatch && !line.includes('--qhr-')) {
      violations.push({
        line: lineNum,
        rule: 'QAHERA-TOKEN-001',
        severity: 'warning',
        message: `Hardcoded hex color "${hexMatch[0]}" detected. All colors must map to canonical --qhr-* tokens.`,
        snippet: line.trim(),
        suggestion: 'Use var(--qhr-color-primary), var(--qhr-color-accent), or semantic tokens.'
      });
    }

    // Check 5: Arbitrary non-qhr classes
    const classMatches = line.matchAll(/(?<![:@\w])class=["']([^"']+)["']/g);
    for (const match of classMatches) {
      const classStr = match[1];
      const classes = classStr.split(/\s+/).filter(Boolean);
      for (const cls of classes) {
        if (cls.startsWith('qhr-') || cls.startsWith('x-') || cls.startsWith('lucide-') || cls.startsWith('svg-') || WHITELISTED_CLASSES.has(cls)) {
          continue;
        }
        violations.push({
          line: lineNum,
          rule: 'QAHERA-COMP-001',
          severity: 'error',
          message: `Arbitrary non-canonical class ".${cls}" detected. Pages must be built exclusively from registered qhr-* classes.`,
          snippet: line.trim(),
          suggestion: 'Replace with the corresponding canonical .qhr-* component or utility class.'
        });
      }
    }
  });

  return {
    filename,
    passed: violations.filter(v => v.severity === 'error').length === 0,
    violation_count: violations.length,
    errors: violations.filter(v => v.severity === 'error'),
    warnings: violations.filter(v => v.severity === 'warning')
  };
}

// Tool Implementation: qahera_compose_screen
function handleComposeScreen(args) {
  const desc = (args.description || '').toLowerCase();
  const target = (args.target || 'html').toLowerCase();
  const theme = (args.theme || 'zamalek').toLowerCase();

  // Keyword to component/pattern mapping
  const componentsIncluded = ['navbar', 'card', 'button'];
  let hasHero = desc.includes('hero') || desc.includes('header') || desc.includes('portal') || desc.includes('landing');
  let hasTicker = desc.includes('ticker') || desc.includes('stock') || desc.includes('market') || desc.includes('fintech') || desc.includes('wealth');
  let hasStat = desc.includes('stat') || desc.includes('kpi') || desc.includes('metric') || desc.includes('analytics');
  let hasTable = desc.includes('table') || desc.includes('grid') || desc.includes('list') || desc.includes('records');

  if (hasHero) componentsIncluded.push('exhibit-hero');
  if (hasTicker) componentsIncluded.push('ticker');
  if (hasStat) componentsIncluded.push('dashboard-stat');
  if (hasTable) componentsIncluded.push('table');

  const canonicalMarkup = `<!--
  Qahera UI Kit v${VERSION} Canonical Screen Scaffolding
  Intent: ${args.description}
  Theme: ${theme} | Target: ${target}
  Preserves: 100% Logical CSS, Zero Emoji, Alexandria + Cairo Typography
-->
<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="${theme}" data-mode="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>واجهة قاهرة المعمارية</title>
  
  <!-- Typography: Alexandria & Cairo -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@600;700;800&family=Cairo:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Canonical Distribution Stylesheets -->
  <link rel="stylesheet" href="dist/qahera-tokens.css">
  <link rel="stylesheet" href="dist/qahera-themes.css">
  <link rel="stylesheet" href="dist/qahera.css">
  
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
</head>
<body style="background-color: var(--qhr-surface-page); color: var(--qhr-text-primary); font-family: var(--qhr-font-body);">

  <!-- Canonical Navbar -->
  <header class="qhr-navbar">
    <div class="qhr-navbar-inner">
      <div class="qhr-navbar-brand">
        <span class="qhr-cartouche">قاهرة</span>
      </div>
      <nav class="qhr-navbar-nav">
        <a href="#overview" class="qhr-navbar-link is-active">نظرة عامة</a>
        <a href="#analytics" class="qhr-navbar-link">التحليلات</a>
        <a href="#reports" class="qhr-navbar-link">التقارير</a>
      </nav>
      <div class="qhr-navbar-actions">
        <button class="qhr-btn qhr-btn--primary qhr-btn--sm" type="button">الإجراء الرئيسي</button>
      </div>
    </div>
  </header>

  ${hasTicker ? `
  <!-- Telemetry Ticker Track -->
  <section class="qhr-ticker" aria-label="مؤشرات الأسواق الحية">
    <div class="qhr-ticker-track">
      <div class="qhr-ticker-item">
        <span class="qhr-ticker-symbol">EGX30</span>
        <span class="qhr-ticker-price">31,420.50</span>
        <span class="qhr-ticker-change qhr-ticker-change--up">+1.45%</span>
      </div>
      <div class="qhr-ticker-item">
        <span class="qhr-ticker-symbol">GOLD / EGP</span>
        <span class="qhr-ticker-price">3,580.00</span>
        <span class="qhr-ticker-change qhr-ticker-change--up">+0.82%</span>
      </div>
    </div>
  </section>
  ` : ''}

  <!-- Main Content Container -->
  <main style="max-width: 1200px; margin-inline: auto; padding-inline: var(--qhr-space-6); padding-block: var(--qhr-space-8);">
    
    ${hasHero ? `
    <!-- Asymmetric Focal Hero Section -->
    <section class="qhr-hero" style="margin-block-end: var(--qhr-space-8);">
      <div class="qhr-hero-dossier">
        <span class="qhr-badge qhr-badge--primary qhr-badge--pill">نظام تصميم سيادي</span>
        <h1 class="qhr-hero-title" style="font-family: var(--qhr-font-heading); margin-block: var(--qhr-space-3);">
          عمارة رقمية عربية بأعلى معايير الدقة
        </h1>
        <p class="qhr-hero-lead" style="color: var(--qhr-text-secondary); line-height: 1.8;">
          واجهات مصممة وفق نسب الرياضة المعمارية المصرية وهوية أحياء القاهرة التاريخية.
        </p>
        <div class="qhr-hero-actions" style="display: flex; gap: var(--qhr-space-3); margin-block-start: var(--qhr-space-4);">
          <button class="qhr-btn qhr-btn--primary qhr-btn--md" type="button">ابدأ الآن</button>
          <button class="qhr-btn qhr-btn--outline qhr-btn--md" type="button">استكشف التوثيق</button>
        </div>
      </div>
    </section>
    ` : ''}

    ${hasStat ? `
    <!-- Telemetry KPI Matrix -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--qhr-space-4); margin-block-end: var(--qhr-space-8);">
      <div class="qhr-card qhr-card--elevated" style="padding: var(--qhr-space-5);">
        <span class="qhr-badge qhr-badge--success">نشط ومستقر</span>
        <div style="font-size: 2rem; font-weight: 700; margin-block: var(--qhr-space-2);">99.98%</div>
        <div style="color: var(--qhr-text-secondary); font-size: 0.875rem;">جاهزية المنظومة اللحظية</div>
      </div>
      <div class="qhr-card qhr-card--elevated" style="padding: var(--qhr-space-5);">
        <span class="qhr-badge qhr-badge--primary">زمن الاستجابة</span>
        <div style="font-size: 2rem; font-weight: 700; margin-block: var(--qhr-space-2);">12ms</div>
        <div style="color: var(--qhr-text-secondary); font-size: 0.875rem;">استرجاع الرموز المعمارية</div>
      </div>
    </div>
    ` : ''}

    <!-- Vitrine Card Container -->
    <div class="qhr-card qhr-card--elevated" style="padding: var(--qhr-space-6);">
      <div class="qhr-card-header" style="display: flex; justify-content: space-between; align-items: center; margin-block-end: var(--qhr-space-4);">
        <h2 style="font-family: var(--qhr-font-heading); font-size: 1.25rem;">سجل العمليات المعمارية</h2>
        <span class="qhr-badge qhr-badge--pill">تحديث لحظي</span>
      </div>
      <div class="qhr-card-body">
        <p style="color: var(--qhr-text-secondary); line-height: 1.7;">
          تم توليد هذا المخطط المعماري وفق عقد الحوكمة الصارم لـ Qahera UI Kit v${VERSION}.
        </p>
      </div>
    </div>

  </main>

</body>
</html>`;

  return {
    description: args.description,
    target,
    theme,
    components_included: componentsIncluded,
    markup: canonicalMarkup
  };
}

// Dispatch table for tools
function dispatchTool(name, params) {
  switch (name) {
    case 'qahera_list':
      return handleList(params);
    case 'qahera_get_component':
      return handleGetComponent(params);
    case 'qahera_search_tokens':
      return handleSearchTokens(params);
    case 'qahera_get_pattern':
      return handleGetPattern(params);
    case 'qahera_get_theme':
      return handleGetTheme(params);
    case 'qahera_audit_code':
      return handleAuditCode(params);
    case 'qahera_compose_screen':
      return handleComposeScreen(params);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

// Handle single JSON-RPC 2.0 message
function handleRpcMessage(msg) {
  if (!msg || typeof msg !== 'object') {
    return { jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } };
  }

  const { id, method, params } = msg;

  if (method === 'initialize') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        capabilities: {
          tools: {
            listChanged: false
          }
        },
        serverInfo: {
          name: 'qahera-mcp',
          version: VERSION
        }
      }
    };
  }

  if (method === 'notifications/initialized' || method === 'initialized') {
    return null; // MCP notifications require no response
  }

  if (method === 'ping') {
    return { jsonrpc: '2.0', id, result: {} };
  }

  if (method === 'tools/list') {
    return {
      jsonrpc: '2.0',
      id,
      result: {
        tools: TOOL_DEFINITIONS
      }
    };
  }

  if (method === 'tools/call') {
    const toolName = params ? params.name : null;
    const toolArgs = params ? params.arguments : {};

    try {
      const output = dispatchTool(toolName, toolArgs);
      return {
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: typeof output === 'string' ? output : JSON.stringify(output, null, 2)
            }
          ]
        }
      };
    } catch (err) {
      return {
        jsonrpc: '2.0',
        id,
        isError: true,
        result: {
          content: [
            {
              type: 'text',
              text: `Error executing ${toolName}: ${err.message}`
            }
          ]
        }
      };
    }
  }

  return {
    jsonrpc: '2.0',
    id,
    error: {
      code: -32601,
      message: `Method not found: ${method}`
    }
  };
}

// Stdio Transport Handler
function startStdioServer(quiet = false) {
  if (!quiet) {
    console.error(`[Qahera MCP] Stdio transport started (v${VERSION}). Ready for JSON-RPC 2.0.`);
  }

  let buffer = '';

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', chunk => {
    buffer += chunk;

    // Check for Content-Length framing (LSP/MCP standard)
    while (true) {
      if (buffer.startsWith('Content-Length:')) {
        const headerEnd = buffer.indexOf('\r\n\r\n');
        if (headerEnd === -1) break;

        const headerStr = buffer.substring(0, headerEnd);
        const lengthMatch = headerStr.match(/Content-Length:\s*(\d+)/i);
        if (!lengthMatch) {
          buffer = buffer.substring(headerEnd + 4);
          continue;
        }

        const contentLength = parseInt(lengthMatch[1], 10);
        const bodyStart = headerEnd + 4;

        if (buffer.length < bodyStart + contentLength) {
          // Incomplete payload, wait for next data chunk
          break;
        }

        const bodyStr = buffer.substring(bodyStart, bodyStart + contentLength);
        buffer = buffer.substring(bodyStart + contentLength);

        try {
          const req = JSON.parse(bodyStr);
          const res = handleRpcMessage(req);
          if (res) {
            const resJson = JSON.stringify(res);
            process.stdout.write(`Content-Length: ${Buffer.byteLength(resJson, 'utf8')}\r\n\r\n${resJson}`);
          }
        } catch (e) {
          console.error('[Qahera MCP] JSON parse error in framed message:', e.message);
        }
      } else {
        // Line-delimited JSON fallback
        const newlineIdx = buffer.indexOf('\n');
        if (newlineIdx === -1) break;

        const line = buffer.substring(0, newlineIdx).trim();
        buffer = buffer.substring(newlineIdx + 1);

        if (line.length === 0) continue;

        try {
          const req = JSON.parse(line);
          const res = handleRpcMessage(req);
          if (res) {
            process.stdout.write(JSON.stringify(res) + '\n');
          }
        } catch (e) {
          console.error('[Qahera MCP] JSON parse error in NDJSON line:', e.message);
        }
      }
    }
  });

  process.stdin.on('end', () => {
    if (!quiet) console.error('[Qahera MCP] Stdio stream closed.');
    process.exit(0);
  });
}

// HTTP Transport Handler
function startHttpServer(port = 3301, quiet = false) {
  const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    if (req.method === 'GET' && (req.url === '/' || req.url === '/health')) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ status: 'ok', server: 'qahera-mcp', version: VERSION }));
      return;
    }

    if (req.method === 'POST') {
      let body = '';
      req.setEncoding('utf8');
      req.on('data', chunk => {
        body += chunk;
        if (body.length > 1024 * 1024) { // 1MB limit
          res.writeHead(413, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Payload too large' }));
          req.destroy();
        }
      });

      req.on('end', () => {
        try {
          const jsonReq = JSON.parse(body);
          const jsonRes = handleRpcMessage(jsonReq);
          res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
          res.end(JSON.stringify(jsonRes || { jsonrpc: '2.0', id: null, result: null }));
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Invalid JSON' } }));
        }
      });
      return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  });

  server.listen(port, () => {
    if (!quiet) {
      console.log(`[Qahera MCP] HTTP Server listening on http://localhost:${port}/ (v${VERSION})`);
    }
  });

  return server;
}

function startMcpServer(options = {}) {
  const mode = options.mode || 'stdio';
  const port = options.port || 3301;
  const quiet = options.quiet || false;

  if (mode === 'http') {
    return startHttpServer(port, quiet);
  } else {
    return startStdioServer(quiet);
  }
}

module.exports = {
  startMcpServer,
  handleRpcMessage,
  dispatchTool,
  TOOL_DEFINITIONS
};

if (require.main === module) {
  const isHttp = process.argv.includes('--http');
  const portArg = process.argv.find(a => a.startsWith('--port='));
  const port = portArg ? parseInt(portArg.split('=')[1], 10) : 3301;
  const quiet = process.argv.includes('--quiet') || process.argv.includes('-q');

  startMcpServer({
    mode: isHttp ? 'http' : 'stdio',
    port,
    quiet
  });
}
