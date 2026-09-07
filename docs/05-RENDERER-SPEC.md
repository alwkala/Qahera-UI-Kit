# 05. RENDERER-SPEC: Multi-Target Renderer Compiler Architecture

**Status:** Canonical Subordinate Specification  
**Authority:** QAHERA-SPEC §28, §29, §30  

---

## 1. Zero Semantic Drift Across Targets

A renderer translates the normalized component model into a specific target syntax with absolute fidelity.

| Renderer Target | Path | Attribute / Prop Binding | Interactivity Engine | Client Footprint |
|---|---|---|---|---|
| **HTML (Native)** | `renderers/html/native/` | `class="qhr-btn qhr-btn--primary"` + `data-variant="primary"` | Alpine.js | 0 KB (vanilla HTML) |
| **HTML (Tailwind)** | `renderers/html/tailwind/` | Inlined Tailwind token-mapped utility classes | Alpine.js | 0 KB |
| **PHP (Plates)** | `renderers/php/plates/` | `$this->e($label)` + `qhr-btn--<?= $variant ?>` | Alpine.js | 0 KB |
| **HTMX Fragments** | `renderers/htmx/` | Hypermedia fragments + pre-wired `hx-post`, `hx-swap` | Alpine.js + HTMX | Zero build step |
| **React (TSX / RSC)** | `renderers/react/` | `<Button variant="primary" size="md">` | Native React Hooks | 0 KB for 24 Server Components |
| **Web Components** | `renderers/js/` | `<qhr-button variant="primary" size="md">` | Custom Elements v1 | Pure Vanilla JS (0 dependencies) |

---

## 2. Invariant Rules of Renderers

A renderer MAY adapt:
- HTML markup structure and DOM nesting.
- Framework lifecycle conventions and state bindings.
- Event listening mechanisms.

A renderer MUST NOT alter:
- Component names (`Button` is always `Button`).
- Prop keys (`variant`, `size`, `tone`, `state`).
- Allowed values (`primary`, `secondary`, `outline`, etc.).
- Accessibility semantics, ARIA attributes, and keyboard roles.

---

## 3. Modular CSS Architecture (`renderers/html/native/components/`)

To prevent stylesheet bloat and ensure infinite horizontal scalability:
1. **Atomic Component Stylesheets:** Every component owns an independent stylesheet in `renderers/html/native/components/<component>.css` (38 files).
2. **Base & Layout Foundations:** Common variables, reset, and container layout are isolated in `base.css` and `layout.css`.
3. **Local Dev Import Manifest:** `renderers/html/native/components.css` acts as a clean 46-line `@import` manifest for zero-build previewing.
4. **Production Bundle:** `dist/qahera.css` (91.15 KB raw, 13.04 KB gzip) is automatically compiled via `cli/build-css.js`.

---

## 4. React Server Components (RSC) & 0kb Boundary Strategy

React renderers adhere to modern Next.js 15+ / React 19 architecture:
- **24 Pure Server Components (0kb Client JS):** Static and container components (`Button`, `Card`, `Badge`, `Alert`, `Avatar`, `Breadcrumb`, `Callout`, `Chip`, `Divider`, `Input`, `Kbd`, `Navbar`, `Progress`, `Radio`, `Ribbon`, `Skeleton`, `Spinner`, `Stepper`, `Switch`, `Table`, `Textarea`, `Timeline`) contain zero client runtime.
- **15 Authorized Leaf Client Components:** Interactive components (`Accordion`, `BackToTop`, `CanvasSparks`, `Carousel`, `Drawer`, `Dropdown`, `FileUpload`, `Modal`, `Preloader`, `Rating`, `Select`, `Tabs`, `Toast`, `Tooltip`, `Treeview`) declare `'use client'` strictly at the terminal leaf level.

---

## 5. Vanilla Web Components (`renderers/js/`)

Web components provide framework-free reactive components via standard W3C Custom Elements:
- All 38 components are registered under the `qhr-*` prefix (e.g. `<qhr-button>`, `<qhr-modal>`, `<qhr-rating>`).
- Auto-discovered and registered through `renderers/js/index.js`.
- Pure Vanilla JavaScript with zero runtime dependencies.

