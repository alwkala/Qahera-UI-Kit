/**
 * Qahera UI Kit — CSS Bundler Pipeline
 * 
 * Aggregates modular component CSS files from renderers/html/native/components/
 * into production dist/qahera.css, and maintains renderers/html/native/components.css
 * as a clean @import manifest for local zero-build previews.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT_DIR = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'renderers', 'html', 'native', 'components');
const BUNDLE_OUT = path.join(ROOT_DIR, 'renderers', 'html', 'native', 'components.css');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const DIST_OUT = path.join(DIST_DIR, 'qahera.css');

// Order of concatenation to ensure correct cascade resolution (42 components + base/layout)
const CANONICAL_ORDER = [
  'base.css',
  'layout.css',
  'accordion.css',
  'alert.css',
  'avatar.css',
  'back-to-top.css',
  'badge.css',
  'breadcrumb.css',
  'button.css',
  'callout.css',
  'canvas-sparks.css',
  'card.css',
  'carousel.css',
  'checkbox.css',
  'chip.css',
  'divider.css',
  'dock.css',
  'drawer.css',
  'dropdown.css',
  'file-upload.css',
  'input.css',
  'kbd.css',
  'megamenu.css',
  'menu.css',
  'modal.css',
  'navbar.css',
  'pagination.css',
  'preloader.css',
  'progress.css',
  'radio.css',
  'rating.css',
  'ribbon.css',
  'select.css',
  'skeleton.css',
  'spinner.css',
  'stepper.css',
  'switch.css',
  'table.css',
  'tabs.css',
  'textarea.css',
  'timeline.css',
  'toast.css',
  'tooltip.css',
  'treeview.css',
  'utilities.css',
  'cartouche.css',
  'frieze.css',
  'questionnaire.css',
  'seal.css',
  'ticker.css',
  'telemetry.css',
  'watermark.css'
];

function buildCss(options = { quiet: false }) {
  if (!fs.existsSync(COMPONENTS_DIR)) {
    throw new Error(`Components directory not found: ${COMPONENTS_DIR}`);
  }

  const parts = [];
  const importLines = [
    '/**',
    ' * Qahera UI Kit — Component Style Index',
    ' * Zero-Build, Semantic, High-Contrast, Logical-Property First',
    ' * Modular manifest importing all 38 canonical components',
    ' */',
    ''
  ];

  for (const file of CANONICAL_ORDER) {
    const filePath = path.join(COMPONENTS_DIR, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8').trim();
      parts.push(content);
      importLines.push(`@import './components/${file}';`);
    } else {
      console.warn(`[CSS Bundler] Warning: Missing component file ${file}`);
    }
  }

  // Also include any newly discovered files
  const existingFiles = fs.readdirSync(COMPONENTS_DIR).filter(f => f.endsWith('.css'));
  for (const file of existingFiles) {
    if (!CANONICAL_ORDER.includes(file)) {
      const filePath = path.join(COMPONENTS_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8').trim();
      parts.push(content);
      importLines.push(`@import './components/${file}';`);
      if (!options.quiet) {
        console.log(`[CSS Bundler] Included newly discovered module: ${file}`);
      }
    }
  }

  const bundledCss = `/**\n * Qahera UI Kit — Production CSS Bundle v1.0.0\n * Generated automatically from modular components. DO NOT EDIT DIRECTLY.\n */\n\n` + 
    parts.map(p => p.replace(/\/\*[\s\S]*?\*\//g, '').trim()).filter(Boolean).join('\n\n') + '\n';
  const importManifest = importLines.join('\n') + '\n';

  // 1. Write clean @import manifest to renderers/html/native/components.css (No duplicate bloat!)
  fs.writeFileSync(BUNDLE_OUT, importManifest, 'utf8');

  // 2. Write production full bundle to dist/qahera.css
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
  }
  fs.writeFileSync(DIST_OUT, bundledCss, 'utf8');

  // 3. Write production themes bundle to dist/qahera-themes.css
  const THEMES_SRC = path.join(ROOT_DIR, 'tokens', 'themes', 'themes.css');
  const THEMES_DIST = path.join(DIST_DIR, 'qahera-themes.css');
  let themesRawKB = '0.00';
  let themesGzipKB = '0.00';
  if (fs.existsSync(THEMES_SRC)) {
    const themesContent = fs.readFileSync(THEMES_SRC, 'utf8');
    fs.writeFileSync(THEMES_DIST, themesContent, 'utf8');
    themesRawKB = (Buffer.byteLength(themesContent, 'utf8') / 1024).toFixed(2);
    themesGzipKB = (zlib.gzipSync(themesContent).length / 1024).toFixed(2);
  }

  // 4. Write production tokens bundle to dist/qahera-tokens.css
  const TOKENS_SRC = path.join(ROOT_DIR, 'tokens', 'tokens.css');
  const TOKENS_DIST = path.join(DIST_DIR, 'qahera-tokens.css');
  if (fs.existsSync(TOKENS_SRC)) {
    const tokensContent = fs.readFileSync(TOKENS_SRC, 'utf8');
    fs.writeFileSync(TOKENS_DIST, tokensContent, 'utf8');
  }

  // 5. Write production motion engine to dist/qahera-motion.js
  const MOTION_SRC = path.join(ROOT_DIR, 'behavior', 'motion.js');
  const MOTION_DIST = path.join(DIST_DIR, 'qahera-motion.js');
  if (fs.existsSync(MOTION_SRC)) {
    const motionContent = fs.readFileSync(MOTION_SRC, 'utf8');
    fs.writeFileSync(MOTION_DIST, motionContent, 'utf8');
  }

  const rawKB = (Buffer.byteLength(bundledCss, 'utf8') / 1024).toFixed(2);
  const gzipKB = (zlib.gzipSync(bundledCss).length / 1024).toFixed(2);

  if (!options.quiet) {
    console.log(`\n📦 QAHERA CSS BUNDLER`);
    console.log(`──────────────────────────────────────────────────────`);
    console.log(`  ✓ Aggregated ${existingFiles.length} modular component files (42 components + base/layout)`);
    console.log(`  ✓ Emitted: renderers/html/native/components.css (@import manifest, ${importLines.length} lines)`);
    console.log(`  ✓ Emitted: dist/qahera.css (Production bundle: ${rawKB} KB, gzip: ${gzipKB} KB)`);
    console.log(`  ✓ Emitted: dist/qahera-themes.css (Thematic Topography bundle: ${themesRawKB} KB, gzip: ${themesGzipKB} KB)`);
    console.log(`──────────────────────────────────────────────────────\n`);
  }

  return {
    rawKB,
    gzipKB,
    themesRawKB,
    themesGzipKB,
    modulesCount: existingFiles.length,
    outputPath: DIST_OUT
  };
}

if (require.main === module) {
  buildCss();
}

module.exports = { buildCss, CANONICAL_ORDER };
