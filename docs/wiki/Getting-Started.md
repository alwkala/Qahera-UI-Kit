# Getting Started with Qahera UI Kit

Qahera UI Kit provides flexible integration pathways depending on your technology stack:
1. **Zero-Install CLI** (Recommended for React, Next.js, and PHP)
2. **Zero-Build CDN** (Recommended for static sites, landing pages, and prototypes)
3. **Vanilla Web Components** (Framework-free custom elements)
4. **Composer / Packagist** (PHP modular applications)

---

## 1. Zero-Install CLI (`npx qahera-ui`)

The fastest way to scaffold components into your project with full source ownership:

### Step 1: Initialize Project
```bash
npx qahera-ui init --target=react
```
This generates:
* `qahera.json`: Project configuration manifest.
* `tokens.css`: Semantic CSS variables.
* Automatically configures `.vscode/settings.json` for IDE custom data autocomplete.
* Injects `.agents/skills/qahera-ui` for local AI pair-programming.

### Step 2: Add Components
```bash
# Add essential interactive components
npx qahera-ui add button card modal toast --target=react

# Add higher-order patterns
npx qahera-ui add pattern:dashboard-stat --target=react

# Add full turnkey templates
npx qahera-ui add template:admin --target=react
```

### Step 3: Interactive Wizard
Use the interactive terminal wizard to search and multi-select components:
```bash
npx qahera-ui add --interactive
```

---

## 2. Zero-Build CDN Quickstart

For static HTML pages, include Qahera's compiled distribution bundles directly from jsDelivr:

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl" data-theme="zamalek" data-mode="dark">
<head>
  <meta charset="UTF-8">
  <title>تطبيق قاهرة المعماري</title>
  
  <!-- Alexandria & Cairo Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;600;700&family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">

  <!-- Qahera CSS Bundles -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qahera-ui@1.7.0/dist/qahera-tokens.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qahera-ui@1.7.0/dist/qahera-themes.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/qahera-ui@1.7.0/dist/qahera.css">

  <!-- Alpine.js (for interactive behaviors) -->
  <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body>
  <div class="qhr-container">
    <button class="qhr-btn qhr-btn--primary">إجراء معياري</button>
  </div>
</body>
</html>
```

Generate an instant CDN boilerplate for any of the 13 Cairo themes:
```bash
npx qahera-ui cdn zamalek
```

---

## 3. React 19 & Next.js 15 (0kb RSC)

Qahera UI Kit components are written as pure Server Components by default. Interactive behaviors (such as modals, tooltips, or accordions) isolate their client JavaScript strictly to terminal leaf files with `'use client'`:

```tsx
import { Button } from '@/components/qahera/Button';
import { Card } from '@/components/qahera/Card';
import { Modal } from '@/components/qahera/Modal';

export default function Page() {
  return (
    <Card elevation="elevated">
      <Card.Header title="لوحة التحكم المعمارية" subtitle="نظام قاهرة v1.7.0" />
      <Card.Body>
        <Button variant="primary" size="md">
          إصدار التقرير
        </Button>
      </Card.Body>
    </Card>
  );
}
```

---

## 4. PHP 8.x Plates SSR

For PHP monoliths and modular engines (FlightPHP, Laravel, WordPress):

```bash
composer require alwkala/qahera-ui
```

Rendering inside Plates templates:
```php
<?= $this->insert('qahera::button', [
    'variant' => 'primary',
    'size'    => 'md',
    'label'   => 'تأكيد الحجز'
]) ?>
```

---

## 5. Developer Tools Suite

```bash
# Start local preview server with visual directory
npx qahera-ui dev

# Fast architectural linter (verifies Zero Custom CSS & Invariants)
npx qahera-ui lint

# Automatically configure VS Code, Cursor, and Claude Desktop
npx qahera-ui setup-ide
```
