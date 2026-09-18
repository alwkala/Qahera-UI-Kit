/**
 * Qahera UI Kit — Performance Budget & RSC Footprint Audit
 * 
 * Verifies:
 * 1. CSS bundle size does not exceed specified performance budgets
 * 2. React Server Components (RSC) footprint is strictly 0kb client JS
 * 3. Client components ('use client') are restricted only to interactive leaves
 */

'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_CSS = path.join(ROOT_DIR, 'dist', 'qahera.css');
const CSS_FILE = fs.existsSync(DIST_CSS) ? DIST_CSS : path.join(ROOT_DIR, 'renderers', 'html', 'native', 'components.css');
const REACT_DIR = path.join(ROOT_DIR, 'renderers', 'react');

const BUDGETS = {
  cssRawMaxKB: 240,    // Raw unminified max for 48 modular component & utility files
  cssGzipMaxKB: 35,    // Gzipped budget (actual network payload)
};

// Explicit whitelist of components allowed to use 'use client'
const ALLOWED_CLIENT_COMPONENTS = [
  'Modal.tsx',
  'Dropdown.tsx',
  'Tabs.tsx',
  'Accordion.tsx',
  'Select.tsx',
  'Toast.tsx',
  'Tooltip.tsx',
  'Carousel.tsx',
  'CanvasSparks.tsx',
  'BackToTop.tsx',
  'Preloader.tsx',
  'Drawer.tsx',
  'FileUpload.tsx',
  'Rating.tsx',
  'Treeview.tsx'
];

function runPerfAudit() {
  console.log('\n⚡ QAHERA PERFORMANCE BUDGET & RSC FOOTPRINT AUDIT');
  console.log('──────────────────────────────────────────────────────');

  let errors = 0;
  let warnings = 0;

  // 1. Audit CSS Bundle Budget
  console.log('\n[1/2] Checking CSS Bundle Size Budget...');
  if (fs.existsSync(CSS_FILE)) {
    const cssContent = fs.readFileSync(CSS_FILE);
    const rawKB = (cssContent.length / 1024).toFixed(2);
    const gzipped = zlib.gzipSync(cssContent);
    const gzipKB = (gzipped.length / 1024).toFixed(2);

    console.log(`  Raw CSS Size     : ${rawKB} KB (Budget: <= ${BUDGETS.cssRawMaxKB} KB)`);
    console.log(`  Gzipped CSS Size : ${gzipKB} KB (Budget: <= ${BUDGETS.cssGzipMaxKB} KB)`);

    if (rawKB > BUDGETS.cssRawMaxKB) {
      console.error(`  ✗ Raw CSS exceeds budget: ${rawKB} KB > ${BUDGETS.cssRawMaxKB} KB`);
      errors++;
    } else {
      console.log(`  ✓ Raw CSS size within budget`);
    }

    if (gzipKB > BUDGETS.cssGzipMaxKB) {
      console.error(`  ✗ Gzipped CSS exceeds budget: ${gzipKB} KB > ${BUDGETS.cssGzipMaxKB} KB`);
      errors++;
    } else {
      console.log(`  ✓ Gzipped CSS size within budget`);
    }
  } else {
    console.error(`  ✗ CSS file not found at ${CSS_FILE}`);
    errors++;
  }

  // 2. Audit React Server Components (RSC) 0kb Client Footprint
  console.log('\n[2/2] Checking RSC 0kb Footprint & Client Boundary Isolations...');
  if (fs.existsSync(REACT_DIR)) {
    const tsxFiles = fs.readdirSync(REACT_DIR).filter(f => f.endsWith('.tsx'));
    let rscCount = 0;
    let clientCount = 0;

    tsxFiles.forEach(file => {
      const content = fs.readFileSync(path.join(REACT_DIR, file), 'utf8');
      const isClient = /['"]use client['"]/.test(content);

      if (isClient) {
        clientCount++;
        if (!ALLOWED_CLIENT_COMPONENTS.includes(file)) {
          console.error(`  ✗ Unauthorized 'use client' directive found in ${file}! Must remain a Server Component.`);
          errors++;
        } else {
          console.log(`  ✓ Interactive Client Leaf Component: ${file}`);
        }
      } else {
        rscCount++;
      }
    });

    console.log(`  ✓ Verified ${rscCount} Pure Server Components (0kb Client JavaScript)`);
    console.log(`  ✓ Verified ${clientCount} Authorized Leaf Client Components`);
  }

  console.log('──────────────────────────────────────────────────────');
  console.log(`Perf Audit Summary: ${errors} Errors · ${warnings} Warnings`);
  return errors === 0;
}

if (require.main === module) {
  const success = runPerfAudit();
  process.exit(success ? 0 : 1);
}

module.exports = { runPerfAudit };
