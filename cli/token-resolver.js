#!/usr/bin/env node
/**
 * Qahera UI Kit — Token Reference Resolver & Generator v1.0
 * Pure Zero-Dependency Node.js Engine
 * Resolves references: {category.group.name} -> #VALUE
 * Emits: generated/tokens.css, generated/tokens.json, generated/tailwind.preset.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const TOKENS_DIR = path.join(ROOT_DIR, 'tokens');
const GENERATED_DIR = path.join(ROOT_DIR, 'generated');

// Deep merge two objects
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key] || typeof target[key] !== 'object') target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Basic YAML parser for key-value hierarchies
function parseSimpleYaml(content) {
  const lines = content.replace(/\r/g, '').split('\n');
  const root = {};
  const stack = [{ indent: -1, obj: root }];

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const indent = line.search(/\S/);
    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const currentParent = stack[stack.length - 1].obj;
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.substring(indent, colonIdx).trim();
    const rawVal = line.substring(colonIdx + 1).trim();

    if (rawVal === '') {
      const newObj = {};
      currentParent[key] = newObj;
      stack.push({ indent, obj: newObj });
    } else {
      let val = rawVal;
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.substring(1, val.length - 1);
      }
      currentParent[key] = val;
    }
  }

  return root;
}

// Flatten object into dot-notation dictionary
function flattenDictionary(obj, prefix = '') {
  let res = {};
  for (const [k, v] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(res, flattenDictionary(v, newKey));
    } else {
      res[newKey] = v;
    }
  }
  return res;
}

// Deep get value by dot path
function getByPath(obj, pathStr) {
  const parts = pathStr.split('.');
  let curr = obj;
  for (let p of parts) {
    if (curr === undefined || curr === null) return undefined;
    curr = curr[p];
  }
  return curr;
}

// Token Reference Resolver
function resolveValue(val, allTokens, visited = new Set()) {
  if (typeof val !== 'string') return val;
  const refMatch = val.match(/^\{([a-zA-Z0-9_\-\.]+)\}$/);
  if (!refMatch) return val;

  const targetPath = refMatch[1];
  if (visited.has(targetPath)) {
    throw new Error(`🚨 Circular token reference detected: ${Array.from(visited).join(' -> ')} -> ${targetPath}`);
  }

  const rawTarget = getByPath(allTokens, targetPath);
  if (rawTarget === undefined) {
    throw new Error(`🚨 Undefined token reference: "${targetPath}"`);
  }

  visited.add(targetPath);
  return resolveValue(rawTarget, allTokens, new Set(visited));
}

function run() {
  ['css', 'json', 'manifests'].forEach(dir => {
    const p = path.join(GENERATED_DIR, dir);
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  });

  // 1. Load YAML Token Sources
  const primitives = parseSimpleYaml(fs.readFileSync(path.join(TOKENS_DIR, 'primitives.yaml'), 'utf8'));
  const semantic = parseSimpleYaml(fs.readFileSync(path.join(TOKENS_DIR, 'semantic.yaml'), 'utf8'));
  const components = parseSimpleYaml(fs.readFileSync(path.join(TOKENS_DIR, 'components.yaml'), 'utf8'));
  const typography = parseSimpleYaml(fs.readFileSync(path.join(TOKENS_DIR, 'typography.yaml'), 'utf8'));
  const motion = parseSimpleYaml(fs.readFileSync(path.join(TOKENS_DIR, 'motion.yaml'), 'utf8'));
  const darkTheme = parseSimpleYaml(fs.readFileSync(path.join(TOKENS_DIR, 'themes', 'dark.yaml'), 'utf8'));

  // Deep merge full token registry
  const fullRegistry = {};
  deepMerge(fullRegistry, primitives);
  deepMerge(fullRegistry, semantic);
  deepMerge(fullRegistry, { typography: typography.families || {} });
  deepMerge(fullRegistry, { motion: motion || {} });
  deepMerge(fullRegistry, { components: components });

  // 2. Resolve all references
  const flatTokens = flattenDictionary(fullRegistry);
  const resolvedFlat = {};

  for (const [tokenKey, tokenVal] of Object.entries(flatTokens)) {
    resolvedFlat[tokenKey] = resolveValue(tokenVal, fullRegistry);
  }

  // 3. Generate generated/tokens.json
  fs.writeFileSync(
    path.join(GENERATED_DIR, 'tokens.json'),
    JSON.stringify(resolvedFlat, null, 2),
    'utf8'
  );

  // 4. Generate generated/tokens.css
  css += `@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600;700;800;900&family=Cairo:wght@300;400;500;600;700;800&family=El+Messiri:wght@400;500;600;700&family=Tajawal:wght@300;400;500;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap');\n\n`;
  css += `:root, [data-theme="light"] {\n`;

  const metaKeys = ['version', 'namespace', 'category', 'description'];
  for (const [key, val] of Object.entries(resolvedFlat)) {
    if (key.includes('meta.') || metaKeys.includes(key)) continue;
    
    // Convert dot notation to CSS var
    let cleanKey = key;
    if (cleanKey.startsWith('components.')) {
      cleanKey = cleanKey.replace('components.', '');
    }
    const varName = `--qhr-${cleanKey.replace(/\./g, '-')}`;
    css += `  ${varName}: ${val};\n`;
  }

  // Add standard color aliases for backwards compatibility & convenience
  css += `\n  /* Semantic Color Aliases */\n`;
  css += `  --qhr-color-primary: var(--qhr-color-primary-bg);\n`;
  css += `  --qhr-color-primary-600: var(--qhr-color-blue-600, #0b6bcb);\n`;
  css += `  --qhr-color-primary-700: var(--qhr-color-blue-700, #0958a5);\n`;
  css += `  --qhr-color-primary-50: var(--qhr-color-blue-50, #eff6ff);\n`;

  css += `  --qhr-color-secondary: var(--qhr-color-secondary-bg);\n`;
  css += `  --qhr-color-neutral-100: var(--qhr-color-slate-100, #f1f5f9);\n`;
  css += `  --qhr-color-neutral-200: var(--qhr-color-slate-200, #e2e8f0);\n`;
  css += `  --qhr-color-neutral-900: var(--qhr-color-slate-900, #0f172a);\n`;

  css += `  --qhr-color-danger: var(--qhr-color-danger-bg);\n`;
  css += `  --qhr-color-danger-600: var(--qhr-color-rose-600, #e11d48);\n`;
  css += `  --qhr-color-danger-700: var(--qhr-color-rose-700, #be123c);\n`;
  css += `  --qhr-color-danger-50: var(--qhr-color-rose-50, #fff1f2);\n`;

  css += `  --qhr-color-success-600: var(--qhr-color-emerald-600, #059669);\n`;
  css += `  --qhr-color-success-50: var(--qhr-color-emerald-50, #ecfdf5);\n`;

  css += `  --qhr-color-warning-600: var(--qhr-color-amber-600, #d97706);\n`;
  css += `  --qhr-color-warning-50: var(--qhr-color-amber-50, #fffbeb);\n`;

  // Primary typography & supported font stacks
  css += `\n  --qhr-font-family-primary: 'Cairo', system-ui, -apple-system, sans-serif;\n`;
  css += `  --qhr-font-heading: 'Cairo', 'Plus Jakarta Sans', system-ui, sans-serif;\n`;
  css += `  --qhr-font-body: 'Cairo', 'Tajawal', system-ui, -apple-system, sans-serif;\n`;
  css += `  --qhr-font-primary: 'Cairo', system-ui, -apple-system, sans-serif;\n`;
  css += `  --qhr-font-display-heritage: 'El Messiri', serif;\n`;
  css += `  --qhr-font-display-modern: 'Plus Jakarta Sans', sans-serif;\n`;
  css += `  --qhr-font-body-alt: 'Tajawal', sans-serif;\n`;
  css += `  --qhr-font-mono: 'JetBrains Mono', monospace;\n`;
  css += `  --qhr-ring-focus: rgba(11, 107, 203, 0.35);\n`;
  css += `  --qhr-modal-dialog_bg: var(--qhr-surface-elevated, #ffffff);\n`;
  css += `  --qhr-modal-dialog-bg: var(--qhr-surface-elevated, #ffffff);\n`;
  css += `  --qhr-modal-backdrop: var(--qhr-surface-overlay, rgba(15, 23, 42, 0.5));\n`;
  css += `  --qhr-modal-border: var(--qhr-border-subtle, #e2e8f0);\n`;
  css += `\n  /* Canonical Surface & Text Aliases */\n`;
  css += `  --qhr-surface-page: #f8fafc;\n`;
  css += `  --qhr-surface-card: #ffffff;\n`;
  css += `  --qhr-surface-subtle: #f1f5f9;\n`;
  css += `  --qhr-text-primary: #0f172a;\n`;
  css += `  --qhr-text-secondary: #475569;\n`;
  css += `  --qhr-text-muted: #64748b;\n`;
  css += `}\n\n`;

  // Dark Theme Overrides
  css += `[data-theme="dark"] {\n`;
  const darkOverrides = flattenDictionary(darkTheme.overrides || {});
  for (const [key, val] of Object.entries(darkOverrides)) {
    const resolvedVal = resolveValue(val, fullRegistry);
    let cleanKey = key;
    if (cleanKey.startsWith('components.')) {
      cleanKey = cleanKey.replace('components.', '');
    }
    const varName = `--qhr-${cleanKey.replace(/\./g, '-')}`;
    css += `  ${varName}: ${resolvedVal};\n`;
  }
  css += `  --qhr-ring-focus: rgba(96, 165, 250, 0.45);\n`;
  css += `  --qhr-color-primary: var(--qhr-color-blue-500, #3b82f6);\n`;
  css += `  --qhr-color-primary-600: var(--qhr-color-blue-500, #3b82f6);\n`;
  css += `  --qhr-color-primary-700: var(--qhr-color-blue-600, #0b6bcb);\n`;
  css += `  --qhr-color-neutral-100: var(--qhr-color-slate-800, #1e293b);\n`;
  css += `  --qhr-color-neutral-200: var(--qhr-color-slate-700, #334155);\n`;
  css += `  --qhr-color-neutral-900: var(--qhr-color-slate-50, #f8fafc);\n`;
  css += `  --qhr-modal-dialog_bg: var(--qhr-surface-elevated, #0f172a);\n`;
  css += `  --qhr-modal-dialog-bg: var(--qhr-surface-elevated, #0f172a);\n`;
  css += `  --qhr-modal-backdrop: var(--qhr-surface-overlay, rgba(2, 6, 23, 0.75));\n`;
  css += `  --qhr-modal-border: var(--qhr-border-subtle, #334155);\n`;
  css += `\n  /* High-Contrast Dark Badges */\n`;
  css += `  --qhr-badge-primary_bg: rgba(59, 130, 246, 0.18);\n`;
  css += `  --qhr-badge-primary_fg: #93c5fd;\n`;
  css += `  --qhr-badge-success_bg: rgba(16, 185, 129, 0.18);\n`;
  css += `  --qhr-badge-success_fg: #6ee7b7;\n`;
  css += `  --qhr-badge-warning_bg: rgba(245, 158, 11, 0.18);\n`;
  css += `  --qhr-badge-warning_fg: #fde68a;\n`;
  css += `  --qhr-badge-danger_bg: rgba(244, 63, 94, 0.18);\n`;
  css += `  --qhr-badge-danger_fg: #fda4af;\n`;
  css += `\n  /* High-Contrast Dark Alerts */\n`;
  css += `  --qhr-alert-info_bg: rgba(59, 130, 246, 0.14);\n`;
  css += `  --qhr-alert-info_border: rgba(96, 165, 250, 0.35);\n`;
  css += `  --qhr-alert-info_fg: #bfdbfe;\n`;
  css += `  --qhr-alert-success_bg: rgba(16, 185, 129, 0.14);\n`;
  css += `  --qhr-alert-success_border: rgba(52, 211, 153, 0.35);\n`;
  css += `  --qhr-alert-success_fg: #a7f3d0;\n`;
  css += `  --qhr-alert-warning_bg: rgba(245, 158, 11, 0.14);\n`;
  css += `  --qhr-alert-warning_border: rgba(251, 191, 36, 0.35);\n`;
  css += `  --qhr-alert-warning_fg: #fde68a;\n`;
  css += `  --qhr-alert-danger_bg: rgba(244, 63, 94, 0.14);\n`;
  css += `  --qhr-alert-danger_border: rgba(251, 113, 133, 0.35);\n`;
  css += `  --qhr-alert-danger_fg: #fecdd3;\n`;
  css += `\n  /* High-Contrast Dark Surfaces & Text */\n`;
  css += `  --qhr-surface-page: #020617;\n`;
  css += `  --qhr-surface-card: #0f172a;\n`;
  css += `  --qhr-surface-subtle: #0f172a;\n`;
  css += `  --qhr-text-primary: #f8fafc;\n`;
  css += `  --qhr-text-secondary: #cbd5e1;\n`;
  css += `  --qhr-text-muted: #94a3b8;\n`;
  css += `}\n\n`;

  // Global reset
  css += `*, *::before, *::after {\n  box-sizing: border-box;\n}\n\n`;
  css += `body {\n  font-family: var(--qhr-font-body);\n  background-color: var(--qhr-surface-base);\n  color: var(--qhr-content-primary);\n  line-height: 1.5;\n  margin: 0;\n}\n\n`;
  css += `h1, h2, h3, h4, h5, h6 {\n  font-family: var(--qhr-font-heading);\n  font-weight: 600;\n  margin: 0;\n}\n`;

  fs.writeFileSync(path.join(GENERATED_DIR, 'tokens.css'), css, 'utf8');
  fs.writeFileSync(path.join(TOKENS_DIR, 'tokens.css'), css, 'utf8');

  // 5. Generate generated/tailwind.preset.js
  let tw = `/**\n * Qahera UI Kit — Generated Tailwind Preset v1.0\n */\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n`;
  tw += `        primary: {\n`;
  tw += `          DEFAULT: 'var(--qhr-color-primary-bg)',\n`;
  tw += `          hover: 'var(--qhr-color-primary-hover)',\n`;
  tw += `          subtle: 'var(--qhr-color-primary-subtle)',\n`;
  tw += `          fg: 'var(--qhr-color-primary-fg)',\n`;
  tw += `        },\n`;
  tw += `        secondary: {\n`;
  tw += `          DEFAULT: 'var(--qhr-color-secondary-bg)',\n`;
  tw += `          fg: 'var(--qhr-color-secondary-fg)',\n`;
  tw += `          border: 'var(--qhr-color-secondary-border)',\n`;
  tw += `        },\n`;
  tw += `        danger: {\n`;
  tw += `          DEFAULT: 'var(--qhr-color-danger-bg)',\n`;
  tw += `          fg: 'var(--qhr-color-danger-fg)',\n`;
  tw += `          hover: 'var(--qhr-color-danger-hover)',\n`;
  tw += `        },\n`;
  tw += `        success: {\n`;
  tw += `          DEFAULT: 'var(--qhr-color-success-bg)',\n`;
  tw += `          fg: 'var(--qhr-color-success-fg)',\n`;
  tw += `        },\n`;
  tw += `        warning: {\n`;
  tw += `          DEFAULT: 'var(--qhr-color-warning-bg)',\n`;
  tw += `          fg: 'var(--qhr-color-warning-fg)',\n`;
  tw += `        },\n`;
  tw += `      },\n`;
  tw += `      fontFamily: {\n`;
  tw += `        heading: ['var(--qhr-font-heading)'],\n`;
  tw += `        body: ['var(--qhr-font-body)'],\n`;
  tw += `        mono: ['var(--qhr-font-mono)'],\n`;
  tw += `      },\n`;
  tw += `    }\n  }\n};\n`;

  fs.writeFileSync(path.join(GENERATED_DIR, 'tailwind.preset.js'), tw, 'utf8');
}

run();
