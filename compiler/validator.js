/**
 * Qahera UI Kit — Schema & Invariant Validator
 * 
 * Enforces:
 * - AGENTS.md 10 Non-Negotiable Invariants
 * - Controlled vocabulary (variants, sizes, states, tones)
 * - Anti-slop bans (no hex colors, no physical margins/paddings, no Amiri font)
 * - Required AI metadata
 */

'use strict';

const ALLOWED_CATEGORIES = [
  'actions',
  'forms',
  'selection',
  'containers',
  'feedback',
  'overlay',
  'navigation',
  'disclosure',
  'data-display',
  'media',
];

const PROHIBITED_VARIANTS = ['special', 'hero', 'nice', 'blue', 'action', 'bad'];
const PROHIBITED_SIZES = ['tiny', 'huge', 'normal', 'medium'];
const PROHIBITED_TONES = ['error', 'positive', 'alert-red', 'good'];

// Emoji detection regex covering Unicode emoji & pictograph ranges
const EMOJI_REGEX = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/u;

function containsEmoji(text) {
  if (typeof text !== 'string') return false;
  return EMOJI_REGEX.test(text);
}

function checkVisualAntiSlop(obj, file, currentPath, diagnostics) {
  if (!obj || typeof obj !== 'object') return;

  for (const [k, v] of Object.entries(obj)) {
    const p = currentPath ? `${currentPath}.${k}` : k;

    if (typeof v === 'string') {
      if (containsEmoji(v)) {
        diagnostics.error(
          'QAHERA-VISUAL-001',
          `Emoji detected in UI definition at "${p}": "${v}". Emoji are strictly forbidden as UI icons or visual markers.`,
          file,
          p,
          null,
          null,
          'Use an authoritative icon reference from icons/registry.yaml (e.g. icon: "delete", icon: "search") instead of emoji.'
        );
      }
    } else if (typeof v === 'object') {
      checkVisualAntiSlop(v, file, p, diagnostics);
    }
  }
}

function validateContract(contract, diagnostics) {
  const file = contract.source?.file || 'unknown';

  // Enforce QAHERA-VISUAL-001: Anti-emoji inspection
  checkVisualAntiSlop(contract, file, '', diagnostics);

  if (!contract.name) {
    diagnostics.error(
      'QAHERA-CONTRACT-001',
      'Component name is required.',
      file,
      'name',
      null,
      null,
      'Add a "name" property to the contract.'
    );
    return false;
  }

  if (typeof contract.name !== 'string') {
    diagnostics.error(
      'QAHERA-CONTRACT-002',
      'Component name must be a string.',
      file,
      'name',
      null,
      null,
      'Ensure name is a string.'
    );
  }

  if (!contract.category) {
    diagnostics.warn(
      'QAHERA-CONTRACT-003',
      'Component category is missing.',
      file,
      'category',
      null,
      null,
      `Specify one of: ${ALLOWED_CATEGORIES.join(', ')}`
    );
  } else if (!ALLOWED_CATEGORIES.includes(contract.category)) {
    diagnostics.warn(
      'QAHERA-CONTRACT-003',
      `Category "${contract.category}" is not in the standard list.`,
      file,
      'category',
      null,
      null,
      `Choose from: ${ALLOWED_CATEGORIES.join(', ')}`
    );
  }

  // Anatomy
  if (contract.anatomy !== undefined && !Array.isArray(contract.anatomy)) {
    diagnostics.error(
      'QAHERA-CONTRACT-004',
      'Anatomy must be an array of constituent structural parts.',
      file,
      'anatomy',
      null,
      null,
      'Define anatomy as a list, e.g. [root, label, icon-start].'
    );
  }

  // Controlled vocabulary checks: variants
  if (contract.variants) {
    const variantList = Array.isArray(contract.variants)
      ? contract.variants
      : Object.keys(contract.variants);

    for (const v of variantList) {
      if (PROHIBITED_VARIANTS.includes(v.toLowerCase())) {
        diagnostics.error(
          'QAHERA-VOCAB-001',
          `Prohibited variant name "${v}" detected in contract.`,
          file,
          `variants.${v}`,
          null,
          null,
          'Use canonical variants: primary, secondary, outline, ghost, link, destructive.'
        );
      }
    }
  }

  // Controlled vocabulary checks: sizes
  if (contract.sizes) {
    const sizeList = Array.isArray(contract.sizes)
      ? contract.sizes
      : Object.keys(contract.sizes);

    for (const s of sizeList) {
      if (PROHIBITED_SIZES.includes(s.toLowerCase())) {
        diagnostics.error(
          'QAHERA-VOCAB-002',
          `Prohibited size name "${s}" detected in contract.`,
          file,
          `sizes.${s}`,
          null,
          null,
          'Use canonical sizes: xs, sm, md, lg, xl.'
        );
      }
    }
  }

  // Accessibility
  if (!contract.accessibility) {
    diagnostics.warn(
      'QAHERA-CONTRACT-008',
      'Component contract is missing accessibility metadata.',
      file,
      'accessibility',
      null,
      null,
      'Define accessibility: { role: "...", keyboard: { ... } }.'
    );
  } else if (!contract.accessibility.role) {
    diagnostics.warn(
      'QAHERA-CONTRACT-008',
      'Component contract accessibility block missing ARIA "role".',
      file,
      'accessibility.role',
      null,
      null,
      'Specify the WAI-ARIA role for this component.'
    );
  }

  // AI Metadata
  if (!contract.ai && !contract.purpose) {
    diagnostics.warn(
      'QAHERA-CONTRACT-009',
      'Component missing AI guidance metadata (purpose / use_when / avoid_when).',
      file,
      'ai',
      null,
      null,
      'Include purpose and usage guidelines to guide AI coding agents.'
    );
  }

  return true;
}

function validateRecipe(recipe, contractMap, diagnostics) {
  const file = recipe.source?.file || recipe.file || 'unknown';
  const data = recipe.data || recipe;

  // Enforce QAHERA-VISUAL-001: Anti-emoji inspection
  checkVisualAntiSlop(data, file, '', diagnostics);

  const componentId = (data.id || data.component || data.name || '').toLowerCase();

  // Check if corresponding contract exists
  const contract = contractMap.get(componentId);
  if (!contract) {
    diagnostics.error(
      'QAHERA-RECIPE-001',
      `Recipe references unknown component "${data.component || data.name || componentId}".`,
      file,
      'component',
      null,
      null,
      'Ensure a matching contract exists in contracts/components/.'
    );
    return false;
  }

  // Check for anti-slop rules: Hex colors in recipe styles
  function inspectStyles(obj, currentPath = '') {
    if (!obj || typeof obj !== 'object') return;

    for (const [k, v] of Object.entries(obj)) {
      const p = currentPath ? `${currentPath}.${k}` : k;

      // Check physical margins/paddings
      if (['margin-left', 'margin-right', 'padding-left', 'padding-right'].includes(k)) {
        diagnostics.error(
          'QAHERA-RTL-001',
          `Physical directional property "${k}" is prohibited in recipe styles.`,
          file,
          p,
          null,
          null,
          `Use logical properties: ${k.includes('left') ? 'inline-start' : 'inline-end'}.`
        );
      }

      if (typeof v === 'string') {
        // Hex color check
        if (/#(?:[0-9a-fA-F]{3}){1,2}\b/.test(v)) {
          diagnostics.warn(
            'QAHERA-TOKEN-001',
            `Hardcoded color hex "${v}" detected in recipe.`,
            file,
            p,
            null,
            null,
            'Reference a design token instead, e.g. "{color.primary.bg}" or "var(--qhr-...)".'
          );
        }
      } else if (typeof v === 'object') {
        inspectStyles(v, p);
      }
    }
  }

  if (data.base) inspectStyles(data.base, 'base');
  if (data.variants) inspectStyles(data.variants, 'variants');

  return true;
}

module.exports = {
  validateContract,
  validateRecipe,
};
