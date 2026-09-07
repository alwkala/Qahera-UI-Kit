/**
 * Qahera UI Kit — Component, Pattern & Template Adder (CLI Engine)
 * 
 * Provides shadcn-style distribution across multiple target stacks:
 * - react (React 19 / Next.js 16 with TypeScript)
 * - php   (League/Plates templates for TidyFactor Kernel & PHP 8.x)
 * - htmx  (HTMX fragments and Alpine behavior modules)
 * - html  (Native Zero-Build HTML specimens and Alpine behavior)
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const CANONICAL_COMPONENTS = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'button',
  'card',
  'checkbox',
  'dropdown',
  'input',
  'modal',
  'navbar',
  'radio',
  'select',
  'table',
  'tabs',
  'textarea',
  'toast',
  'tooltip',
  'preloader',
  'back-to-top',
  'canvas-sparks',
];

const COMPONENT_METADATA = {
  accordion:       { category: 'disclosure', interactive: true,  usesIcon: true  },
  alert:           { category: 'feedback',   interactive: false, usesIcon: true  },
  avatar:          { category: 'data-display', interactive: false, usesIcon: false },
  badge:           { category: 'data-display', interactive: false, usesIcon: false },
  button:          { category: 'actions',    interactive: false, usesIcon: true  },
  card:            { category: 'layout',     interactive: false, usesIcon: false },
  checkbox:        { category: 'forms',      interactive: false, usesIcon: false },
  dropdown:        { category: 'navigation', interactive: true,  usesIcon: true  },
  input:           { category: 'forms',      interactive: false, usesIcon: true  },
  modal:           { category: 'overlay',    interactive: true,  usesIcon: true  },
  navbar:          { category: 'navigation', interactive: true,  usesIcon: true  },
  radio:           { category: 'forms',      interactive: false, usesIcon: false },
  select:          { category: 'forms',      interactive: true,  usesIcon: true  },
  table:           { category: 'data-display', interactive: false, usesIcon: false },
  tabs:            { category: 'navigation', interactive: true,  usesIcon: true  },
  textarea:        { category: 'forms',      interactive: false, usesIcon: false },
  toast:           { category: 'feedback',   interactive: true,  usesIcon: true  },
  tooltip:         { category: 'overlay',    interactive: true,  usesIcon: false },
  preloader:       { category: 'feedback',   interactive: true,  usesIcon: false },
  'back-to-top':   { category: 'navigation', interactive: true,  usesIcon: true  },
  'canvas-sparks': { category: 'feedback',   interactive: true,  usesIcon: false },
};

const CANONICAL_PATTERNS = [
  'search-toolbar',
  'confirmation',
  'dashboard-stat',
  'empty-state',
  'filter-bar',
  'form-actions',
  'pagination',
  'data-table-toolbar',
  'luxury-product-card',
  'editorial-story',
  'store-locator',
  'vip-membership',
];

const PATTERN_COMPONENTS = {
  'search-toolbar':      ['input', 'button', 'badge'],
  'confirmation':        ['modal', 'button'],
  'dashboard-stat':      ['card', 'badge'],
  'empty-state':         ['card', 'button'],
  'filter-bar':          ['badge', 'button'],
  'form-actions':        ['button'],
  'pagination':          ['button', 'select'],
  'data-table-toolbar':  ['input', 'button', 'select', 'badge'],
  'luxury-product-card': ['card', 'badge', 'button'],
  'editorial-story':     ['card', 'badge', 'button'],
  'store-locator':       ['card', 'badge', 'button'],
  'vip-membership':      ['card', 'badge', 'input', 'button'],
};

const PATTERN_REACT_NAMES = {
  'search-toolbar':      'SearchToolbar.tsx',
  'confirmation':        'ConfirmationDialog.tsx',
  'dashboard-stat':      'DashboardStat.tsx',
  'empty-state':         'EmptyState.tsx',
  'filter-bar':          'FilterBar.tsx',
  'form-actions':        'FormActions.tsx',
  'pagination':          'Pagination.tsx',
  'data-table-toolbar':  'DataTableToolbar.tsx',
  'luxury-product-card': 'LuxuryProductCard.tsx',
  'editorial-story':     'EditorialStory.tsx',
  'store-locator':       'StoreLocator.tsx',
  'vip-membership':      'VipMembership.tsx',
};

const CANONICAL_TEMPLATES = [
  'admin',
  'dashboard',
  'auth',
  'landing',
  'ecommerce',
  'education',
  'documentation',
];

const TEMPLATE_COMPONENTS = {
  admin:         ['table', 'input', 'button', 'select', 'badge', 'modal', 'dropdown'],
  dashboard:     ['card', 'badge', 'table', 'button', 'select', 'input', 'navbar'],
  auth:          ['card', 'input', 'button', 'checkbox', 'tabs', 'alert'],
  landing:       ['preloader', 'canvas-sparks', 'back-to-top', 'navbar', 'button', 'card', 'badge', 'accordion'],
  ecommerce:     ['back-to-top', 'navbar', 'card', 'badge', 'button', 'select', 'input'],
  education:     ['card', 'badge', 'button', 'tabs', 'accordion', 'navbar'],
  documentation: ['card', 'input', 'button', 'badge', 'tabs', 'navbar'],
};

const TEMPLATE_PATTERNS = {
  admin:         ['data-table-toolbar', 'filter-bar', 'pagination', 'confirmation'],
  dashboard:     ['dashboard-stat'],
  auth:          ['form-actions'],
  landing:       ['editorial-story', 'vip-membership', 'form-actions'],
  ecommerce:     ['luxury-product-card', 'search-toolbar', 'filter-bar', 'store-locator', 'vip-membership', 'pagination'],
  education:     ['search-toolbar', 'pagination'],
  documentation: ['search-toolbar'],
};

const TEMPLATE_REACT_NAMES = {
  admin:     'AdminPage.tsx',
  dashboard: 'DashboardPage.tsx',
  auth:      'AuthPage.tsx',
  landing:   'LandingPage.tsx',
  ecommerce: 'EcommercePage.tsx',
};

function toPascalCase(str) {
  return str.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('');
}

function parseArgs(args) {
  const parsed = {
    items: [],
    target: 'react',
    dest: null,
    overwrite: false,
    all: false,
    withStyles: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--all' || arg === '-a') {
      parsed.all = true;
    } else if (arg === '--overwrite' || arg === '-y' || arg === '--force') {
      parsed.overwrite = true;
    } else if (arg === '--with-styles' || arg === '-s') {
      parsed.withStyles = true;
    } else if (arg.startsWith('--target=')) {
      parsed.target = arg.split('=')[1].toLowerCase();
    } else if (arg === '--target' || arg === '-t') {
      parsed.target = (args[++i] || 'react').toLowerCase();
    } else if (arg.startsWith('--dest=')) {
      parsed.dest = arg.split('=')[1];
    } else if (arg === '--dest' || arg === '-d') {
      parsed.dest = args[++i];
    } else if (!arg.startsWith('-')) {
      parsed.items.push(arg.toLowerCase());
    }
  }

  return parsed;
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyFile(src, dest, overwrite = false) {
  if (!fs.existsSync(src)) {
    return { status: 'error', message: `Source file not found: ${src}` };
  }
  if (fs.existsSync(dest) && !overwrite) {
    return { status: 'skipped', message: `File already exists (use --overwrite to replace)` };
  }
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  return { status: 'copied' };
}

/**
 * List all available components, patterns, and templates
 */
function listComponents() {
  console.log('\n🏛️  قاهرة · Qahera UI Kit — Canonical Registry\n');
  console.log('='.repeat(70));
  console.log(
    'Component'.padEnd(16) +
    'Category'.padEnd(16) +
    'Interactive'.padEnd(14) +
    'Targets Supported'
  );
  console.log('-'.repeat(70));

  for (const name of CANONICAL_COMPONENTS) {
    const meta = COMPONENT_METADATA[name] || {};
    const cat = meta.category || 'general';
    const inter = meta.interactive ? 'Yes (Alpine)' : 'No';
    const targets = 'React, PHP, HTML, HTMX';
    console.log(
      name.padEnd(16) +
      cat.padEnd(16) +
      inter.padEnd(14) +
      targets
    );
  }

  console.log('\n' + '='.repeat(70));
  console.log('Composite Patterns (8 Patterns)');
  console.log('-'.repeat(70));
  for (const pat of CANONICAL_PATTERNS) {
    const deps = (PATTERN_COMPONENTS[pat] || []).join(', ');
    console.log(
      `pattern:${pat}`.padEnd(24) +
      `Requires: [${deps}]`
    );
  }

  console.log('\n' + '='.repeat(70));
  console.log('Template Blueprints (7 Blueprints)');
  console.log('-'.repeat(70));
  for (const tpl of CANONICAL_TEMPLATES) {
    const pats = (TEMPLATE_PATTERNS[tpl] || []).join(', ');
    console.log(
      `template:${tpl}`.padEnd(24) +
      `Patterns: [${pats}]`
    );
  }

  console.log('='.repeat(70));
  console.log('\nTotal: 18 components · 8 patterns · 7 templates · 41 canonical icons.');
  console.log('Run `node bin/qahera.js add <component|pattern:...|template:...> --target=<react|php|html|htmx>`\n');
}

/**
 * Initialize Qahera in a project
 */
function initProject(rawArgs) {
  const options = parseArgs(rawArgs);
  const target = options.target || 'react';
  const cwd = process.cwd();

  console.log(`\n🚀 Initializing Qahera UI Kit for target [${target}]...`);

  const tokensSrc = path.join(ROOT_DIR, 'tokens', 'tokens.css');
  const componentsCssSrc = path.join(ROOT_DIR, 'renderers', 'html', 'native', 'components.css');
  
  let stylesDestDir;
  if (options.dest) {
    stylesDestDir = path.resolve(cwd, options.dest);
  } else {
    stylesDestDir = target === 'react'
      ? path.join(cwd, 'src', 'styles', 'qahera')
      : path.join(cwd, 'public', 'css', 'qahera');
  }

  ensureDir(stylesDestDir);

  const tRes = copyFile(tokensSrc, path.join(stylesDestDir, 'tokens.css'), options.overwrite);
  console.log(`  ${tRes.status === 'copied' ? '✔' : '⚠'} tokens.css -> ${path.relative(cwd, path.join(stylesDestDir, 'tokens.css'))} (${tRes.status})`);

  const cRes = copyFile(componentsCssSrc, path.join(stylesDestDir, 'components.css'), options.overwrite);
  console.log(`  ${cRes.status === 'copied' ? '✔' : '⚠'} components.css -> ${path.relative(cwd, path.join(stylesDestDir, 'components.css'))} (${cRes.status})`);

  console.log(`\n✨ Initialization complete! Import tokens.css and components.css in your app entry.`);
  console.log(`Now add components with: node bin/qahera.js add <component> --target=${target}\n`);
}

/**
 * Add component(s), pattern(s), or template(s) to target directory
 */
function addComponents(rawArgs) {
  const options = parseArgs(rawArgs);
  const target = options.target || 'react';
  const cwd = process.cwd();

  const validTargets = ['react', 'php', 'html', 'htmx'];
  if (!validTargets.includes(target)) {
    console.error(`❌ Invalid target "${target}". Supported targets: ${validTargets.join(', ')}`);
    process.exit(1);
  }

  let requested = options.all ? [...CANONICAL_COMPONENTS] : options.items;
  if (requested.length === 1 && (requested[0] === 'all' || requested[0] === '*')) {
    requested = [...CANONICAL_COMPONENTS];
  }

  if (requested.length === 0) {
    console.error('❌ Please specify at least one component, pattern, or template name, or use --all');
    console.log('Example: node bin/qahera.js add button modal --target=react');
    console.log('Example: node bin/qahera.js add pattern:dashboard-stat --target=php');
    console.log('Example: node bin/qahera.js add template:admin --target=react');
    console.log('Run `node bin/qahera.js list` to see all available items.');
    process.exit(1);
  }

  const reqComponents = new Set();
  const reqPatterns = new Set();
  const reqTemplates = new Set();

  for (const rawItem of requested) {
    let item = rawItem;
    if (item.startsWith('template:')) {
      item = item.replace('template:', '');
      if (CANONICAL_TEMPLATES.includes(item)) {
        reqTemplates.add(item);
        (TEMPLATE_PATTERNS[item] || []).forEach(p => {
          reqPatterns.add(p);
          (PATTERN_COMPONENTS[p] || []).forEach(c => reqComponents.add(c));
        });
        (TEMPLATE_COMPONENTS[item] || []).forEach(c => reqComponents.add(c));
      } else {
        console.error(`❌ Unknown template: "${item}"`);
        process.exit(1);
      }
    } else if (item.startsWith('pattern:')) {
      item = item.replace('pattern:', '');
      if (CANONICAL_PATTERNS.includes(item)) {
        reqPatterns.add(item);
        (PATTERN_COMPONENTS[item] || []).forEach(c => reqComponents.add(c));
      } else {
        console.error(`❌ Unknown pattern: "${item}"`);
        process.exit(1);
      }
    } else if (CANONICAL_PATTERNS.includes(item)) {
      reqPatterns.add(item);
      (PATTERN_COMPONENTS[item] || []).forEach(c => reqComponents.add(c));
    } else if (CANONICAL_COMPONENTS.includes(item) || item === 'icon') {
      reqComponents.add(item);
    } else {
      console.error(`❌ Unknown component, pattern, or template: "${item}"`);
      process.exit(1);
    }
  }

  // Default destination per target
  let destDir = options.dest
    ? path.resolve(cwd, options.dest)
    : getDefaultDest(target, cwd);

  ensureDir(destDir);

  console.log(`\n📦 Adding Qahera assets [target: ${target}]`);
  console.log(`Destination: ${path.relative(cwd, destDir) || destDir}\n`);

  const addedFiles = [];
  const dependencies = new Set();

  if (target === 'react') {
    dependencies.add('types.ts');
    for (const c of reqComponents) {
      const meta = COMPONENT_METADATA[c];
      if (meta?.usesIcon || c === 'icon') {
        dependencies.add('Icon.tsx');
      }
    }
    if (reqPatterns.size > 0 || reqTemplates.size > 0) {
      dependencies.add('Icon.tsx');
    }

    // Copy dependencies
    for (const dep of dependencies) {
      const src = path.join(ROOT_DIR, 'renderers', 'react', dep);
      const dest = path.join(destDir, dep);
      const res = copyFile(src, dest, options.overwrite);
      addedFiles.push({ file: dep, ...res, isDep: true });
    }

    // Copy components
    for (const comp of reqComponents) {
      if (comp === 'icon') continue;
      const fileName = `${toPascalCase(comp)}.tsx`;
      const src = path.join(ROOT_DIR, 'renderers', 'react', fileName);
      const dest = path.join(destDir, fileName);
      const res = copyFile(src, dest, options.overwrite);
      addedFiles.push({ file: fileName, ...res, isDep: false });
    }

    // Copy patterns
    for (const pat of reqPatterns) {
      const patFile = PATTERN_REACT_NAMES[pat];
      if (patFile) {
        const src = path.join(ROOT_DIR, 'renderers', 'react', 'patterns', patFile);
        const dest = path.join(destDir, 'patterns', patFile);
        const res = copyFile(src, dest, options.overwrite);
        addedFiles.push({ file: `patterns/${patFile}`, ...res, isDep: false });
      }
    }

    // Copy templates
    for (const tpl of reqTemplates) {
      const tplFile = TEMPLATE_REACT_NAMES[tpl];
      if (tplFile) {
        const src = path.join(ROOT_DIR, 'templates', tpl, tplFile);
        const dest = path.join(destDir, 'templates', tpl, tplFile);
        const res = copyFile(src, dest, options.overwrite);
        addedFiles.push({ file: `templates/${tpl}/${tplFile}`, ...res, isDep: false });
      }
    }

  } else if (target === 'php') {
    dependencies.add('icon.php');
    dependencies.add('QaheraPlatesExtension.php');
    dependencies.add('_ide_stubs.php');

    for (const dep of dependencies) {
      const src = path.join(ROOT_DIR, 'renderers', 'php', 'plates', dep);
      const dest = path.join(destDir, dep);
      const res = copyFile(src, dest, options.overwrite);
      addedFiles.push({ file: dep, ...res, isDep: true });
    }

    for (const comp of reqComponents) {
      if (comp === 'icon') continue;
      const fileName = `${comp}.php`;
      const src = path.join(ROOT_DIR, 'renderers', 'php', 'plates', fileName);
      const dest = path.join(destDir, fileName);
      const res = copyFile(src, dest, options.overwrite);
      addedFiles.push({ file: fileName, ...res, isDep: false });
    }

    for (const pat of reqPatterns) {
      const fileName = `${pat}.php`;
      const src = path.join(ROOT_DIR, 'renderers', 'php', 'plates', 'patterns', fileName);
      const dest = path.join(destDir, 'patterns', fileName);
      const res = copyFile(src, dest, options.overwrite);
      addedFiles.push({ file: `patterns/${fileName}`, ...res, isDep: false });
    }

    for (const tpl of reqTemplates) {
      const src = path.join(ROOT_DIR, 'templates', tpl, 'page.php');
      if (fs.existsSync(src)) {
        const dest = path.join(destDir, 'templates', tpl, 'page.php');
        const res = copyFile(src, dest, options.overwrite);
        addedFiles.push({ file: `templates/${tpl}/page.php`, ...res, isDep: false });
      }
    }

  } else if (target === 'htmx') {
    const helperSrc = path.join(ROOT_DIR, 'renderers', 'htmx', 'helpers', 'htmx-events.js');
    if (fs.existsSync(helperSrc)) {
      const helperDest = path.join(destDir, 'helpers', 'htmx-events.js');
      const res = copyFile(helperSrc, helperDest, options.overwrite);
      addedFiles.push({ file: 'helpers/htmx-events.js', ...res, isDep: true });
    }

    const fragDir = path.join(ROOT_DIR, 'renderers', 'htmx', 'fragments');
    if (fs.existsSync(fragDir)) {
      const frags = fs.readdirSync(fragDir);
      for (const f of frags) {
        const fSrc = path.join(fragDir, f);
        const fDest = path.join(destDir, 'fragments', f);
        const res = copyFile(fSrc, fDest, options.overwrite);
        addedFiles.push({ file: `fragments/${f}`, ...res, isDep: false });
      }
    }

  } else if (target === 'html') {
    // 1. Copy SVG Icons sprite sheet as dependency if any component/pattern uses icons
    const iconsSrc = path.join(ROOT_DIR, 'renderers', 'html', 'native', 'icons.svg');
    if (fs.existsSync(iconsSrc)) {
      const iconsDest = path.join(destDir, 'icons.svg');
      const res = copyFile(iconsSrc, iconsDest, options.overwrite);
      addedFiles.push({ file: 'icons.svg', ...res, isDep: true });
    }

    // 2. Copy component HTML snippets and interactive behaviors
    for (const comp of reqComponents) {
      if (comp === 'icon') continue;
      const htmlFile = `${comp}.html`;
      const htmlSrc = path.join(ROOT_DIR, 'renderers', 'html', 'native', htmlFile);
      if (fs.existsSync(htmlSrc)) {
        const htmlDest = path.join(destDir, htmlFile);
        const res = copyFile(htmlSrc, htmlDest, options.overwrite);
        addedFiles.push({ file: htmlFile, ...res, isDep: false });
      }

      const meta = COMPONENT_METADATA[comp];
      if (meta?.interactive) {
        const jsFile = `${comp}.js`;
        const jsSrc = path.join(ROOT_DIR, 'behavior', jsFile);
        if (fs.existsSync(jsSrc)) {
          const jsDest = path.join(destDir, 'behavior', jsFile);
          const res = copyFile(jsSrc, jsDest, options.overwrite);
          addedFiles.push({ file: `behavior/${jsFile}`, ...res, isDep: true });
        }
      }

      // Also copy component-level isolated CSS
      const cssFile = `${comp}.css`;
      const compCssSrc = path.join(ROOT_DIR, 'renderers', 'html', 'native', 'components', cssFile);
      if (fs.existsSync(compCssSrc)) {
        const compCssDest = path.join(destDir, 'css', cssFile);
        const res = copyFile(compCssSrc, compCssDest, options.overwrite);
        addedFiles.push({ file: `css/${cssFile}`, ...res, isDep: true });
      }
    }

    // 3. Copy patterns in HTML
    for (const pat of reqPatterns) {
      const patFile = `${pat}.html`;
      const patSrc = path.join(ROOT_DIR, 'renderers', 'html', 'native', 'patterns', patFile);
      if (fs.existsSync(patSrc)) {
        const patDest = path.join(destDir, 'patterns', patFile);
        const res = copyFile(patSrc, patDest, options.overwrite);
        addedFiles.push({ file: `patterns/${patFile}`, ...res, isDep: false });
      }
    }

    // 4. Copy templates in HTML
    for (const tpl of reqTemplates) {
      const src = path.join(ROOT_DIR, 'templates', tpl, 'page.html');
      if (fs.existsSync(src)) {
        const dest = path.join(destDir, 'templates', tpl, 'page.html');
        const res = copyFile(src, dest, options.overwrite);
        addedFiles.push({ file: `templates/${tpl}/page.html`, ...res, isDep: false });
      }
    }

    // 5. If --with-styles or styles requested, copy CSS assets
    if (options.withStyles) {
      const cssSrc = path.join(ROOT_DIR, 'renderers', 'html', 'native', 'components.css');
      if (fs.existsSync(cssSrc)) {
        const cssDest = path.join(destDir, 'css', 'components.css');
        const res = copyFile(cssSrc, cssDest, options.overwrite);
        addedFiles.push({ file: 'css/components.css', ...res, isDep: true });
      }
      const tokSrc = path.join(ROOT_DIR, 'tokens', 'tokens.css');
      if (fs.existsSync(tokSrc)) {
        const tokDest = path.join(destDir, 'css', 'tokens.css');
        const res = copyFile(tokSrc, tokDest, options.overwrite);
        addedFiles.push({ file: 'css/tokens.css', ...res, isDep: true });
      }
    }
  }

  // Print results
  for (const item of addedFiles) {
    const symbol = item.status === 'copied' ? '✔' : item.status === 'skipped' ? '⊘' : '✖';
    const tag = item.isDep ? ' [dep]' : '';
    console.log(`  ${symbol} ${item.file.padEnd(36)} ${item.status}${tag}`);
  }

  console.log(`\n✨ Successfully processed ${addedFiles.length} file(s) for [${target}].\n`);
}

function getDefaultDest(target, cwd) {
  if (target === 'react') {
    if (fs.existsSync(path.join(cwd, 'src', 'components'))) {
      return path.join(cwd, 'src', 'components', 'qahera');
    }
    return path.join(cwd, 'components', 'qahera');
  }
  if (target === 'php') {
    if (fs.existsSync(path.join(cwd, 'templates'))) {
      return path.join(cwd, 'templates', 'qahera');
    }
    if (fs.existsSync(path.join(cwd, 'views'))) {
      return path.join(cwd, 'views', 'qahera');
    }
    return path.join(cwd, 'views', 'qahera');
  }
  if (target === 'htmx') {
    return path.join(cwd, 'htmx');
  }
  return path.join(cwd, 'qahera');
}

module.exports = {
  addComponents,
  initProject,
  listComponents,
  CANONICAL_COMPONENTS,
  CANONICAL_PATTERNS,
  CANONICAL_TEMPLATES,
};
