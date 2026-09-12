# Operational Memory: Anti-Slop Matrix for Qahera UI Kit

<!-- last-verified: 2026-09-12 -->

Binary negative constraints for generating, composing, and auditing UI code in Qahera UI Kit. All rules must be satisfied before emitting code.

---

## I. Color & Surface
- ❌ **No raw hex / rgb values**: Never write `#fff`, `#0b6bcb`, or `rgb(...)`. Use `var(--qhr-color-...)` or semantic tokens.
- ❌ **No unverified dark mode overrides**: Dark mode must leverage `[data-theme="..."]` or system tokens; never use inverted ad-hoc backgrounds.
- ❌ **No low-contrast text**: Text on surfaces must satisfy WCAG AA contrast ratio $\ge 4.5:1$ (normal text) and $\ge 3:1$ (large headings).

## II. Typography & Font Discipline
- ❌ **No browser default fonts**: Font declarations must strictly use `--qhr-font-heading` (Alexandria) and `--qhr-font-body` (Cairo).
- ❌ **No Amiri font in UI**: Amiri is strictly prohibited for UI components and form controls.
- ❌ **No unjustified long lines**: Paragraph body widths must not exceed `65ch` for readability.
- ❌ **No arbitrary line-heights**: Use `--qhr-line-height-*` tokens matching the font scale.

## III. Layout & Bidirectionality (RTL/LTR)
- ❌ **No physical margin/padding**: Never use `margin-left`, `margin-right`, `padding-left`, or `padding-right`. Use `margin-inline-start`, `margin-inline-end`, `padding-inline-start`, `padding-inline-end`.
- ❌ **No physical positioning**: Never use `left: 10px` or `right: 0`. Use `inset-inline-start` and `inset-inline-end`.
- ❌ **No separate RTL components**: Never author `ButtonRTL` or `SidebarRTL`. RTL is handled via CSS logical properties on the core component.
- ❌ **No unmirrored directional icons**: Directional icons (arrows, chevrons) must rotate 180° in RTL via `[dir="rtl"] .qhr-icon-directional { transform: scaleX(-1); }`.

## IV. Iconography & Visual Authenticity (`QAHERA-VISUAL-001`)
- ❌ **Zero emoji as UI icons**: Never use emojis (🗑️, ✕, 🚀, ❤️, ☀️, 🌙, 🏛️) as buttons, badges, indicators, or decorations.
- ❌ **Zero unregistered SVGs**: All iconography must reference `icons/registry.yaml` or follow the 24x24 viewBox stroke-width 2 standard.

## V. Interaction & 8-State Completeness
- ❌ **No missing states**: Any interactive component must handle:
  1. `default`: Normal rest state.
  2. `hover`: Visual elevation, subtle background shift (`:hover`).
  3. `focus`: Distinct, accessible focus ring (`:focus-visible`). Never set `outline: none` without replacement.
  4. `active`: Pressed state feedback (`:active`).
  5. `disabled`: Reduced opacity, `cursor: not-allowed`, `pointer-events: none` (`:disabled`, `[aria-disabled="true"]`).
  6. `loading`: Spinner replacement, preserved dimensions (`[data-loading="true"]`).
  7. `empty`: Meaningful zero-data state (`[data-state="empty"]`).
  8. `error`: Accessible error border, helper text, and `aria-invalid="true"`.

## VI. Alpine.js & Hydration Protocol (`QAHERA-ALPINE-001`)
- ❌ **No inline attribute logic bloat**: Never place multi-line functions or large objects in `x-data="{ ... }"`. Always declare in `Alpine.data()`.
- ❌ **No non-unique keys**: `<template x-for="...">` must have `:key="item.uniqueId"`. Never use colliding indices across entity types.
- ❌ **No interactive descendants inside `<a>`**: Never place `<button>`, `<select>`, `<input>`, or `<a>` inside an outer `<a>` wrapper.
- ❌ **No nested `x-for` for simple badges**: Render nested array tags via `x-html="renderBadges(item.tags)"` or single-level loops.

## VII. Dogfooding & Class Discipline (`QAHERA-COMP-001`)
- ❌ **No ad-hoc utility soup**: Never invent arbitrary CSS class names (e.g. `.my-custom-box-shadow-2`).
- ❌ **No inline style overrides**: Do not use `style="..."` on elements to patch layout defects. Adjust tokens or author recipes.

## VIII. Multi-Target Renderer Parity
- ❌ **No semantic prop drift**: A prop named `variant` with value `primary` in HTML must not become `type="blue"` in React or `$style = 'main'` in PHP.
- ❌ **No React 0kb RSC violations**: Never mark entire layouts as `'use client'`. Server Components must remain 0kb client bundle, isolating client directives to terminal interactive buttons/dropdowns.

## IX. Cultural Themes (`QAHERA-THEME-001`)
- ❌ **No arbitrary cosmetic themes**: Themes must not be named `theme-cool` or `theme-blue`. They must synthesize global design movements with Egyptian architectural/cultural contexts (e.g. `downtown`, `heliopolis`, `nubia`, `khedivial`).
