# Qahera UI Kit — Multi-Target Production Roadmap (v1.0 → v1.2)
## End-to-End Integration with 5 TidyFactor Stacks: HTML · HTMX · Vanilla JS · PHP Kernel · Next.js SaaS

> **Architectural Objective:** Establish Qahera UI Kit as the authoritative, contract-governed UI infrastructure for all 5 primary TidyFactor execution engines, delivering 100% vocabulary parity, source code ownership (shadcn-style), and zero runtime lock-in.

---

## 🏛️ The Strategic Alignment Equation

$$\mathbf{\text{Qahera}} \times \mathbf{\text{TidyFactor Skills}} = \text{Deterministic, Coherent Production UIs}$$

In the TidyFactor ecosystem, code generation is orchestrated by specialized AI agent skills. Without an authoritative UI kit, each skill generates ad-hoc CSS classes, arbitrary emojis, and mismatched accessibility trees.  
Qahera acts as the **Shared Visual & Semantic Substrate**:

```text
                                              QAHERA UI KIT
                             (Tokens · Contracts · Recipes · Semantic Icons)
                                                    │
      ┌────────────────┬────────────────┬───────────┴────┬──────────────────┬──────────────────┐
      ▼                ▼                ▼                ▼                  ▼                  ▼
/tidyfactor-html /tidyfactor-htmx /tidyfactor-js /tidyfactor-php-kernel /tidyfactor-next
┌──────────────┐ ┌──────────────┐ ┌────────────┐ ┌────────────────────┐ ┌──────────────────────┐
│ Static Web   │ │ Hypermedia   │ │ Vanilla SPA│ │ Modular Monolith   │ │ Multi-Tenant SaaS    │
│ Zero Runtime │ │ Fragments    │ │ Web Compo. │ │ Flight + Medoo     │ │ Next.js 16 + React 19│
│ Pure CSS+SVG │ │ Server Swaps │ │ Proxy Store│ │ League/Plates SSR  │ │ TypeScript Strict+RSC│
└──────────────┘ └──────────────┘ └────────────┘ └────────────────────┘ └──────────────────────┘
```

---

## 1. The 5 Target Stack Architectures

### 1.1 Track 1: Static Platform Starter (`/tidyfactor-html`)
* **Core Invariant:** Zero server runtime, zero build step, 100% static hosting (cPanel, Cloudflare Pages, GitHub Pages).
* **Target Output:**
  - `css/tokens.css` + `css/components.css` vendored directly into static project.
  - Native semantic HTML5 snippets (`<button class="qhr-btn qhr-btn--primary">`).
  - Native inline SVG icons from `icons/registry.yaml`.
  - Alpine.js behavior modules (`js/behavior/modal.js`, etc.) for interactive components.
* **Skill Hooks:**
  - `/compo` $\to$ Emits Qahera component markup directly into HTML partials.
  - `/assets` $\to$ Vendors `--qhr-*` tokens and optimized SVG symbols.
  - `/pages` $\to$ Uses Qahera patterns (`patterns/search-toolbar.yaml`, etc.) to structure static layouts.

### 1.2 Track 2: Server-Driven Hypermedia (`/tidyfactor-htmx`)
* **Core Invariant:** Server-rendered HTML fragments, zero client-side routing, locally vendored `htmx.min.js`, CSRF on all mutations.
* **Target Output:**
  - Fragment partials: `renderers/htmx/*.fragment.html` & `*.fragment.php`.
  - Integrated `hx-indicator`: Built-in spinner state using the canonical `spinner` SVG from `icons/registry.yaml`.
  - Morphdom & swap classes: Out-of-band updates (`hx-swap-oob`) for toasts, badges, and modals.
  - Custom event bridge: Triggering Alpine.js behavior via HTTP headers (`HX-Trigger: {"qhr-toast-show": {...}}`).
* **Skill Hooks:**
  - `/fragments` $\to$ Returns strictly formatted Qahera fragment markup.
  - `/indicators` $\to$ Scaffolds Qahera animated loading states (`.qhr-btn--loading`, `.qhr-spinner`).
  - `/forms` $\to$ Delivers inline validation error states using `--qhr-color-danger` tokens and `aria-invalid`.

### 1.3 Track 3: Framework-Free Reactive Vanilla SPA (`/tidyfactor-js`)
* **Core Invariant:** Zero React/Vue/Alpine runtime, 100% pure vanilla ES modules, native Web Components, reactive Proxy state management.
* **Target Output:**
  - Custom Elements: `renderers/js/components/*.js` (`<qhr-button>`, `<qhr-modal>`, `<qhr-input>`, `<qhr-select>`, `<qhr-toast>`).
  - Attribute reflection: Automatically syncing `variant`, `tone`, `size`, `disabled`, `loading` to component state.
  - Shadow/Light DOM styling referencing shared CSS custom properties (`var(--qhr-...)`).
  - Memory leak hygiene: Robust event listener cleanup in `disconnectedCallback()`.
* **Skill Hooks:**
  - `/compo` $\to$ Registers Custom Elements under the `qhr-*` namespace.
  - `/store` $\to$ Connects Qahera component events (`qhr-change`, `qhr-submit`) to the central Proxy state store.
  - `/pages` $\to$ Assembles multi-screen view controllers from Qahera component primitives.

### 1.4 Track 4: Domain-Agnostic PHP Kernel (`/tidyfactor-php-kernel`)
* **Core Invariant:** Modern PHP 8.2+ modular monolith (Flight + Medoo + Plates + TailAdmin/HTMX), strict Kernel/Module boundary.
* **Target Output:**
  - Native League/Plates templates: `renderers/php/plates/*.php` (e.g. `button.php`, `input.php`, `modal.php`, `card.php`).
  - Plates helper extension:
    ```php
    // In template:
    <?= $this->qhrButton('حفظ التعديلات', [
        'variant' => 'primary',
        'icon' => 'save',
        'size' => 'md',
        'attrs' => ['hx-post' => '/admin/settings/save']
    ]) ?>
    ```
  - Plates folder alias: `$plates->addFolder('qahera', __DIR__ . '/views/qahera');`
  - Integration with TailAdmin admin layouts, ensuring consistent visual tokens across admin panels and public storefronts.
* **Skill Hooks:**
  - `/modules` $\to$ Module views insert Qahera Plates partials (`$this->insert('qahera::button', ...)`).
  - `/admin` $\to$ Standardizes form controls, KPI stat cards, and data table toolbars with Qahera patterns.
  - `/themes` $\to$ Overrides `--qhr-*` tokens to create custom tenant themes without modifying PHP code.

### 1.5 Track 5: Production Multi-Tenant SaaS on Next.js 16 (`/tidyfactor-next`)
* **Core Invariant:** Next.js 16 App Router, React 19, TypeScript strict, locked tenant isolation (Supabase Postgres RLS), zero service-role leaks.
* **Target Output:**
  - **React Server Components (RSC) First:** Static and data-presentational components (`Button`, `Badge`, `Card`, `Table`, `Alert`) rendered on the server with **0kb client JavaScript footprint**.
  - **Leaf-Level Client Components:** Interactive components (`Modal`, `Dropdown`, `Tabs`, `Accordion`, `Toast`, `Select`) declared with `'use client'` using pure React 19 state (Hooks + Event listeners) — **zero Alpine.js leaks into React**.
  - **Strict TypeScript Types:** Complete prop type definitions derived directly from Qahera YAML contracts:
    ```typescript
    export type QaheraVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
    export type QaheraSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    export type QaheraTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
    ```
  - **Multi-Tenant CSS Theming:** Tenant-scoped CSS custom properties injected via layout wrappers (`data-tenant-theme="tenant-id"`), allowing runtime theme and brand palette switching per tenant without re-bundling code.
* **Skill Hooks:**
  - `/app` $\to$ Assembles Next.js 16 App Router layouts and dashboard screens using Qahera patterns.
  - `/tenant` $\to$ Injects tenant-specific `--qhr-*` brand tokens and font hierarchies (Cairo primary, El Messiri display).
  - `/auth` $\to$ Builds login/signup pages using `templates/auth/blueprint.yaml`.
  - `/api` $\to$ Connects Next.js Server Actions to Qahera form validation states (`aria-invalid`, inline error alerts).

---

## 2. Invariant Vocabulary Parity Across All 5 Stacks

A primary failure in multi-framework design systems is "vocabulary drift" (e.g. `variant="danger"` in React vs `type="error"` in PHP vs `data-kind="critical"` in HTML).  
**In Qahera, vocabulary drift is strictly prohibited across all 5 targets:**

| Prop / Concept | HTML (`/tidyfactor-html`) | HTMX (`/tidyfactor-htmx`) | Vanilla JS (`/tidyfactor-js`) | PHP Kernel (`/tidyfactor-php-kernel`) | Next.js 16 (`/tidyfactor-next`) |
|---|---|---|---|---|---|
| **Primary Button** | `<button class="qhr-btn qhr-btn--primary">` | `<button class="qhr-btn qhr-btn--primary" hx-post="...">` | `<qhr-btn variant="primary">` | `<?= $this->qhrButton('...', ['variant' => 'primary']) ?>` | `<Button variant="primary">` |
| **Destructive** | `data-variant="destructive"` | `data-variant="destructive"` | `variant="destructive"` | `'variant' => 'destructive'` | `variant="destructive"` |
| **Sizes** | `qhr-btn--sm` (xs..xl) | `qhr-btn--sm` (xs..xl) | `size="sm"` (xs..xl) | `'size' => 'sm'` (xs..xl) | `size="sm"` (xs..xl) |
| **Semantic Icon** | `<svg class="qhr-icon qhr-icon--delete">` | `<svg class="qhr-icon qhr-icon--delete">` | `<qhr-icon name="delete">` | `'icon' => 'delete'` | `iconStart={<Icon name="delete" />}` |
| **Direction/RTL** | Logical CSS (`margin-inline-start`) | Logical CSS (`margin-inline-start`) | Logical CSS (`margin-inline-start`) | Logical CSS (`margin-inline-start`) | Logical CSS (`margin-inline-start`) |
| **Loading State** | `.is-loading` + SVG spinner | `hx-indicator` + `.is-loading` | `loading` attribute | `'loading' => true` | `loading={true}` |

---

## 3. Four-Phase Execution Roadmap

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Canonical Contracts & Renderer Specifications (Q3 2026)        │
│ [x] 30 Component Contracts & Recipes validated (30 canonical components)│
│ [x] Canonical Icon Registry (41 SVGs) & QAHERA-VISUAL-001 anti-emoji   │
│ [x] Canonical AI Registry & Deterministic Compiler (168ms · 0 errors)  │
│ [x] Renderer Specification v1.0 updated for HTML, HTMX, JS, PHP, Next   │
├─────────────────────────────────────────────────────────────────────────┤
│ Phase 2: Core Renderers Implementation (Q3-Q4 2026)                     │
│ [x] Complete PHP Plates Renderer (30 components + Plates Extension)     │
│ [x] Complete React 19 / Next.js 16 Renderer (30 RSC & Client Comps)     │
│ [x] Complete HTMX Fragment Renderer (10 fragments in HTML & PHP)        │
│ [x] Complete HTML Native Renderer (30 snippets + 15 patterns + icons)   │
│ [x] Complete Vanilla JS Web Components (30 Custom Elements)             │
├─────────────────────────────────────────────────────────────────────────┤
│ Phase 3: Composite Patterns & Template Blueprints (Q4 2026)             │
│ [x] 15 Compositional Patterns implemented across React, PHP, and HTML   │
│ [x] 15 Production Template Tracks across HTML5, PHP Plates, and React:  │
│     1. Ecommerce Storefront       9. Transactional Emails (6 emails)   │
│     2. Shop & Sidebar Filters    10. Widgets Suite (6 families)        │
│     3. Auth Extended Suite       11. Admin CRUD Resource Manager       │
│     4. Error & Status Pages      12. Executive Analytics Dashboard     │
│     5. Charts & Telemetry (5 lib)13. Luxury Marketing Landing          │
│     6. Layouts (Boxed/Fixed/Rail)14. Education & Course Syllabus       │
│     7. Box Cards & Containers    15. Technical Documentation           │
│     8. Tables & Data Grids                                             │
│ [x] Multi-Target Interactive Showcase & Token Bridge (Dark/Light)       │
├─────────────────────────────────────────────────────────────────────────┤
│ Phase 4: TidyFactor CLI & Skill Scaffolding Hook (Q1 2027)              │
│ [x] `qahera add <component|pattern|template>` Multi-Target CLI          │
│ [x] Integration into `/tidyfactor-design` & `/tidyfactor-*` skills      │
│ [ ] Automated Visual Regression & Accessibility Matrix in CI            │
├─────────────────────────────────────────────────────────────────────────┤
│ Phase 5: 30-Theme Aesthetic Matrix & Theme Studio Generator (Q2 2027)   │
│ [ ] 20–30 Curated Theme Presets in `tokens/themes/` (Swiss, Neo-Brutal, │
│     Bauhaus, Glassmorphism, Aurora, Industrial, Luxury Gold, etc.)      │
│ [ ] Theme Studio Generator (Interactive daisyUI-style Theme Builder)    │
│     - Palette Engine (Base 100/200/300, Primary, Secondary, Accent...)  │
│     - Radius Engine (Boxes, Fields, Selectors)                          │
│     - Effects Engine (Depth 3D, Noise Pattern)                          │
│     - Sizes & Base Scaling (Fields 24-56px, Selectors 16-32px)          │
│     - Border Width Control (0–4px)                                      │
│     - Instant YAML/CSS Export & Live Component Mirroring                │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Detailed Implementation Work Packages

### Work Package A: The PHP Kernel Renderer (`renderers/php/plates/`)
1. **Directory Structure:**
   ```text
   renderers/php/plates/
   ├── QaheraPlatesExtension.php   # Helper functions ($this->qhrButton, $this->qhrModal)
   ├── components/
   │   ├── button.php
   │   ├── input.php
   │   ├── modal.php
   │   ├── badge.php
   │   ├── alert.php
   │   ├── card.php
   │   ├── select.php
   │   └── table.php
   └── patterns/
       ├── search-toolbar.php
       ├── confirmation.php
       └── dashboard-stat.php
   ```
2. **Plates Integration Contract:**
   - Every partial accepts standardized associative arrays matching the canonical component recipe.
   - Escapes user inputs with `$this->e(...)` while allowing safe SVG icons from the registry.
   - Automatically injects logical classes and ARIA attributes.

### Work Package B: The HTMX Hypermedia Renderer (`renderers/htmx/`)
1. **Directory Structure:**
   ```text
   renderers/htmx/
   ├── fragments/
   │   ├── button-spinner.fragment.html
   │   ├── modal-dialog.fragment.html
   │   ├── toast-notification.fragment.html
   │   └── table-row-edit.fragment.html
   └── helpers/
       └── htmx-events.js          # Dispatches HX-Trigger to Alpine/Qahera modules
   ```
2. **Behavioral Invariants:**
   - Zero flash of unstyled content during `hx-swap`.
   - Native support for `hx-disabled-elt="this"` to prevent multi-submissions.
   - Modals and Drawers close automatically on `htmx:afterOnLoad` when appropriate.

### Work Package C: The Vanilla JS Web Components Renderer (`renderers/js/`)
1. **Directory Structure:**
   ```text
   renderers/js/
   ├── qhr-core.js                 # Base HTMLElement with reactive attribute observer
   ├── components/
   │   ├── qhr-button.js           # <qhr-btn>
   │   ├── qhr-input.js            # <qhr-input>
   │   ├── qhr-modal.js            # <qhr-modal>
   │   ├── qhr-badge.js            # <qhr-badge>
   │   ├── qhr-toast.js            # <qhr-toast>
   │   └── qhr-select.js           # <qhr-select>
   └── index.js                    # Auto-registration bundle
   ```
2. **Vanilla SPA Invariants:**
   - 100% Shadow DOM or scoped Light DOM using CSS variables.
   - Dispatches custom events (`qhr:click`, `qhr:change`, `qhr:open`, `qhr:close`) that bubble up cleanly.
   - Works seamlessly with `/tidyfactor-js` Proxy state store without framework adapters.

### Work Package D: The Static HTML Platform (`renderers/html/native/`)
1. **Zero-Build Assets:**
   - `components.css`: Pre-compiled, pure vanilla CSS referencing `--qhr-*` tokens.
   - `icons.svg`: An optimized SVG sprite sheet compiled from `icons/registry.yaml`.
   - Semantic HTML snippets ready for static site generators or manual templating.

### Work Package E: Next.js 16 & React 19 Multi-Tenant SaaS Renderer (`renderers/react/`)
1. **Directory Structure:**
   ```text
   renderers/react/
   ├── types.ts                    # Strict TypeScript interfaces matching contracts
   ├── icons/                      # Type-safe SVG icon components from registry
   │   ├── Icon.tsx
   │   └── index.ts
   ├── rsc/                        # React Server Components (0kb client JS)
   │   ├── Button.tsx
   │   ├── Badge.tsx
   │   ├── Card.tsx
   │   ├── Alert.tsx
   │   └── Table.tsx
   ├── client/                     # 'use client' Interactive Components
   │   ├── Modal.tsx
   │   ├── Dropdown.tsx
   │   ├── Tabs.tsx
   │   ├── Accordion.tsx
   │   ├── Toast.tsx
   │   └── Select.tsx
   └── theme/
       ├── TenantThemeProvider.tsx # Tenant-scoped CSS variable injector
       └── useTenantTheme.ts
   ```
2. **Next.js 16 / React 19 Invariants:**
   - Strict RSC boundaries: Presentation components must never import `'use client'` unnecessarily.
   - Zero DOM mismatch: Guaranteed SSR/CSR hydration consistency with `suppressHydrationWarning` where dynamic IDs are resolved.

### Work Package F: The 30-Theme Matrix & Sovereign Theme Studio Generator (`tokens/themes/` & `tools/theme-generator/`)
1. **The 30-Theme Visual Movement Library:**
   - Pre-configured, zero-overhead theme YAML files in `tokens/themes/*.yaml` covering the 20 canonical design schools from `/tidyfactor-design` plus 10 regional/heritage palettes:
     - **Modern / Tech:** Swiss International, Minimalist, Glassmorphism, Aurora UI, Industrial Telemetry, Bento Box, Cyberpunk Neo-Tokyo.
     - **Art & Craft:** Bauhaus Geometry, Neo-Brutalism Pop, Skeuomorphic Warm, Claymorphic Soft, Corporate Memphis.
     - **Sovereign Egyptian & Regional:** Alwkala Imperial Gold (`luxury-gold`), Nile Emerald (`nile-emerald`), Nubian Terracotta (`nubian-terracotta`), Desert Sun Copper (`desert-copper`), Cairo Limestone (`cairo-limestone`), Islamic Geometric Azure (`islamic-azure`).
2. **The Theme Studio Generator Architecture (daisyUI-Inspired):**
   - Interactive live builder (`tools/theme-generator/index.html` or embedded into showcase) allowing developers to craft, preview, and export custom themes with zero CSS manual typing.
   - **Parameter Controls & Token Mapping:**
     * **Palette Engine (`Change Colors`):**
       - Base scale: `base-100` (canvas bg), `base-200` (surface card), `base-300` (surface elevated / borders).
       - Semantic roles: `primary`, `secondary`, `accent`, `neutral`, `info`, `success`, `warning`, `error`.
     * **Corner Radius Matrix (`Radius`):**
       - **Boxes** (`card`, `modal`, `alert`): 5 presets (`none` 0px, `sm` 6px, `md` 10px, `lg` 16px, `full` 24px) $\to$ `--qhr-radius-box`.
       - **Fields** (`button`, `input`, `select`, `tab`): 5 presets $\to$ `--qhr-radius-field`.
       - **Selectors** (`checkbox`, `toggle`, `badge`): 5 presets $\to$ `--qhr-radius-selector`.
     * **Effects Engine (`Effects`):**
       - **Depth Effect:** 3D bevel / inset highlights on fields & selectors (`--qhr-effect-depth: 1`).
       - **Noise Effect:** SVG procedural noise pattern texture overlay on cards & surfaces (`--qhr-effect-noise: 1`).
     * **Proportional Sizing Engine (`Sizes`):**
       - **Fields base size slider:** Step markings from `xs` (24px), `sm` (32px), `md` (40px), `lg` (48px), `xl` (56px) with base multiplier (e.g. 4.0px).
       - **Selectors base size slider:** Step markings from `xs` (16px), `sm` (20px), `md` (24px), `lg` (28px), `xl` (32px).
     * **Border Width Engine (`Border Width`):**
       - Global component stroke slider: `0px`, `1px`, `2px`, `3px`, `4px` $\to$ `--qhr-border-width`.
     * **Options & Color Schemes (`Options`):**
       - `Default theme` (set as light fallback), `Default dark theme` (set as dark fallback), `Dark color scheme` (`color-scheme: dark`).
   - **Export Engine:**
     - One-click copy/download as canonical YAML: `tokens/themes/custom.yaml`.
     - One-click copy as CSS custom properties block: `[data-theme="my-brand"] { ... }`.
     - Tailwind theme configuration snippet for projects using the Tailwind renderer.

---

## 5. Definition of Done (DoD) for Multi-Target Integration

A Qahera component is considered fully integrated across the TidyFactor ecosystem only when:
- [ ] **Canonical Contract:** Defined in `contracts/components/<Name>.yaml`.
- [ ] **Canonical Recipe:** Authored in `recipes/<name>.yaml` with tokens, use cases, and AI metadata.
- [ ] **HTML Target:** Verified in `renderers/html/native/<name>.html` + `components.css`.
- [ ] **HTMX Target:** Fragment template implemented with swap and indicator hooks.
- [ ] **Vanilla JS Target:** Native Web Component (`<qhr-...>`) implemented with disconnected cleanup.
- [ ] **PHP Target:** League/Plates template authored and verified with `$this->insert(...)`.
- [ ] **Next.js Target:** TypeScript React 19 RSC or Client component implemented with zero Alpine leaks.
- [ ] **Zero Vocabulary Drift:** Exact same prop names (`variant`, `tone`, `size`, `state`, `icon`) across all 5 targets.
- [ ] **Anti-Emoji Verification:** Passes `QAHERA-VISUAL-001` with zero unicode icon leaks.
- [ ] **RTL Parity:** 100% logical CSS properties verified in both LTR and RTL directions.
