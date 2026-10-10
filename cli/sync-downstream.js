/**
 * Qahera UI Kit — Downstream Website Asset Synchronizer v1.7.0
 * 
 * Automatically synchronizes compiled distribution assets and IDE custom data
 * from upstream Qahera UI Kit to downstream official website (c:\wamp64\www\Qahera).
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const WEBSITE_DIR = path.resolve(ROOT_DIR, '..', '..', '..', 'Qahera');

function syncDownstream(options = {}) {
  const quiet = options.quiet || false;

  if (!fs.existsSync(WEBSITE_DIR)) {
    if (!quiet) console.warn(`[Sync Downstream] Website directory not found at: ${WEBSITE_DIR}`);
    return false;
  }

  if (!quiet) {
    console.log(`[Sync Downstream] Synchronizing upstream assets to: ${WEBSITE_DIR}`);
  }

  const websiteDist = path.join(WEBSITE_DIR, 'dist');
  if (!fs.existsSync(websiteDist)) {
    fs.mkdirSync(websiteDist, { recursive: true });
  }

  const filesToSync = [
    { src: path.join(ROOT_DIR, 'dist', 'qahera.css'), dest: path.join(websiteDist, 'qahera.css') },
    { src: path.join(ROOT_DIR, 'dist', 'qahera-tokens.css'), dest: path.join(websiteDist, 'qahera-tokens.css') },
    { src: path.join(ROOT_DIR, 'dist', 'qahera-themes.css'), dest: path.join(websiteDist, 'qahera-themes.css') },
    { src: path.join(ROOT_DIR, 'qahera.css-data.json'), dest: path.join(WEBSITE_DIR, 'qahera.css-data.json') },
    { src: path.join(ROOT_DIR, 'qahera.html-data.json'), dest: path.join(WEBSITE_DIR, 'qahera.html-data.json') }
  ];

  let syncedCount = 0;

  for (const item of filesToSync) {
    if (fs.existsSync(item.src)) {
      fs.copyFileSync(item.src, item.dest);
      syncedCount++;
      if (!quiet) {
        console.log(`  ✓ Synced ${path.basename(item.src)} -> ${path.relative(WEBSITE_DIR, item.dest)}`);
      }
    }
  }

  if (!quiet) {
    console.log(`[Sync Downstream] Successfully synced ${syncedCount} assets.\n`);
  }

  return true;
}

module.exports = { syncDownstream };

if (require.main === module) {
  syncDownstream();
}
