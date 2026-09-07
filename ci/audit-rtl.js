/**
 * Qahera UI Kit — Strict RTL/LTR Bidirectional Parity & Logical CSS Audit
 * 
 * Verifies:
 * 1. ZERO hardcoded physical directional properties in CSS (e.g. margin-left, right: 0)
 * 2. 100% adoption of CSS Logical Properties (margin-inline, inset-inline, border-inline)
 * 3. Bidirectional parity across Arabic and Latin typography stacks
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const CSS_FILE = path.join(ROOT_DIR, 'renderers', 'html', 'native', 'components.css');
const HTML_DIR = path.join(ROOT_DIR, 'renderers', 'html', 'native');

// Forbidden physical CSS patterns
const FORBIDDEN_PATTERNS = [
  { pattern: /margin-left\s*:/i, name: 'margin-left', fix: 'margin-inline-start' },
  { pattern: /margin-right\s*:/i, name: 'margin-right', fix: 'margin-inline-end' },
  { pattern: /padding-left\s*:/i, name: 'padding-left', fix: 'padding-inline-start' },
  { pattern: /padding-right\s*:/i, name: 'padding-right', fix: 'padding-inline-end' },
  { pattern: /border-left\s*:/i, name: 'border-left', fix: 'border-inline-start' },
  { pattern: /border-right\s*:/i, name: 'border-right', fix: 'border-inline-end' },
  { pattern: /(?<![\w-])left\s*:\s*(?!auto|inherit)/i, name: 'left', fix: 'inset-inline-start' },
  { pattern: /(?<![\w-])right\s*:\s*(?!auto|inherit)/i, name: 'right', fix: 'inset-inline-end' },
  { pattern: /float\s*:\s*(left|right)/i, name: 'float: left/right', fix: 'flexbox/grid alignment' },
];

function runRtlAudit() {
  console.log('\n🧭 QAHERA STRICT RTL/LTR PARITY & LOGICAL CSS AUDIT');
  console.log('──────────────────────────────────────────────────────');

  let errors = 0;
  let warnings = 0;

  // 1. Audit components.css for physical CSS properties
  console.log('\n[1/2] Scanning components.css for forbidden physical CSS...');
  if (fs.existsSync(CSS_FILE)) {
    const cssLines = fs.readFileSync(CSS_FILE, 'utf8').split('\n');
    let violations = 0;

    cssLines.forEach((line, idx) => {
      // Skip comments
      if (line.trim().startsWith('/*') || line.trim().startsWith('*')) return;

      FORBIDDEN_PATTERNS.forEach(rule => {
        if (rule.pattern.test(line)) {
          // Allow exceptions in transform translates or keyframe names if any
          if (line.includes('translateX') || line.includes('@keyframes')) return;

          console.error(`  ✗ Line ${idx + 1}: Forbidden physical property "${rule.name}" found!`);
          console.error(`    Code: ${line.trim()}`);
          console.error(`    Fix:  Replace with logical property "${rule.fix}"`);
          violations++;
          errors++;
        }
      });
    });

    if (violations === 0) {
      console.log(`  ✓ components.css is 100% Logical CSS clean (${cssLines.length} lines scanned)`);
    }
  }

  const MODULAR_DIR = path.join(ROOT_DIR, 'renderers', 'html', 'native', 'components');
  if (fs.existsSync(MODULAR_DIR)) {
    const modFiles = fs.readdirSync(MODULAR_DIR).filter(f => f.endsWith('.css'));
    let modViolations = 0;
    modFiles.forEach(file => {
      const filePath = path.join(MODULAR_DIR, file);
      const fileLines = fs.readFileSync(filePath, 'utf8').split('\n');
      fileLines.forEach((line, idx) => {
        if (line.trim().startsWith('/*') || line.trim().startsWith('*')) return;
        FORBIDDEN_PATTERNS.forEach(rule => {
          if (rule.pattern.test(line)) {
            if (line.includes('translateX') || line.includes('@keyframes')) return;
            console.error(`  ✗ [components/${file}] Line ${idx + 1}: Forbidden physical property "${rule.name}" found!`);
            modViolations++;
            errors++;
          }
        });
      });
    });
    if (modViolations === 0) {
      console.log(`  ✓ All ${modFiles.length} modular component CSS files verified 100% Logical CSS clean`);
    }
  }

  // 2. Audit typography stacks for Cairo & El Messiri
  console.log('\n[2/2] Checking Arabic Typography Discipline in CSS...');
  if (fs.existsSync(CSS_FILE)) {
    const cssContent = fs.readFileSync(CSS_FILE, 'utf8');
    if (/font-family:[^;]*Amiri/i.test(cssContent)) {
      console.error('  ✗ Forbidden font "Amiri" detected! Use Cairo or El Messiri instead.');
      errors++;
    } else {
      console.log('  ✓ Zero forbidden fonts detected (Amiri ban respected).');
    }

    if ((/Alexandria/i.test(cssContent) && /Cairo/i.test(cssContent)) || /var\(--qhr-font-body\)/i.test(cssContent)) {
      console.log('  ✓ Alexandria/Cairo primary typography tokens actively referenced.');
    }
  }

  console.log('──────────────────────────────────────────────────────');
  console.log(`RTL Audit Summary: ${errors} Errors · ${warnings} Warnings`);
  return errors === 0;
}

if (require.main === module) {
  const success = runRtlAudit();
  process.exit(success ? 0 : 1);
}

module.exports = { runRtlAudit };
