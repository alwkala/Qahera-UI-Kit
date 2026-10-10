#!/usr/bin/env node
/**
 * Qahera UI Kit — GitHub Wiki Deployer
 * Copies staged markdown files from docs/wiki/ into the remote .wiki.git repository
 */

import { execSync } from 'node:child_process';
import { existsSync, rmSync, cpSync } from 'node:fs';
import { resolve } from 'node:path';

const REPO_URL = 'https://github.com/alwkala/Qahera-UI-Kit.wiki.git';
const TEMP_DIR = resolve(process.cwd(), '.wiki_temp');
const WIKI_SOURCE = resolve(process.cwd(), 'docs/wiki');

console.log('🏛️  Deploying Qahera UI Kit Wiki...');

try {
  // 1. Verify remote is provisioned
  try {
    execSync(`git ls-remote ${REPO_URL}`, { stdio: 'pipe' });
  } catch (err) {
    console.error('❌ GitHub Wiki repository is not yet provisioned on GitHub.');
    console.error('👉 Please visit: https://github.com/alwkala/Qahera-UI-Kit/wiki');
    console.error('👉 Click the green button "Create the first page", save it, and then re-run this command.');
    process.exit(1);
  }

  // 2. Clean temporary directory if exists
  if (existsSync(TEMP_DIR)) {
    rmSync(TEMP_DIR, { recursive: true, force: true });
  }

  // 3. Clone wiki repository
  console.log('📥 Cloning wiki repository...');
  execSync(`git clone ${REPO_URL} "${TEMP_DIR}"`, { stdio: 'inherit' });

  // 4. Copy all staged files from docs/wiki/
  console.log('📋 Copying staged wiki files from docs/wiki/...');
  cpSync(WIKI_SOURCE, TEMP_DIR, { recursive: true });

  // 5. Commit and push
  execSync('git add -A', { cwd: TEMP_DIR, stdio: 'inherit' });
  try {
    execSync('git commit -m "docs(wiki): deploy official Qahera UI Kit wiki documentation portal"', { cwd: TEMP_DIR, stdio: 'inherit' });
    console.log('🚀 Pushing updates to GitHub Wiki...');
    execSync('git push origin master', { cwd: TEMP_DIR, stdio: 'inherit' });
    console.log('🎉 Wiki deployed successfully to https://github.com/alwkala/Qahera-UI-Kit/wiki');
  } catch (commitErr) {
    console.log('ℹ️ No changes detected in wiki contents.');
  }

  // 6. Cleanup
  rmSync(TEMP_DIR, { recursive: true, force: true });
} catch (error) {
  console.error('❌ Failed to deploy wiki:', error.message);
  if (existsSync(TEMP_DIR)) {
    rmSync(TEMP_DIR, { recursive: true, force: true });
  }
  process.exit(1);
}
