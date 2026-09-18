'use strict';

/**
 * Qahera UI Kit — Template Scaffolder
 * 
 * Generates canonical, zero-custom-css template tracks wired directly to CDN layers.
 */

const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

function scaffoldTemplate(templateName, options = {}) {
  if (!templateName) {
    console.error('\x1b[31m[ERROR]\x1b[0m Template name is required. Example: node bin/qahera.js template:scaffold fintech-wealth');
    return false;
  }

  const baseDir = options.dest 
    ? path.resolve(process.cwd(), options.dest)
    : path.resolve(process.cwd(), 'templates', templateName);

  if (fs.existsSync(baseDir) && !options.overwrite) {
    console.error(`\x1b[31m[ERROR]\x1b[0m Target directory already exists: ${baseDir}. Use --overwrite to replace.`);
    return false;
  }

  fs.mkdirSync(baseDir, { recursive: true });
  fs.mkdirSync(path.join(baseDir, 'data'), { recursive: true });

  const theme = options.theme || 'zamalek';
  const version = pkg.version;

  // 1. Generate page.html
  const pageHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="${theme}" data-mode="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${templateName} — قاهرة Qahera UI Kit</title>

  <!-- Typography: Alexandria (Headings) + Cairo (Body) + JetBrains Mono (Code/Metadata) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700;800;900&family=Cairo:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">

  <!-- Core Qahera UI Kit Stylesheets (Zero-Custom-CSS Architecture) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qahera-ui@${version}/dist/qahera-tokens.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qahera-ui@${version}/dist/qahera-themes.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qahera-ui@${version}/dist/qahera.min.css">

  <!-- Alpine.js -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.8/dist/cdn.min.js"></script>
</head>
<body style="margin: 0; padding: 0; background-color: var(--qhr-surface-page, #0A0D14); color: var(--qhr-text-primary, #F8FAFC); font-family: var(--qhr-font-body);">

  <!-- Canonical Navbar -->
  <header class="qhr-navbar">
    <div class="qhr-navbar-inner">
      <div class="qhr-navbar-brand">
        <span class="qhr-badge qhr-badge--primary">${templateName}</span>
      </div>
      <nav class="qhr-navbar-nav">
        <a href="#overview" class="qhr-navbar-link is-active">الرئيسية</a>
      </nav>
    </div>
  </header>

  <!-- Main Container -->
  <main class="qhr-container" style="max-width: var(--qhr-container-xl, 1280px); margin-inline: auto; padding-inline: var(--qhr-space-6, 1.5rem); padding-block: var(--qhr-space-8, 2rem);">
    <section class="qhr-card qhr-card--elevated">
      <div class="qhr-card-body">
        <h1 style="font-family: var(--qhr-font-heading); margin: 0 0 1rem 0;">${templateName}</h1>
        <p style="color: var(--qhr-text-secondary); margin: 0;">تم إنشاء القالب معمارياً وفق مبدأ الصفر في الـ CSS واستدعاء مكونات قاهرة الرسمية عبر CDN.</p>
      </div>
    </section>
  </main>

</body>
</html>
`;

  fs.writeFileSync(path.join(baseDir, 'page.html'), pageHtml, 'utf-8');

  // 2. Generate blueprint.yaml
  const blueprintYaml = `name: "${templateName}"
title: "${templateName} Canonical Template"
version: "1.0.0"
category: "application"
author: "Alwkala"
stack: "HTML Native + Alpine.js + Qahera CDN"
theme_default: "${theme}"
mode_default: "dark"
invariants:
  zero_custom_css: true
  cdn_portable: true
  canonical_classes_only: true
`;

  fs.writeFileSync(path.join(baseDir, 'blueprint.yaml'), blueprintYaml, 'utf-8');

  console.log(`\x1b[32m[SUCCESS]\x1b[0m Canonical template scaffolded at: \x1b[33m${baseDir}\x1b[0m`);
  console.log('  ├── page.html      (Zero-Custom-CSS CDN entrypoint)');
  console.log('  ├── blueprint.yaml (Canonical metadata)');
  console.log('  └── data/          (JSON content store)');
  return true;
}

module.exports = { scaffoldTemplate };
