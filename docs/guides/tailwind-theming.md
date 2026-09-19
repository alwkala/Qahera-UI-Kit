# Tailwind CSS Theming Guide | دليل تخصيص وتكامل Tailwind CSS

Learn how to integrate **Qahera UI Kit**'s authentic Cairo neighborhood themes (`[data-theme="..."]`) and semantic design tokens into **Tailwind CSS (v3 & v4)**.

تعرف على كيفية دمج ثيمات أحياء القاهرة التراثية والحديثة (`[data-theme="..."]`) ورموز التصميم الدلالية (Semantic Tokens) الخاصة بـ **Qahera UI Kit** داخل **Tailwind CSS**.

---

## Overview | نظرة عامة

Qahera UI Kit features 13 authentic Cairo neighborhood themes (such as *Zamalek*, *Downtown / Wust El Balad*, *Heliopolis*, *Maadi*, *Roxy*, and more) that function via CSS custom properties (`[data-theme="..."]` and `[data-mode="light|dark"]`).

By mapping Tailwind theme configuration to Qahera's `--qhr-color-*` and `--qhr-radius-*` custom properties, all Tailwind utility classes (`bg-primary`, `text-primary-fg`, `rounded-box`, `border-subtle`, etc.) automatically adapt whenever the active theme or color mode changes in the DOM.

تعتمد حزمة Qahera UI Kit على 13 ثيماً مستوحى من أحياء القاهرة التاريخية والمعاصرة تعمل عبر متغيرات CSS (`[data-theme="..."]`). من خلال ربط إعدادات Tailwind بمتغيرات Qahera، ستتكيف كافة فئات التنسيق تلقائياً بمجرد تبديل الثيم أو الوضع الليلي/النهاري.

---

## 1. Setup & Importing Tokens | التثبيت واستيراد الرموز

First, import the Qahera token stylesheets in your main CSS entry point (e.g. `globals.css` or `main.css`):

```css
/* Import canonical tokens and themes */
@import '@alwkala/qahera-ui-kit/generated/tokens.css';
@import '@alwkala/qahera-ui-kit/tokens/themes/themes.css';
```

---

## 2. Configuration for Tailwind CSS v3 | إعداد Tailwind v3

Add the following token mappings into your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx,php}',
    './recipes/**/*.{html,php}',
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        // Semantic Theme Colors
        primary: {
          DEFAULT: 'var(--qhr-color-primary, var(--qhr-color-primary-bg))',
          fg: 'var(--qhr-color-primary-fg, #ffffff)',
          hover: 'var(--qhr-color-primary-hover)',
          focus: 'var(--qhr-color-primary-focus)',
          subtle: 'var(--qhr-color-primary-subtle)',
        },
        secondary: {
          DEFAULT: 'var(--qhr-color-secondary, var(--qhr-color-secondary-bg))',
          fg: 'var(--qhr-color-secondary-fg)',
          hover: 'var(--qhr-color-secondary-hover)',
          border: 'var(--qhr-color-secondary-border)',
        },
        accent: {
          DEFAULT: 'var(--qhr-color-accent)',
        },
        // Surfaces & Backgrounds
        surface: {
          base: 'var(--qhr-surface-base)',
          elevated: 'var(--qhr-surface-elevated)',
          card: 'var(--qhr-surface-card)',
          page: 'var(--qhr-surface-page)',
          muted: 'var(--qhr-surface-muted)',
        },
        // Content & Typography
        content: {
          primary: 'var(--qhr-content-primary, var(--qhr-text-primary))',
          secondary: 'var(--qhr-content-secondary, var(--qhr-text-secondary))',
          muted: 'var(--qhr-content-muted, var(--qhr-text-muted))',
        },
        // Status & Feedback
        danger: {
          DEFAULT: 'var(--qhr-color-danger-bg)',
          fg: 'var(--qhr-color-danger-fg)',
          hover: 'var(--qhr-color-danger-hover)',
          subtle: 'var(--qhr-color-danger-subtle)',
        },
        success: {
          DEFAULT: 'var(--qhr-color-success-bg)',
          fg: 'var(--qhr-color-success-fg)',
        },
        warning: {
          DEFAULT: 'var(--qhr-color-warning-bg)',
          fg: 'var(--qhr-color-warning-fg)',
        },
        // Borders
        border: {
          subtle: 'var(--qhr-border-subtle)',
          strong: 'var(--qhr-border-strong)',
        },
      },
      borderRadius: {
        // Neighborhood Archetype Radii
        box: 'var(--qhr-radius-box, var(--qhr-radius-md))',
        field: 'var(--qhr-radius-field, var(--qhr-radius-sm))',
        selector: 'var(--qhr-radius-selector, var(--qhr-radius-full))',
        // Primitive Radii
        xs: 'var(--qhr-radius-xs)',
        sm: 'var(--qhr-radius-sm)',
        md: 'var(--qhr-radius-md)',
        lg: 'var(--qhr-radius-lg)',
        xl: 'var(--qhr-radius-xl)',
        pill: 'var(--qhr-radius-pill)',
      },
      fontFamily: {
        heading: ['var(--qhr-typography-heading)', 'var(--qhr-font-heading)', 'sans-serif'],
        body: ['var(--qhr-typography-body)', 'var(--qhr-font-body)', 'sans-serif'],
        mono: ['var(--qhr-typography-mono)', 'monospace'],
      },
      boxShadow: {
        box: 'var(--qhr-shadow-box)',
        book: 'var(--qhr-shadow-book)',
        cartouche: 'var(--qhr-shadow-cartouche)',
      },
    },
  },
  plugins: [],
};
```

---

## 3. Configuration for Tailwind CSS v4 | إعداد Tailwind v4

In Tailwind CSS v4, custom theme tokens can be defined directly within CSS using `@theme`:

```css
@import "tailwindcss";
@import "@alwkala/qahera-ui-kit/generated/tokens.css";
@import "@alwkala/qahera-ui-kit/tokens/themes/themes.css";

@theme {
  /* Colors */
  --color-primary: var(--qhr-color-primary, var(--qhr-color-primary-bg));
  --color-primary-fg: var(--qhr-color-primary-fg, #ffffff);
  --color-primary-hover: var(--qhr-color-primary-hover);
  --color-secondary: var(--qhr-color-secondary, var(--qhr-color-secondary-bg));
  --color-secondary-fg: var(--qhr-color-secondary-fg);
  --color-accent: var(--qhr-color-accent);

  --color-surface-base: var(--qhr-surface-base);
  --color-surface-elevated: var(--qhr-surface-elevated);
  --color-surface-card: var(--qhr-surface-card);

  --color-content-primary: var(--qhr-content-primary, var(--qhr-text-primary));
  --color-content-secondary: var(--qhr-content-secondary, var(--qhr-text-secondary));

  /* Radius */
  --radius-box: var(--qhr-radius-box, var(--qhr-radius-md));
  --radius-field: var(--qhr-radius-field, var(--qhr-radius-sm));
  --radius-selector: var(--qhr-radius-selector, var(--qhr-radius-full));

  /* Typography */
  --font-heading: var(--qhr-typography-heading), 'Alexandria', sans-serif;
  --font-body: var(--qhr-typography-body), 'Cairo', sans-serif;
}
```

---

## 4. Bilingual Usage Example | مثال تطبيقي ثنائي اللغة (عربي / English)

When you wrap components with `data-theme` (e.g. `zamalek`, `downtown`, `heliopolis`, `maadi`, etc.) and optional `data-mode="light|dark"`, Tailwind utilities immediately reflect that neighborhood's specific colors, borders, and corner geometry:

```html
<!-- English: Zamalek Archetype (Diplomatic Mansions & Champagne Gold) -->
<section data-theme="zamalek" data-mode="light" dir="ltr" class="bg-surface-base p-8 text-content-primary">
  <div class="max-w-md mx-auto bg-surface-card rounded-box shadow-box p-6 border border-border-subtle">
    <span class="inline-block px-3 py-1 text-xs font-semibold rounded-selector bg-primary/10 text-primary mb-3">
      Zamalek Edition
    </span>
    <h2 class="font-heading text-2xl font-bold mb-2">
      Cosmopolitan Art Deco
    </h2>
    <p class="font-body text-content-secondary mb-4">
      Experience refined Nile island architecture with dynamic semantic tokens powered by Tailwind CSS.
    </p>
    <div class="flex items-center gap-3">
      <button class="bg-primary text-primary-fg hover:bg-primary-hover px-4 py-2 rounded-field font-medium transition-colors">
        Explore District
      </button>
      <button class="border border-border-strong text-content-primary px-4 py-2 rounded-field hover:bg-surface-muted transition-colors">
        Read Story
      </button>
    </div>
  </div>
</section>

<!-- Arabic: وسط البلد (Downtown - Khedivial Classical & Sharp Geometry) -->
<section data-theme="downtown" data-mode="dark" dir="rtl" class="bg-surface-base p-8 text-content-primary">
  <div class="max-w-md mx-auto bg-surface-card rounded-box shadow-box p-6 border border-border-subtle">
    <span class="inline-block px-3 py-1 text-xs font-semibold rounded-selector bg-primary/15 text-primary mb-3">
      طراز وسط البلد
    </span>
    <h2 class="font-heading text-2xl font-bold mb-2">
      القاهرة الخديوية السويسرية
    </h2>
    <p class="font-body text-content-secondary mb-4">
      تصميم معماري كلاسيكي مع حواف حادة وتباين لوني مستوحى من شوارع ومطابع وسط القاهرة العريقة.
    </p>
    <div class="flex items-center gap-3">
      <button class="bg-primary text-primary-fg hover:bg-primary-hover px-4 py-2 rounded-field font-medium transition-colors">
        اكتشف الحي
      </button>
      <button class="border border-border-strong text-content-primary px-4 py-2 rounded-field hover:bg-surface-muted transition-colors">
        اقرأ المزيد
      </button>
    </div>
  </div>
</section>
```

---

## 5. Switching Themes Dynamically | تبديل الثيم ديناميكياً

Switching themes at runtime requires changing only the `data-theme` and `data-mode` attributes on any container or the root `<html>` element:

```javascript
// Switch to Maadi theme in dark mode
document.documentElement.setAttribute('data-theme', 'maadi');
document.documentElement.setAttribute('data-mode', 'dark');

// Switch to Heliopolis in light mode
document.documentElement.setAttribute('data-theme', 'heliopolis');
document.documentElement.setAttribute('data-mode', 'light');
```
