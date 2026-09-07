/**
 * Qahera UI Kit — Unified CI Test Runner
 * 
 * Orchestrates:
 * 1. Contract & Recipe Schema Validation (`bin/qahera.js validate`)
 * 2. Automated Accessibility & Contrast Audit (`ci/audit-a11y.js`)
 * 3. Performance Budget & RSC Footprint Audit (`ci/audit-perf.js`)
 * 4. Strict RTL/LTR Logical CSS Parity Audit (`ci/audit-rtl.js`)
 */

'use strict';

const { runA11yAudit } = require('./audit-a11y');
const { runPerfAudit } = require('./audit-perf');
const { runRtlAudit } = require('./audit-rtl');
const { runQaheraCompiler } = require('../compiler/compiler');

function runAllAudits() {
  console.log('\n🏛️  QAHERA UI KIT — UNIFIED QUALITY & CI AUDIT SUITE');
  console.log('══════════════════════════════════════════════════════');

  const startTime = Date.now();
  let allPassed = true;

  // 1. Compiler and Schema Validation
  console.log('\n[Stage 1/4] Running Compiler Schema & Invariant Validation...');
  const compilerPassed = runQaheraCompiler({ writeArtifacts: false });
  if (!compilerPassed) allPassed = false;

  // 2. A11y Audit
  console.log('\n[Stage 2/4] Running WCAG 2.1 AA Accessibility Audit...');
  const a11yPassed = runA11yAudit();
  if (!a11yPassed) allPassed = false;

  // 3. Performance Budget Audit
  console.log('\n[Stage 3/4] Running Performance Budget & RSC Footprint Audit...');
  const perfPassed = runPerfAudit();
  if (!perfPassed) allPassed = false;

  // 4. RTL Parity Audit
  console.log('\n[Stage 4/4] Running Strict RTL/LTR Parity & Logical CSS Audit...');
  const rtlPassed = runRtlAudit();
  if (!rtlPassed) allPassed = false;

  const duration = Date.now() - startTime;

  console.log('\n══════════════════════════════════════════════════════');
  if (allPassed) {
    console.log(`🎉 ALL AUDITS PASSED CLEANLY (${duration}ms)`);
    console.log('   ✓ Schema & Invariants : 100% Passed');
    console.log('   ✓ WCAG 2.1 AA Contrast: 100% Passed');
    console.log('   ✓ Performance Budgets : 100% Passed (0kb RSC Footprint)');
    console.log('   ✓ RTL/LTR Logical CSS : 100% Passed');
    console.log('══════════════════════════════════════════════════════\n');
  } else {
    console.error(`❌ CI AUDIT FAILED (${duration}ms). Please resolve the errors above.\n`);
  }

  return allPassed;
}

if (require.main === module) {
  const passed = runAllAudits();
  process.exit(passed ? 0 : 1);
}

module.exports = { runAllAudits };
