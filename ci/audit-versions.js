/**
 * Qahera UI Kit — Version Synchronization Audit
 * 
 * Invariant: package.json === VERSION === ai/qahera.yaml (version)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { parseYaml } = require('../compiler/yaml');

function runVersionAudit() {
  console.log('\n[Version Audit] Verifying canonical version synchronization across sources...');
  
  const rootDir = path.resolve(__dirname, '..');
  const pkgPath = path.join(rootDir, 'package.json');
  const versionPath = path.join(rootDir, 'VERSION');
  const aiQaheraPath = path.join(rootDir, 'ai', 'qahera.yaml');

  let passed = true;

  if (!fs.existsSync(pkgPath) || !fs.existsSync(versionPath) || !fs.existsSync(aiQaheraPath)) {
    console.error('❌ Version files missing');
    return false;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const versionRaw = fs.readFileSync(versionPath, 'utf8').trim();
  const aiYaml = parseYaml(fs.readFileSync(aiQaheraPath, 'utf8'));

  const pkgVer = pkg.version;
  const rawVer = versionRaw;
  const aiVer = aiYaml.version;

  if (pkgVer !== rawVer) {
    console.error(`❌ Version mismatch: package.json (${pkgVer}) !== VERSION (${rawVer})`);
    passed = false;
  }

  if (pkgVer !== aiVer) {
    console.error(`❌ Version mismatch: package.json (${pkgVer}) !== ai/qahera.yaml (${aiVer})`);
    passed = false;
  }

  if (passed) {
    console.log(`  ✓ Canonical Version in 100% sync: v${pkgVer}`);
  }

  return passed;
}

module.exports = { runVersionAudit };

if (require.main === module) {
  const ok = runVersionAudit();
  process.exit(ok ? 0 : 1);
}
