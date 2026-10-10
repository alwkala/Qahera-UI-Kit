/**
 * Qahera UI Kit — Fast CLI Code Linter v1.7.0
 * 
 * Verifies that application files adhere strictly to Qahera design tokens,
 * logical CSS properties, Arabic font discipline, and zero-emoji invariants.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const EMOJI_REGEX = /(?:\p{Extended_Pictographic}|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF])/u;
const PHYSICAL_PROPERTIES_REGEX = /\b(margin-left|margin-right|padding-left|padding-right|left\s*:|right\s*:)/i;
const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{3}){1,2}\b/;

const WHITELISTED_CLASSES = new Set([
  'is-active', 'is-open', 'is-visible', 'is-hidden', 'is-loading',
  'active', 'open', 'hidden', 'fade', 'show',
  'sr-only', 'visually-hidden', 'container'
]);

function lintSingleFile(filePath, violations) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const relPath = path.relative(process.cwd(), filePath);

  if (content.toLowerCase().includes('amiri')) {
    violations.push({
      file: relPath,
      line: 1,
      rule: 'QAHERA-FONT-001',
      severity: 'ERROR',
      message: 'Prohibited font "Amiri" detected. Use Alexandria (display) or Cairo (body).'
    });
  }

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Emoji check
    if (EMOJI_REGEX.test(line)) {
      violations.push({
        file: relPath,
        line: lineNum,
        rule: 'QAHERA-VISUAL-001',
        severity: 'ERROR',
        message: 'Prohibited Unicode emoji. Use registered semantic SVG icons.'
      });
    }

    // Physical CSS check
    if (PHYSICAL_PROPERTIES_REGEX.test(line)) {
      violations.push({
        file: relPath,
        line: lineNum,
        rule: 'QAHERA-RTL-001',
        severity: 'ERROR',
        message: 'Physical layout property (e.g. margin-left). Use CSS logical properties.'
      });
    }

    // Hardcoded color check (warning if in style attribute or css block without token)
    const hexMatch = line.match(HEX_COLOR_REGEX);
    if (hexMatch && (line.includes('style=') || line.includes('color:') || line.includes('background:')) && !line.includes('--qhr-')) {
      violations.push({
        file: relPath,
        line: lineNum,
        rule: 'QAHERA-TOKEN-001',
        severity: 'WARN',
        message: `Hardcoded color "${hexMatch[0]}". Must map to canonical --qhr-* tokens.`
      });
    }

    // Non-canonical classes in HTML class attributes
    const classMatches = line.matchAll(/(?<![:@\w])class=["']([^"']+)["']/g);
    for (const match of classMatches) {
      const classStr = match[1];
      const classes = classStr.split(/\s+/).filter(Boolean);
      for (const cls of classes) {
        if (cls.startsWith('qhr-') || cls.startsWith('x-') || cls.startsWith('lucide-') || cls.startsWith('svg-') || WHITELISTED_CLASSES.has(cls)) {
          continue;
        }
        violations.push({
          file: relPath,
          line: lineNum,
          rule: 'QAHERA-COMP-001',
          severity: 'ERROR',
          message: `Arbitrary non-canonical class ".${cls}". Must use .qhr-* components.`
        });
      }
    }
  });
}

function scanPath(targetPath, violations, scannedFiles) {
  const stat = fs.statSync(targetPath);

  if (stat.isFile()) {
    scannedFiles.push(targetPath);
    lintSingleFile(targetPath, violations);
    return;
  }

  if (stat.isDirectory()) {
    const entries = fs.readdirSync(targetPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
      const fullPath = path.join(targetPath, entry.name);
      if (entry.isDirectory()) {
        scanPath(fullPath, violations, scannedFiles);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.html', '.php', '.jsx', '.tsx', '.vue', '.svelte'].includes(ext)) {
          scannedFiles.push(fullPath);
          lintSingleFile(fullPath, violations);
        }
      }
    }
  }
}

function lintFiles(target) {
  const resolvedTarget = path.resolve(process.cwd(), target);

  if (!fs.existsSync(resolvedTarget)) {
    console.error(`\x1b[31m[ERROR]\x1b[0m Target not found: ${resolvedTarget}`);
    return false;
  }

  console.log('\n\x1b[1;36m╔═══════════════════════════════════════════════════════════════════════════╗\x1b[0m');
  console.log('\x1b[1;36m║                      QAHERA ARCHITECTURAL LINTER                          ║\x1b[0m');
  console.log('\x1b[1;36m╚═══════════════════════════════════════════════════════════════════════════╝\x1b[0m\n');
  console.log(`Scanning target: \x1b[33m${resolvedTarget}\x1b[0m\n`);

  const violations = [];
  const scannedFiles = [];

  scanPath(resolvedTarget, violations, scannedFiles);

  console.log(`Scanned ${scannedFiles.length} file(s).\n`);

  if (violations.length === 0) {
    console.log('\x1b[1;32m✓ 100% CLEAN. Zero architectural violations detected.\x1b[0m\n');
    return true;
  }

  // Print grouped violations
  violations.forEach(v => {
    const color = v.severity === 'ERROR' ? '\x1b[31m' : '\x1b[33m';
    console.log(`  ${color}[${v.severity}]\x1b[0m \x1b[1m${v.file}:${v.line}\x1b[0m - \x1b[36m${v.rule}\x1b[0m`);
    console.log(`         ${v.message}`);
  });

  const errorsCount = violations.filter(v => v.severity === 'ERROR').length;
  const warnsCount = violations.filter(v => v.severity === 'WARN').length;

  console.log(`\nLint Summary: ${errorsCount} error(s), ${warnsCount} warning(s).`);

  if (errorsCount > 0) {
    console.log('\x1b[1;31mFAILED: Please fix the errors above before deploying or committing.\x1b[0m\n');
    return false;
  }

  console.log('\x1b[1;32mPASSED with warnings.\x1b[0m\n');
  return true;
}

module.exports = { lintFiles };

if (require.main === module) {
  const target = process.argv[2] || '.';
  const passed = lintFiles(target);
  process.exit(passed ? 0 : 1);
}
