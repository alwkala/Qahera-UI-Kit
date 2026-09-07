/**
 * Qahera UI Kit — Dependency & Reference Resolver
 * 
 * Resolves:
 * - Contract references
 * - Recipe references
 * - Token references
 * - Behavior modules
 * - Build input SHA-256 hash
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function resolveBehavior(componentId, behaviorDir) {
  const candidates = [
    `${componentId}.js`,
    `${componentId.replace('-', '')}.js`,
  ];

  if (componentId === 'nav') candidates.push('navbar.js');

  for (const c of candidates) {
    const fullPath = path.join(behaviorDir, c);
    if (fs.existsSync(fullPath)) {
      return {
        file: `behavior/${c}`,
        moduleName: c.replace('.js', ''),
      };
    }
  }

  return null;
}

function resolveTokenRef(refString, tokens) {
  if (typeof refString !== 'string') return refString;
  const match = refString.match(/^\{([a-zA-Z0-9._-]+)\}$/);
  if (!match) return refString;

  const parts = match[1].split('.');
  let curr = tokens;
  for (const part of parts) {
    if (curr && typeof curr === 'object' && part in curr) {
      curr = curr[part];
    } else {
      return `var(--qhr-${parts.join('-')})`;
    }
  }

  return curr && curr.value !== undefined ? curr.value : curr;
}

function calculateSourceHash(fileEntries) {
  // Sort files deterministically
  const sortedEntries = [...fileEntries].sort((a, b) => a.file.localeCompare(b.file));
  const hash = crypto.createHash('sha256');

  for (const entry of sortedEntries) {
    hash.update(entry.file);
    hash.update(':');
    hash.update(entry.content);
    hash.update('\n---\n');
  }

  return hash.digest('hex');
}

module.exports = {
  resolveBehavior,
  resolveTokenRef,
  calculateSourceHash,
};
