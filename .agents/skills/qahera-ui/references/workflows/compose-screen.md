# Workflow: Compose Screen

Ordered steps to compose a complete, production-ready screen using exclusively canonical Qahera UI Kit components, patterns, and templates under the Zero-Custom-CSS doctrine.

## Step 0: Absolute Invariant & Zero-CSS Policy
1. Strictly verify that NO custom `.css` file will be generated or introduced.
2. Templates must possess exactly **0 bytes** of bespoke stylesheets (`assets/css/**` is forbidden).
3. If a required visual styling cannot be achieved with existing canonical components, **STOP**. Escalate the requirement upstream to `Qahera-UI-Kit` by authoring a recipe/pattern first.

## Step 1: Discover Requirements & Target Stack
1. Identify the target framework renderer requested:
   - `HTML Native (CDN)`: 100% Zero-build portable template wired to official jsDelivr CDN links.
   - `HTML Native (Monorepo)`: Wired to `../../dist/` assets.
   - `React RSC`: React 19 Server Components with terminal client interactive leaves.
   - `PHP`: Templates using `$qhr->render('Component', [...])`.
   - `HTMX`: Hypermedia attributes `hx-get`, `hx-swap` on canonical controls.
2. Confirm the active theme (`zamalek`, `downtown`, `heliopolis`, `nubia`, `new-cairo`, etc.) via `[data-theme="..."]`.

## Step 2: Formulate the Component Mapping Matrix
Before generating any markup, formulate and emit the Component Mapping Table:
```text
| UI Requirement | Canonical Qahera Component | Target CSS Class (.qhr-*) | State / Behavior Module |
|---|---|---|---|
| Main Navigation | Navbar Component | .qhr-navbar, .qhr-navbar-brand | behavior/navbar.js |
| Data & News Grid | Card Component | .qhr-card, .qhr-card-body | N/A |
| Detail Inspection | Modal Component | .qhr-modal, .qhr-modal-dialog | behavior/modal.js |
```

## Step 3: Emit Canonical Markup
1. Structure the layout with clean semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`).
2. Attach component classes using the canonical prefix: `.qhr-<component>` (e.g. `.qhr-btn`, `.qhr-input`, `.qhr-card`, `.qhr-badge`, `.qhr-ticker`, `.qhr-modal`).
3. For Alpine.js interactive patterns:
   - Encapsulate state inside `Alpine.data('<name>', () => ({ ... }))`.
   - Provide globally unique template keys in `<template x-for="...">` (e.g. `:key="'item-' + item.id"`).
   - Strictly avoid interactive children (`<button>`, `<a>`, `<input>`) nested inside `<a>` tags.
4. Ensure 100% RTL logical properties: use `margin-inline-*`, `padding-inline-*`, `inset-inline-*`.
5. Ensure Zero Emojis: all icons must be SVG with `viewBox="0 0 24 24"`, `width`, `height`, and `stroke-width="2"`.

## Step 4: Deterministic CLI Compliance Gate
Immediately after emitting the template files, run:
```bash
node bin/qahera.js audit:template <target-path>
```
The task cannot be considered complete unless the auditor exits with `0` errors.

## Validation Checklist

- [ ] Zero custom `.css` files created (0 bytes of custom stylesheets).
- [ ] Component Mapping Matrix declared.
- [ ] All components map to canonical `.qhr-*` classes.
- [ ] Visual Fidelity Gate (`QAHERA-FIDELITY-001`): Atmospheric depth, duotones, glassmorphism (`qhr-card--glass`), and editorial typography scales applied. Zero visual starvation.
- [ ] No hardcoded colors or physical CSS margins/paddings.
- [ ] Typography adheres strictly to Alexandria (headings) and Cairo (body). Amiri is banned.
- [ ] Zero emojis; 100% semantic SVG icons.
- [ ] Ran `node bin/qahera.js audit:template <path>` with exit code `0` (COMPLIANT).

