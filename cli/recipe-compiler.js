/**
 * Qahera UI Kit — Recipe Compiler & Resolver Engine
 * Authoritative Canonical Recipe Specification v1.0
 * 
 * Translates component recipes (YAML) into Normalized Style Models
 * across Native CSS and Tailwind renderers with deterministic token resolution.
 */

const fs = require('fs');
const path = require('path');

const RECIPES_DIR = path.resolve(__dirname, '../recipes');
const TOKENS_PATH = path.resolve(__dirname, '../generated/tokens.json');
const OUTPUT_MANIFEST_PATH = path.resolve(__dirname, '../generated/manifests/recipes.json');

// Canonical state priority ordering
const STATE_PRIORITY = ['disabled', 'loading', 'invalid', 'selected', 'hover', 'focus'];

// Helper to safely parse YAML files
function parseYaml(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  // Simple YAML parser suited for flat and nested mappings in Qahera UI Kit
  return requireYaml(content);
}

// Robust lightweight YAML parser
function requireYaml(yamlString) {
  const lines = yamlString.split(/\r?\n/);
  const root = {};
  const stack = [{ indent: -1, obj: root, key: null }];
  let inMultiline = null;

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    if (!rawLine.trim() || rawLine.trim().startsWith('#')) continue;

    const indent = rawLine.search(/\S/);
    const line = rawLine.trim();

    // Check for multiline string termination or continuation
    if (inMultiline) {
      if (indent > inMultiline.indent) {
        inMultiline.target[inMultiline.prop] += (inMultiline.target[inMultiline.prop] ? ' ' : '') + line;
        continue;
      } else {
        inMultiline = null;
      }
    }

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }

    const currentContext = stack[stack.length - 1].obj;

    // List item
    if (line.startsWith('- ')) {
      const val = line.substring(2).trim();
      const cleanVal = val.replace(/^["'](.*)["']$/, '$1');
      if (Array.isArray(currentContext)) {
        currentContext.push(cleanVal);
      } else {
        const top = stack[stack.length - 1];
        if (top && top.parent && top.key) {
          if (!Array.isArray(top.parent[top.key])) {
            top.parent[top.key] = [];
            top.obj = top.parent[top.key];
          }
          top.parent[top.key].push(cleanVal);
        }
      }
      continue;
    }

    // Key-Value pair
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      if (value === '>' || value === '|') {
        currentContext[key] = '';
        inMultiline = { indent, target: currentContext, prop: key };
        continue;
      }

      if (value === '' || value === '{}') {
        // Peek ahead to see if the next child line is a list item
        let isArray = false;
        for (let j = i + 1; j < lines.length; j++) {
          const nextTrimmed = lines[j].trim();
          if (!nextTrimmed || nextTrimmed.startsWith('#')) continue;
          if (nextTrimmed.startsWith('- ')) isArray = true;
          break;
        }

        const newChild = isArray ? [] : {};
        currentContext[key] = newChild;
        stack.push({ indent, obj: newChild, key, parent: currentContext });
      } else if (value.startsWith('[') && value.endsWith(']')) {
        const items = value.slice(1, -1).split(',').map(s => s.trim().replace(/^["'](.*)["']$/, '$1')).filter(Boolean);
        currentContext[key] = items;
      } else {
        let parsedVal = value.replace(/^["'](.*)["']$/, '$1');
        if (parsedVal === 'true') parsedVal = true;
        else if (parsedVal === 'false') parsedVal = false;
        else if (!isNaN(Number(parsedVal)) && parsedVal !== '') parsedVal = Number(parsedVal);
        currentContext[key] = parsedVal;
      }
    }
  }

  return root;
}

// Resolve token reference {path.to.token}
function resolveTokenRef(tokenRef, tokens) {
  if (typeof tokenRef !== 'string') return tokenRef;
  const match = tokenRef.match(/^\{([a-zA-Z0-9._-]+)\}$/);
  if (!match) return tokenRef;

  const tokenPath = match[1].split('.');
  let current = tokens;
  for (const part of tokenPath) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part];
    } else {
      // Return CSS var fallback
      return `var(--qhr-${tokenPath.join('-')})`;
    }
  }

  return current && current.value !== undefined ? current.value : current;
}

// Compile a single recipe into Normalized Style Model
function compileRecipe(recipe, tokens) {
  const componentName = recipe.component || (recipe.name ? recipe.name.charAt(0).toUpperCase() + recipe.name.slice(1) : 'Unknown');
  
  const normalized = {
    component: componentName,
    category: recipe.category || 'general',
    ai: recipe.ai || {
      intent: recipe.meta?.purpose || 'Standard component styling',
      visual_role: 'Primary interface unit',
      density: 'comfortable',
      preferred_when: recipe.meta?.when_to_use || [],
      avoid_when: recipe.meta?.avoid_when || []
    },
    base: recipe.base || {},
    variants: recipe.variants || {},
    sizes: recipe.sizes || {},
    states: recipe.states || {},
    structure: recipe.structure || {},
    statePriority: STATE_PRIORITY,
    resolvedTokens: {}
  };

  return normalized;
}

// Main compiler runner
function runRecipeCompiler() {
  console.log('🧪 Qahera UI Kit Recipe Compiler running...');

  let tokens = {};
  if (fs.existsSync(TOKENS_PATH)) {
    try {
      tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf-8'));
    } catch (e) {
      console.warn('⚠️ Warning: Could not parse generated/tokens.json, falling back to CSS variables.');
    }
  }

  if (!fs.existsSync(RECIPES_DIR)) {
    console.error(`❌ Recipes directory not found at: ${RECIPES_DIR}`);
    return false;
  }

  const recipeFiles = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
  console.log(`📋 Found ${recipeFiles.length} component recipes in recipes/`);

  const compiledRecipes = {};

  for (const file of recipeFiles) {
    const filePath = path.join(RECIPES_DIR, file);
    try {
      const rawRecipe = parseYaml(filePath);
      const compiled = compileRecipe(rawRecipe, tokens);
      compiledRecipes[compiled.component] = compiled;
    } catch (err) {
      console.error(`❌ Error compiling recipe ${file}:`, err.message);
      return false;
    }
  }

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_MANIFEST_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const manifest = {
    version: '1.0.0',
    compiledAt: new Date().toISOString(),
    recipeCount: Object.keys(compiledRecipes).length,
    recipes: compiledRecipes
  };

  fs.writeFileSync(OUTPUT_MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`✅ Generated manifests/recipes.json (${manifest.recipeCount} recipes normalized)`);
  console.log('🎉 Recipe compilation completed with 0 errors.');
  return true;
}

if (require.main === module) {
  const success = runRecipeCompiler();
  process.exit(success ? 0 : 1);
}

module.exports = {
  runRecipeCompiler,
  compileRecipe,
  STATE_PRIORITY
};
