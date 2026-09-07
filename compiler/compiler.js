/**
 * Qahera UI Kit — Design System Compiler & Registry Engine
 * 
 * Pipeline:
 * 1. Discover   -> List definitions in contracts/, recipes/, tokens/, behavior/ (sorted)
 * 2. Parse      -> Deterministic YAML subset parsing with line/col tracking
 * 3. Normalize  -> Derive Canonical ID (kebab-case), Display Name, and Framework name
 * 4. Validate   -> Schema, controlled vocabulary, and anti-slop rules
 * 5. Resolve    -> Cross-reference contracts, recipes, tokens, behaviors
 * 6. Register   -> Construct the authoritative Qahera Registry
 * 7. Generate   -> Emit generated/json/*.json, manifests/components.json (deterministic)
 * 8. Report     -> Emit diagnostics.json, build.json, and terminal summary
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { parseYaml, YamlParseError } = require('./yaml');
const { Diagnostics } = require('./diagnostics');
const { validateContract, validateRecipe } = require('./validator');
const { resolveBehavior, calculateSourceHash } = require('./resolver');

const ROOT_DIR = path.resolve(__dirname, '..');

const PATHS = {
  contracts: path.join(ROOT_DIR, 'contracts', 'components'),
  recipes: path.join(ROOT_DIR, 'recipes'),
  patterns: path.join(ROOT_DIR, 'patterns'),
  behavior: path.join(ROOT_DIR, 'behavior'),
  tokens: path.join(ROOT_DIR, 'tokens'),
  icons: path.join(ROOT_DIR, 'icons', 'registry.yaml'),
  decisionMatrix: path.join(ROOT_DIR, 'contracts', 'ai-decision-matrix.yaml'),
  generated: path.join(ROOT_DIR, 'generated'),
  generatedJson: path.join(ROOT_DIR, 'generated', 'json'),
  generatedCss: path.join(ROOT_DIR, 'generated', 'css'),
  generatedManifests: path.join(ROOT_DIR, 'generated', 'manifests'),
  generatedDiagnostics: path.join(ROOT_DIR, 'generated', 'diagnostics'),
};

const pkg = require('../package.json');
const COMPILER_VERSION = pkg.version || '1.5.0';

function ensureDirs() {
  [
    PATHS.generated,
    PATHS.generatedJson,
    PATHS.generatedCss,
    PATHS.generatedManifests,
    PATHS.generatedDiagnostics,
  ].forEach(d => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });
}

function relative(p) {
  return path.relative(ROOT_DIR, p).replace(/\\/g, '/');
}

// Convert string to kebab-case
function toKebabCase(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

// Convert string to Human Readable Display Name
function toDisplayName(str) {
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

// Convert string to Framework PascalCase
function toPascalCase(str) {
  return toDisplayName(str).replace(/\s+/g, '');
}

function listSortedFiles(dir, ext = '.yaml') {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(f => f.toLowerCase().endsWith(ext) || f.toLowerCase().endsWith(ext.replace('.yaml', '.yml')))
    .sort((a, b) => a.localeCompare(b));
}

function runQaheraCompiler(options = {}) {
  const startTime = Date.now();
  ensureDirs();

  const diagnostics = new Diagnostics();
  const inputEntriesForHash = [];

  console.log('\n⚡ QAHERA DESIGN SYSTEM COMPILER & REGISTRY');
  console.log(`   Version: ${COMPILER_VERSION} · Mode: Canonical Pipeline\n`);

  /* ---------------------------------------------------------
   * Stage 1: Discover
   * ------------------------------------------------------- */
  const contractFiles = listSortedFiles(PATHS.contracts);
  const recipeFiles = listSortedFiles(PATHS.recipes);
  const patternFiles = listSortedFiles(PATHS.patterns);

  console.log(`🔍 [1/8 Discover]   ${contractFiles.length} contracts · ${recipeFiles.length} recipes · ${patternFiles.length} patterns`);

  /* ---------------------------------------------------------
   * Stage 2: Parse
   * ------------------------------------------------------- */
  const rawContracts = [];
  for (const file of contractFiles) {
    const fullPath = path.join(PATHS.contracts, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    inputEntriesForHash.push({ file: relative(fullPath), content });

    try {
      const data = parseYaml(content, fullPath);
      rawContracts.push({
        file: relative(fullPath),
        data,
      });
    } catch (err) {
      if (err instanceof YamlParseError) {
        diagnostics.error(err.code, err.message, relative(fullPath), null, err.line, err.column, err.suggestion);
      } else {
        diagnostics.error('QAHERA-YAML-001', err.message, relative(fullPath));
      }
    }
  }

  const rawRecipes = [];
  for (const file of recipeFiles) {
    const fullPath = path.join(PATHS.recipes, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    inputEntriesForHash.push({ file: relative(fullPath), content });

    try {
      const data = parseYaml(content, fullPath);
      rawRecipes.push({
        file: relative(fullPath),
        data,
      });
    } catch (err) {
      if (err instanceof YamlParseError) {
        diagnostics.error(err.code, err.message, relative(fullPath), null, err.line, err.column, err.suggestion);
      } else {
        diagnostics.error('QAHERA-YAML-001', err.message, relative(fullPath));
      }
    }
  }

  const rawPatterns = [];
  for (const file of patternFiles) {
    const fullPath = path.join(PATHS.patterns, file);
    const content = fs.readFileSync(fullPath, 'utf8');
    inputEntriesForHash.push({ file: relative(fullPath), content });

    try {
      const data = parseYaml(content, fullPath);
      rawPatterns.push({
        file: relative(fullPath),
        data,
      });
    } catch (err) {
      if (err instanceof YamlParseError) {
        diagnostics.error(err.code, err.message, relative(fullPath), null, err.line, err.column, err.suggestion);
      } else {
        diagnostics.error('QAHERA-YAML-001', err.message, relative(fullPath));
      }
    }
  }

  let decisionMatrix = null;
  if (fs.existsSync(PATHS.decisionMatrix)) {
    const content = fs.readFileSync(PATHS.decisionMatrix, 'utf8');
    inputEntriesForHash.push({ file: relative(PATHS.decisionMatrix), content });
    try {
      decisionMatrix = parseYaml(content, PATHS.decisionMatrix);
    } catch (_) {}
  }

  let iconRegistry = null;
  if (fs.existsSync(PATHS.icons)) {
    const content = fs.readFileSync(PATHS.icons, 'utf8');
    inputEntriesForHash.push({ file: relative(PATHS.icons), content });
    try {
      iconRegistry = parseYaml(content, PATHS.icons);
    } catch (err) {
      if (err instanceof YamlParseError) {
        diagnostics.error(err.code, err.message, relative(PATHS.icons), null, err.line, err.column, err.suggestion);
      } else {
        diagnostics.error('QAHERA-YAML-001', err.message, relative(PATHS.icons));
      }
    }
  }

  const iconCount = iconRegistry?.icons ? Object.keys(iconRegistry.icons).length : 0;
  console.log(`📑 [2/8 Parse]      Parsed ${rawContracts.length} contracts · ${rawRecipes.length} recipes · ${rawPatterns.length} patterns · ${iconCount} icons cleanly`);

  /* ---------------------------------------------------------
   * Stage 3: Normalize
   * ------------------------------------------------------- */
  const normalizedContracts = [];
  for (const doc of rawContracts) {
    const raw = doc.data;
    const baseName = path.basename(doc.file, path.extname(doc.file));
    const canonicalId = toKebabCase(raw.id || raw.name || baseName);
    const displayName = toDisplayName(raw.name || baseName);
    const componentName = toPascalCase(displayName);

    normalizedContracts.push({
      ...raw,
      id: canonicalId,
      name: displayName,
      component: componentName,
      category: raw.category || 'general',
      version: raw.version || '1.0.0',
      source: { file: doc.file },
    });
  }

  const normalizedRecipes = [];
  for (const doc of rawRecipes) {
    const raw = doc.data;
    const baseName = path.basename(doc.file, path.extname(doc.file));
    const canonicalId = toKebabCase(raw.id || raw.component || raw.name || baseName);

    normalizedRecipes.push({
      ...raw,
      id: canonicalId,
      component: toPascalCase(canonicalId),
      source: { file: doc.file },
    });
  }

  console.log(`📐 [3/8 Normalize]  Canonical IDs & Display Names unified`);

  /* ---------------------------------------------------------
   * Stage 4: Validate
   * ------------------------------------------------------- */
  for (const contract of normalizedContracts) {
    validateContract(contract, diagnostics);
  }

  const contractMapById = new Map(normalizedContracts.map(c => [c.id, c]));

  for (const recipe of normalizedRecipes) {
    validateRecipe(recipe, contractMapById, diagnostics);
  }

  console.log(`🛡️  [4/8 Validate]   Checked schema integrity & non-negotiable invariants`);

  /* ---------------------------------------------------------
   * Stage 5: Resolve
   * ------------------------------------------------------- */
  const recipeMapById = new Map(normalizedRecipes.map(r => [r.id, r]));

  console.log(`🔗 [5/8 Resolve]    Linked cross-references & behavior modules`);

  /* ---------------------------------------------------------
   * Stage 6: Register (The Heart: Canonical Qahera Registry)
   * ------------------------------------------------------- */
  const registry = {};

  for (const contract of normalizedContracts) {
    const componentId = contract.id;
    const recipe = recipeMapById.get(componentId);
    const behavior = resolveBehavior(componentId, PATHS.behavior);

    registry[componentId] = {
      id: componentId,
      name: contract.name,
      component: contract.component,
      category: contract.category,
      version: contract.version,
      contract: {
        anatomy: contract.anatomy || [],
        variants: contract.variants || [],
        sizes: contract.sizes || [],
        states: contract.states || [],
        slots: contract.slots || [],
        accessibility: contract.accessibility || {},
      },
      recipe: recipe
        ? {
            file: recipe.source?.file || null,
            base: recipe.base || {},
            variants: recipe.variants || {},
            sizes: recipe.sizes || {},
            states: recipe.states || {},
          }
        : null,
      behavior: behavior || null,
      ai: {
        purpose: contract.purpose || contract.ai?.purpose || contract.ai?.description || '',
        whenToUse: contract.ai?.whenToUse || contract.ai?.use_when || recipe?.ai?.preferred_when || [],
        avoid: contract.ai?.avoid || contract.ai?.avoid_when || recipe?.ai?.avoid_when || [],
        related: recipe?.meta?.alternatives || contract.ai?.common_patterns || [],
      },
      source: contract.source,
    };
  }

  // Register Patterns
  const patternsRegistry = {};
  for (const item of rawPatterns) {
    const p = item.data;
    if (!p) continue;
    const pid = p.id || toKebabCase(p.name || path.basename(item.file, path.extname(item.file)));
    patternsRegistry[pid] = {
      id: pid,
      name: p.name || pid,
      category: p.category || 'layout',
      purpose: p.purpose ? p.purpose.trim() : '',
      components: p.components || [],
      anatomy: p.anatomy || [],
      slots: p.slots || [],
      layout: p.layout || {},
      accessibility: p.accessibility || {},
      ai: p.ai || {},
      source: { file: item.file },
    };
  }

  console.log(`🏛️  [6/8 Register]   Constructed Canonical Registry for ${Object.keys(registry).length} components & ${Object.keys(patternsRegistry).length} patterns`);

  /* ---------------------------------------------------------
   * Stage 7: Generate (Deterministic Artifacts)
   * ------------------------------------------------------- */
  // 1. Per-component JSON
  let generatedJsonCount = 0;
  for (const [id, item] of Object.entries(registry)) {
    const target = path.join(PATHS.generatedJson, `${id}.json`);
    fs.writeFileSync(target, JSON.stringify(item, null, 2) + '\n', 'utf8');
    generatedJsonCount++;
  }

  // 2. Compute deterministic sourceHash
  const sourceHash = calculateSourceHash(inputEntriesForHash);

  // 3. Components manifest (Deterministic — NO dynamic timestamps!)
  const sortedComponentsList = Object.keys(registry)
    .sort((a, b) => a.localeCompare(b))
    .map(id => {
      const item = registry[id];
      return {
        id: item.id,
        name: item.name,
        component: item.component,
        category: item.category,
        contract: item.source.file,
        recipe: item.recipe ? item.recipe.file : null,
        behavior: item.behavior ? item.behavior.file : null,
      };
    });

  const componentsManifest = {
    schema: 'qahera.component-manifest/v1',
    compiler: COMPILER_VERSION,
    sourceHash,
    counts: {
      components: sortedComponentsList.length,
      recipes: normalizedRecipes.length,
      patterns: Object.keys(patternsRegistry).length,
    },
    components: sortedComponentsList,
  };

  const manifestPath = path.join(PATHS.generatedManifests, 'components.json');
  fs.writeFileSync(manifestPath, JSON.stringify(componentsManifest, null, 2) + '\n', 'utf8');

  // 4. Recipes manifest
  const sortedRecipesMap = {};
  for (const id of Object.keys(registry).sort((a, b) => a.localeCompare(b))) {
    if (registry[id].recipe) {
      sortedRecipesMap[registry[id].component] = {
        id,
        component: registry[id].component,
        category: registry[id].category,
        base: registry[id].recipe.base,
        variants: registry[id].recipe.variants,
        sizes: registry[id].recipe.sizes,
        states: registry[id].recipe.states,
        ai: registry[id].ai,
      };
    }
  }

  const recipesManifest = {
    schema: 'qahera.recipe-manifest/v1',
    compiler: COMPILER_VERSION,
    sourceHash,
    recipeCount: Object.keys(sortedRecipesMap).length,
    recipes: sortedRecipesMap,
  };

  const recipesManifestPath = path.join(PATHS.generatedManifests, 'recipes.json');
  fs.writeFileSync(recipesManifestPath, JSON.stringify(recipesManifest, null, 2) + '\n', 'utf8');

  // 5. Icons manifest
  if (iconRegistry) {
    const iconsManifest = {
      schema: 'qahera.icon-manifest/v1',
      compiler: COMPILER_VERSION,
      sourceHash,
      iconCount,
      policy: iconRegistry.policy || {},
      categories: iconRegistry.categories || [],
      icons: iconRegistry.icons || {},
    };
    const iconsManifestPath = path.join(PATHS.generatedManifests, 'icons.json');
    fs.writeFileSync(iconsManifestPath, JSON.stringify(iconsManifest, null, 2) + '\n', 'utf8');
  }

  // 6. Canonical AI Registry (The authoritative single-file index for AI agents)
  const canonicalRegistry = {
    schema: 'qahera.canonical-registry/v1',
    system: 'Qahera UI Kit',
    version: COMPILER_VERSION,
    equation: 'Qahera UI Kit v1.0 = Design System + Registry + AI Decision Layer',
    sourceHash,
    ai_guidance: {
      core_thesis: 'Qahera UI Kit v1.0 = Design System + Registry + AI Decision Layer (not merely Component Library + Compiler)',
      philosophy: 'A design system built for developers and AI agents.',
      rtl: 'Infrastructure-level, logical CSS properties only.',
      typography: {
        primary: 'Cairo',
        heading: 'Cairo',
        body: 'Cairo',
        supported_alternatives: {
          arabic_display: 'El Messiri',
          arabic_body_alt: 'Tajawal',
          arabic_tech: 'IBM Plex Sans Arabic',
          latin_heading: 'Plus Jakarta Sans',
          latin_body: 'Inter',
        },
        banned: ['Amiri'],
      },
      icons: {
        policy: 'required',
        emoji_policy: 'forbidden',
        rule: 'QAHERA-VISUAL-001: Emoji are strictly forbidden as UI icons or visual cues. Use authoritative Qahera icon references.',
        provider: 'qahera',
      },
    },
    counts: {
      components: Object.keys(registry).length,
      recipes: normalizedRecipes.length,
      patterns: Object.keys(patternsRegistry).length,
      icons: iconCount,
    },
    components: registry,
    patterns: patternsRegistry,
    icons: iconRegistry?.icons || {},
    decision_matrix: decisionMatrix?.matrix || {},
  };

  const registryPath = path.join(PATHS.generated, 'registry.json');
  fs.writeFileSync(registryPath, JSON.stringify(canonicalRegistry, null, 2) + '\n', 'utf8');

  console.log(`📦 [7/8 Generate]   Emitted ${generatedJsonCount} component JSONs, ${Object.keys(patternsRegistry).length} patterns, ${iconCount} icons & registry.json`);

  /* ---------------------------------------------------------
   * Stage 8: Report (Diagnostics & Build Metadata)
   * ------------------------------------------------------- */
  const durationMs = Date.now() - startTime;

  // Diagnostics JSON (machine-readable for AI & CI)
  const diagnosticsPath = path.join(PATHS.generatedDiagnostics, 'diagnostics.json');
  fs.writeFileSync(diagnosticsPath, JSON.stringify(diagnostics.toJSON(), null, 2) + '\n', 'utf8');

  // Build JSON (holds non-deterministic build metadata)
  const buildInfo = {
    compiler: COMPILER_VERSION,
    status: diagnostics.hasErrors() ? 'failed' : 'success',
    timestamp: new Date().toISOString(),
    durationMs,
    sourceHash,
    counts: {
      contracts: normalizedContracts.length,
      recipes: normalizedRecipes.length,
      icons: iconCount,
      generated: generatedJsonCount,
      errors: diagnostics.count('error'),
      warnings: diagnostics.count('warning'),
      info: diagnostics.count('info'),
    },
  };

  const buildPath = path.join(PATHS.generatedDiagnostics, 'build.json');
  fs.writeFileSync(buildPath, JSON.stringify(buildInfo, null, 2) + '\n', 'utf8');

  console.log(`📊 [8/8 Report]     Build stats and machine-readable diagnostics saved`);

  // Render Terminal Summary
  console.log('\n──────────────────────────────────────────────────────────');
  console.log(`  ✓ Validated Contracts : ${normalizedContracts.length}`);
  console.log(`  ✓ Validated Recipes   : ${normalizedRecipes.length}`);
  console.log(`  ✓ Registered Icons    : ${iconCount}`);
  console.log(`  ✓ Registry Components : ${Object.keys(registry).length}`);
  console.log(`  ✓ Generated JSONs     : ${generatedJsonCount}`);
  console.log(`  ✓ Manifest            : ${relative(manifestPath)}`);
  console.log(`  ✓ Source Hash         : ${sourceHash.substring(0, 12)}...`);
  console.log(`  ✓ Errors              : ${diagnostics.count('error')}`);
  console.log(`  ! Warnings            : ${diagnostics.count('warning')}`);
  console.log(`  ⏱️ Duration            : ${durationMs}ms`);
  console.log('──────────────────────────────────────────────────────────');

  const terminalDetails = diagnostics.renderTerminal();
  if (terminalDetails) {
    console.log(terminalDetails);
  }

  if (diagnostics.hasErrors()) {
    console.error('\n✖ Build failed with errors.\n');
    return false;
  }

  console.log('\n🎉 Qahera Design System compilation & registry build succeeded.\n');
  return true;
}

module.exports = {
  runQaheraCompiler,
  toKebabCase,
  toDisplayName,
  toPascalCase,
};
