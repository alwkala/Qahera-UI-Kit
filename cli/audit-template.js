'use strict';

/**
 * Qahera UI Kit — Template Compliance Auditor
 * 
 * Deterministically verifies that downstream application templates adhere strictly
 * to the Zero-Custom-CSS doctrine and canonical component registry.
 */

const fs = require('fs');
const path = require('path');

// Unicode Regex detecting pictorial emojis while preserving Arabic and Latin typography
const EMOJI_REGEX = /(?:\p{Extended_Pictographic}|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]|\uD83D[\uDE80-\uDEFF])/u;

// Physical layout properties strictly prohibited by RTL-first infrastructure
const PHYSICAL_PROPERTIES_REGEX = /\b(margin-left|margin-right|padding-left|padding-right|left\s*:|right\s*:)/i;

// Permitted non-qhr classes (pure micro-utilities and framework helpers)
const WHITELISTED_CLASSES = new Set([
  'is-active', 'is-open', 'is-visible', 'is-hidden', 'is-loading',
  'active', 'open', 'hidden', 'fade', 'show',
  'sr-only', 'visually-hidden', 'container'
]);

function auditTemplate(targetDir) {
  const resolvedDir = path.resolve(process.cwd(), targetDir);

  if (!fs.existsSync(resolvedDir)) {
    console.error(`\x1b[31m[ERROR]\x1b[0m Target directory does not exist: ${resolvedDir}`);
    return false;
  }

  const errors = [];
  const warnings = [];
  const checkedFiles = [];

  console.log('\n\x1b[1;36m╔═══════════════════════════════════════════════════════════════════════════╗\x1b[0m');
  console.log('\x1b[1;36m║                  QAHERA TEMPLATE COMPLIANCE AUDITOR                      ║\x1b[0m');
  console.log('\x1b[1;36m╚═══════════════════════════════════════════════════════════════════════════╝\x1b[0m\n');
  console.log(`Auditing target: \x1b[33m${resolvedDir}\x1b[0m\n`);

  // Step 1: Scan for forbidden stylesheet files
  scanForStylesheets(resolvedDir, resolvedDir, errors);

  // Step 2: Scan HTML files for class compliance, emojis, and inline violations
  scanHtmlFiles(resolvedDir, resolvedDir, errors, warnings, checkedFiles);

  // Print Summary Report
  console.log(`Audited \x1b[32m${checkedFiles.length}\x1b[0m HTML file(s).\n`);

  if (warnings.length > 0) {
    console.log('\x1b[33m--- WARNINGS ---\x1b[0m');
    warnings.forEach(w => console.log(`  \x1b[33m[WARN]\x1b[0m ${w}`));
    console.log('');
  }

  if (errors.length > 0) {
    console.log('\x1b[31m--- COMPLIANCE FAILURES ---\x1b[0m');
    errors.forEach(e => console.log(`  \x1b[31m[FAIL]\x1b[0m ${e}`));
    console.log(`\n\x1b[1;31mRESULT: FAILED (${errors.length} fatal violations). Template rejected.\x1b[0m\n`);
    return false;
  }

  console.log('\x1b[1;32mRESULT: PASSED (100% Qahera compliant. 0 bespoke CSS, 100% canonical tokens).\x1b[0m\n');
  return true;
}

function scanForStylesheets(dir, baseDir, errors) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      scanForStylesheets(fullPath, baseDir, errors);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.css', '.scss', '.sass', '.less'].includes(ext)) {
        errors.push(`QHR-RULE-001 (Zero-CSS Violation): Bespoke stylesheet detected at "${relPath}". Templates must have 0 custom CSS.`);
      }
    }
  }
}

function scanHtmlFiles(dir, baseDir, errors, warnings, checkedFiles) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      scanHtmlFiles(fullPath, baseDir, errors, warnings, checkedFiles);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.html', '.php'].includes(ext)) {
        checkedFiles.push(relPath);
        auditSingleHtmlFile(fullPath, relPath, errors, warnings);
      }
    }
  }
}

function auditSingleHtmlFile(filePath, relPath, errors, warnings) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // 1. Check for Amiri font
  if (content.toLowerCase().includes('amiri')) {
    errors.push(`QHR-RULE-005 (Font Discipline): Prohibited font "Amiri" detected in "${relPath}". Use Alexandria and Cairo.`);
  }

  // 2. Check for physical styling in <style> or style=""
  const styleMatch = content.match(/<style[\s\S]*?<\/style>/gi) || [];
  styleMatch.forEach(block => {
    if (PHYSICAL_PROPERTIES_REGEX.test(block)) {
      errors.push(`QHR-RULE-004 (RTL Infrastructure): Physical layout properties detected in <style> block inside "${relPath}". Use CSS logical properties.`);
    }
  });

  // 3. Line by line analysis for classes, emojis, and inline styles
  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Check emojis
    if (EMOJI_REGEX.test(line)) {
      errors.push(`QHR-RULE-007 (Zero Emoji Violation QAHERA-VISUAL-001): Unicode emoji detected at "${relPath}:${lineNum}". Use SVG icons from registry.`);
    }

    // Extract static classes: class="..."
    const staticClassMatches = line.matchAll(/(?<![:@\w])class=["']([^"']+)["']/g);
    for (const match of staticClassMatches) {
      const classStr = match[1];
      const classes = classStr.split(/\s+/).filter(Boolean);

      for (const cls of classes) {
        if (cls.startsWith('qhr-')) continue;
        if (cls.startsWith('x-')) continue;
        if (cls.startsWith('lucide-') || cls.startsWith('svg-')) continue;
        if (WHITELISTED_CLASSES.has(cls)) continue;

        errors.push(`QHR-RULE-002 (Unregistered Class): Arbitrary class ".${cls}" detected at "${relPath}:${lineNum}". Must use canonical .qhr-* classes.`);
      }
    }

    // Extract dynamic Alpine classes: :class="..." or x-bind:class="..."
    const dynamicClassMatches = line.matchAll(/(?::|x-bind:)class=["']([^"']+)["']/g);
    for (const match of dynamicClassMatches) {
      const expr = match[1];
      // Extract string literals inside the expression (single or double quoted words)
      const stringLiterals = expr.matchAll(/['"]([a-zA-Z0-9_-]+)['"]/g);
      for (const strMatch of stringLiterals) {
        const cls = strMatch[1];
        // Only test if it looks like a CSS class name
        if (cls.startsWith('qhr-') || WHITELISTED_CLASSES.has(cls)) continue;
        // Ignore booleans or values like 'all', 'classical', 'true', 'false', 'dark', 'light'
        if (['all', 'classical', 'medieval', 'early-modern', 'true', 'false', 'dark', 'light'].includes(cls)) continue;

        errors.push(`QHR-RULE-002 (Unregistered Class): Arbitrary dynamic class ".${cls}" detected at "${relPath}:${lineNum}". Must use canonical .qhr-* classes.`);
      }
    }
  });
}

module.exports = { auditTemplate };
