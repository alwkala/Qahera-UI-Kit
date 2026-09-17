/**
 * Qahera UI Kit — Canonical Multi-Target Icon Compiler
 * 
 * Single Source of Truth: icons/registry.yaml
 * 
 * Emits:
 *   1. React TSX Component & Paths  -> renderers/react/Icon.tsx
 *   2. React TypeScript Union Types -> renderers/react/types.ts (QaheraIconName)
 *   3. PHP Plates Icon Partial      -> renderers/php/plates/icon.php
 *   4. Vanilla JS Icon Dictionary   -> renderers/js/qhr-core.js
 *   5. Native SVG Sprite Sheet      -> renderers/html/native/icons.svg
 * 
 * Adheres strictly to QAHERA-VISUAL-001 (Zero Emoji, pure SVG paths).
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { parseYaml } = require('../compiler/yaml');

const ROOT_DIR = path.resolve(__dirname, '..');
const REGISTRY_PATH = path.join(ROOT_DIR, 'icons', 'registry.yaml');

const TARGETS = {
  reactIcon: path.join(ROOT_DIR, 'renderers', 'react', 'Icon.tsx'),
  reactTypes: path.join(ROOT_DIR, 'renderers', 'react', 'types.ts'),
  phpIcon: path.join(ROOT_DIR, 'renderers', 'php', 'plates', 'icon.php'),
  jsCore: path.join(ROOT_DIR, 'renderers', 'js', 'qhr-core.js'),
  svgSprite: path.join(ROOT_DIR, 'renderers', 'html', 'native', 'icons.svg'),
};

function loadIconRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) {
    throw new Error(`Canonical icon registry not found at: ${REGISTRY_PATH}`);
  }
  const content = fs.readFileSync(REGISTRY_PATH, 'utf8');
  return parseYaml(content, REGISTRY_PATH);
}

function buildIcons(options = {}) {
  const quiet = options.quiet || false;
  const registry = loadIconRegistry();
  const icons = registry.icons || {};
  const iconNames = Object.keys(icons);
  const totalIcons = iconNames.length;

  if (!quiet) {
    console.log(`⚡ QAHERA ICON COMPILER`);
    console.log(`   Registry: icons/registry.yaml (${totalIcons} canonical icons)`);
    console.log(`──────────────────────────────────────────────────────`);
  }

  // Group icons by category
  const categories = {};
  for (const [name, icon] of Object.entries(icons)) {
    const cat = icon.category || 'other';
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({ name, ...icon });
  }

  // 1. Build React types.ts (Update QaheraIconName)
  updateReactTypes(categories, totalIcons);

  // 2. Build React Icon.tsx
  updateReactIconComponent(categories, totalIcons);

  // 3. Build PHP Plates icon.php
  updatePhpIconPartial(categories, totalIcons);

  // 4. Build JS qhr-core.js
  updateJsCore(categories, totalIcons);

  // 5. Build SVG sprite sheet
  generateSvgSprite(icons, totalIcons);

  if (!quiet) {
    console.log(`  ✓ Updated React types.ts (QaheraIconName: ${totalIcons} union members)`);
    console.log(`  ✓ Emitted React Icon.tsx (${totalIcons} paths mapped)`);
    console.log(`  ✓ Emitted PHP Plates icon.php (${totalIcons} paths mapped)`);
    console.log(`  ✓ Emitted JS qhr-core.js (QHR_ICON_PATHS: ${totalIcons} paths)`);
    console.log(`  ✓ Emitted SVG Sprite Sheet icons.svg (${totalIcons} symbols)`);
    console.log(`──────────────────────────────────────────────────────`);
    console.log(`🎉 Icon compilation complete: 5 multi-target distributions synced.\n`);
  }

  return { totalIcons, categories: Object.keys(categories) };
}

function updateReactTypes(categories, totalIcons) {
  let typesContent = fs.readFileSync(TARGETS.reactTypes, 'utf8');

  let typeUnion = `export type QaheraIconName =\n`;
  for (const [catName, catIcons] of Object.entries(categories)) {
    typeUnion += `  // ${catName.charAt(0).toUpperCase() + catName.slice(1)}\n`;
    for (const item of catIcons) {
      typeUnion += `  | '${item.name}'\n`;
    }
  }
  typeUnion += `;\n`;

  const regex = /export type QaheraIconName =[\s\S]*?;\n/;
  if (regex.test(typesContent)) {
    typesContent = typesContent.replace(regex, typeUnion);
    fs.writeFileSync(TARGETS.reactTypes, typesContent, 'utf8');
  } else {
    throw new Error('Could not find QaheraIconName in renderers/react/types.ts');
  }
}

function updateReactIconComponent(categories, totalIcons) {
  let iconJsx = `import React from 'react';\nimport { QaheraIconName, QaheraSize } from './types';\n\n`;
  iconJsx += `export interface IconProps extends React.SVGAttributes<SVGElement> {\n`;
  iconJsx += `  name: QaheraIconName;\n  size?: QaheraSize | number;\n  className?: string;\n}\n\n`;
  iconJsx += `const SIZE_MAP: Record<QaheraSize, number> = {\n  xs: 12,\n  sm: 16,\n  md: 20,\n  lg: 24,\n  xl: 32,\n};\n\n`;
  iconJsx += `// Canonical SVG paths from icons/registry.yaml (${totalIcons} semantic icons)\n`;
  iconJsx += `const ICON_PATHS: Record<QaheraIconName, string> = {\n`;

  for (const [catName, catIcons] of Object.entries(categories)) {
    iconJsx += `  // ${catName.charAt(0).toUpperCase() + catName.slice(1)}\n`;
    for (const item of catIcons) {
      iconJsx += `  '${item.name}': '${item.svg_path}',\n`;
    }
  }
  iconJsx += `};\n\n`;

  iconJsx += `export const Icon: React.FC<IconProps> = ({\n`;
  iconJsx += `  name,\n  size = 'md',\n  className = '',\n  ...props\n}) => {\n`;
  iconJsx += `  const pixelSize = typeof size === 'number' ? size : SIZE_MAP[size] || 20;\n`;
  iconJsx += `  const pathD = ICON_PATHS[name];\n\n`;
  iconJsx += `  if (!pathD) {\n`;
  iconJsx += `    console.warn(\`[Qahera Icon] Unknown icon name "\${name}". Registered icons: \${Object.keys(ICON_PATHS).length}.\`);\n`;
  iconJsx += `    return null;\n  }\n\n`;
  iconJsx += `  const isSpinner = name === 'spinner';\n\n`;
  iconJsx += `  return (\n    <svg\n`;
  iconJsx += `      width={pixelSize}\n      height={pixelSize}\n      viewBox="0 0 24 24"\n      fill="none"\n`;
  iconJsx += `      stroke="currentColor"\n      strokeWidth="2"\n      strokeLinecap="round"\n      strokeLinejoin="round"\n`;
  iconJsx += `      className={\`qhr-icon qhr-icon--\${name} \${isSpinner ? 'qhr-icon--spin' : ''} \${className}\`.trim()}\n`;
  iconJsx += `      aria-hidden="true"\n      {...props}\n    >\n`;
  iconJsx += `      <path d={pathD} />\n    </svg>\n  );\n};\n`;

  fs.writeFileSync(TARGETS.reactIcon, iconJsx, 'utf8');
}

function updatePhpIconPartial(categories, totalIcons) {
  let php = `<?php\n/**\n * Qahera UI Kit — Plates Template Partial: Icon\n *\n`;
  php += ` * Renders an authoritative semantic SVG icon from icons/registry.yaml (${totalIcons} icons).\n`;
  php += ` * Enforces QAHERA-VISUAL-001 (Zero emoji).\n *\n`;
  php += ` * @var League\\Plates\\Template\\Template $this\n`;
  php += ` * @var string $name Name of the registered icon\n`;
  php += ` * @var string|int $size Size token (xs, sm, md, lg, xl) or pixel integer\n`;
  php += ` * @var string $extraClass Additional CSS classes\n */\n`;
  php += `$name = $name ?? 'info';\n$size = $size ?? 'md';\n$extraClass = $extraClass ?? '';\n\n`;
  php += `$sizeMap = [\n    'xs' => 12,\n    'sm' => 16,\n    'md' => 20,\n    'lg' => 24,\n    'xl' => 32,\n];\n\n`;
  php += `$pixelSize = is_numeric($size) ? (int)$size : ($sizeMap[$size] ?? 20);\n\n`;
  php += `// Authoritative SVG paths from icons/registry.yaml (${totalIcons} icons)\n`;
  php += `$iconPaths = [\n`;

  for (const [catName, catIcons] of Object.entries(categories)) {
    php += `    // ${catName.charAt(0).toUpperCase() + catName.slice(1)}\n`;
    for (const item of catIcons) {
      php += `    '${item.name}' => '${item.svg_path}',\n`;
    }
  }
  php += `];\n\n`;
  php += `$path = $iconPaths[$name] ?? null;\n`;
  php += `if (!$path) {\n    return '';\n}\n\n`;
  php += `$isSpin = $name === 'spinner' ? 'qhr-icon--spin' : '';\n`;
  php += `$classes = trim("qhr-icon qhr-icon--{$name} {$isSpin} {$extraClass}");\n`;
  php += `?>\n`;
  php += `<svg width="<?= $pixelSize ?>" height="<?= $pixelSize ?>" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="<?= htmlspecialchars($classes, ENT_QUOTES, 'UTF-8') ?>" aria-hidden="true">\n`;
  php += `    <path d="<?= $path ?>" />\n`;
  php += `</svg>\n`;

  fs.writeFileSync(TARGETS.phpIcon, php, 'utf8');
}

function updateJsCore(categories, totalIcons) {
  let jsContent = fs.readFileSync(TARGETS.jsCore, 'utf8');

  let jsPaths = `// ─── Canonical Icon Paths (${totalIcons} semantic SVGs from icons/registry.yaml) ─\n`;
  jsPaths += `export const QHR_ICON_PATHS = {\n`;
  for (const [catName, catIcons] of Object.entries(categories)) {
    jsPaths += `  // ${catName.charAt(0).toUpperCase() + catName.slice(1)}\n`;
    for (const item of catIcons) {
      jsPaths += `  '${item.name}': '${item.svg_path}',\n`;
    }
  }
  jsPaths += `};\n`;

  const regex = /\/\/\s*───\s*Canonical Icon Paths[\s\S]*?export const QHR_ICON_PATHS = \{[\s\S]*?\};\n/;
  if (regex.test(jsContent)) {
    jsContent = jsContent.replace(regex, jsPaths);
    fs.writeFileSync(TARGETS.jsCore, jsContent, 'utf8');
  } else {
    throw new Error('Could not find QHR_ICON_PATHS in renderers/js/qhr-core.js');
  }
}

function generateSvgSprite(icons, totalIcons) {
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n`;
  for (const [name, icon] of Object.entries(icons)) {
    svg += `  <symbol id="qhr-icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n`;
    svg += `    <path d="${icon.svg_path}" />\n`;
    svg += `  </symbol>\n`;
  }
  svg += `</svg>\n`;

  fs.writeFileSync(TARGETS.svgSprite, svg, 'utf8');
}

if (require.main === module) {
  try {
    buildIcons();
    process.exit(0);
  } catch (err) {
    console.error('Error building icons:', err.message);
    process.exit(1);
  }
}

module.exports = { buildIcons };
