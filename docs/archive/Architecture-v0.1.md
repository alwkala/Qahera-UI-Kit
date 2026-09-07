# Qahera UI Kit — Architecture & Technical Documentation

Version: v0.1 (MVP) · Owner: Alwkala · Coordinated with: TidyFactor ecosystem (not owned by it)

This document is the canonical architecture reference for the repository. `CONTRACT.md` (the component contract) defines *what* the components and tokens are named; this document defines *how the repo is built* to deliver them.

---

## 1. Repository structure

```
qahera-ui-kit/
├── tokens/
│   ├── tokens.css              # canonical --qhr- custom properties — single source of truth
│   ├── tailwind.preset.js      # Tailwind config extension generated FROM tokens.css, never hand-edited
│   └── brand.json              # machine-readable token manifest (colors, scales, roles) for tooling/AI agents to introspect
│
├── recipes/                    # one file per component in CONTRACT.md §3 — foundation-aware variant maps
│   ├── button.recipe.json
│   ├── input.recipe.json
│   ├── modal.recipe.json
│   └── ... (17 total for v0.1)
│
├── renderers/                  # generated FROM recipes/ — never hand-edited independently of the recipe
│   ├── plates/                 # consumed by tidyfactor-php, -php-micro, -php-mono, -php-kernel, -design
│   │   ├── button.php
│   │   └── ...
│   ├── html/                   # consumed by tidyfactor-html
│   │   ├── native/              # semantic classes (Native CSS foundation) — button.html + components.css entry
│   │   ├── tailwind/            # utility classes pre-baked inline (Tailwind foundation)
│   │   └── web-components/      # optional <qhr-button> wrapper for either foundation
│   ├── htmx/                   # consumed by tidyfactor-htmx — same markup as html/, pre-wired hx-* attributes
│   │   └── button.fragment.php
│   └── react/                  # consumed by tidyfactor-nextjs-saas
│       ├── Button.tsx
│       └── ...
│
├── behavior/                   # Alpine.js modules — framework-free, copied verbatim into every server-rendered track
│   ├── dropdown.js
│   ├── modal.js
│   ├── tabs.js
│   ├── accordion.js
│   ├── tooltip.js
│   └── toast.js
│
├── i18n/
│   ├── rtl.css                 # logical-property overrides, applied automatically under html[dir="rtl"]
│   └── typography.md           # Arabic type rules — inherits tidyfactor-design's locked convention (§6)
│
├── docs/
│   ├── ARCHITECTURE.md         # this file
│   ├── CONTRACT.md             # component contract v0.1 (naming/variant authority)
│   ├── CONTRIBUTING.md         # how a new component or renderer gets added
│   └── CHANGELOG.md
│
└── examples/                   # one minimal demo project per consuming track, for regression-checking renderers
    ├── php-kernel-demo/
    ├── html-demo/
    ├── htmx-demo/
    └── nextjs-demo/
```

**Direction of truth**: `tokens/` and `recipes/` are hand-authored and version-controlled as source. Everything in `renderers/` is *derived* from them — a renderer file is never edited to fix a bug that actually lives in a recipe; the recipe gets fixed and the renderer regenerated. This is the same discipline `tidyfactor-design` already enforces for `components.css` (never patch a page, extend the shared file) — Qahera UI Kit applies it one layer earlier, since it has to serve four renderer targets instead of one.

---

## 2. Layer 1 — Design tokens

`tokens.css` holds every raw value referenced anywhere in the kit (see `CONTRACT.md` §1 for the full category list: color, spacing, radius, shadow, font size, motion). Nothing downstream — a recipe, a renderer, a consuming project — ever hardcodes a hex value, a pixel size, or a duration. Everything traces back to a `--qhr-*` variable.

`brand.json` mirrors `tokens.css` in machine-readable form:

```json
{
  "color": {
    "primary": { "50": "#eef6ff", "600": "#0b6bcb", "700": "#0958a5" },
    "danger":  { "50": "#fef2f2", "600": "#dc2626", "700": "#b91c1c" }
  },
  "space": { "1": "4px", "2": "8px", "3": "12px", "4": "16px", "6": "24px" },
  "radius": { "sm": "6px", "md": "10px", "pill": "999px" }
}
```

`brand.json` exists specifically for the "AI Native" promise from `CONTRACT.md`: an agent generating a new component doesn't parse CSS — it reads this file to know what values exist before writing a recipe.

`tailwind.preset.js` is a thin generator that reads `brand.json` and emits a Tailwind `theme.extend` block, so Tailwind-foundation tracks get the same values under Tailwind's own utility naming (`bg-primary-600`) without a second hand-maintained copy.

---

## 3. Layer 2 — Component recipes

A recipe is the machine-readable form of one row in `CONTRACT.md` §3. It is **foundation-aware**: a component in a Tailwind-based track needs utility-class strings; the same component in `tidyfactor-design`'s Native foundation needs a semantic class name instead. One recipe file carries both, so the two foundations never drift apart.

`recipes/button.recipe.json` (worked example):

```json
{
  "component": "button",
  "base": "inline-flex items-center justify-center font-medium transition-colors",
  "native_class": "qhr-btn",
  "props": {
    "variant": {
      "primary":     { "tailwind": "bg-[var(--qhr-color-primary-600)] text-white hover:bg-[var(--qhr-color-primary-700)]", "native_modifier": "qhr-btn--primary" },
      "secondary":   { "tailwind": "bg-[var(--qhr-color-neutral-100)] text-[var(--qhr-color-neutral-900)] hover:bg-[var(--qhr-color-neutral-200)]", "native_modifier": "qhr-btn--secondary" },
      "outline":     { "tailwind": "border border-[var(--qhr-color-primary-600)] text-[var(--qhr-color-primary-600)] bg-transparent", "native_modifier": "qhr-btn--outline" },
      "ghost":       { "tailwind": "bg-transparent text-[var(--qhr-color-primary-600)] hover:bg-[var(--qhr-color-primary-50)]", "native_modifier": "qhr-btn--ghost" },
      "link":        { "tailwind": "bg-transparent underline text-[var(--qhr-color-primary-600)] p-0", "native_modifier": "qhr-btn--link" },
      "destructive": { "tailwind": "bg-[var(--qhr-color-danger-600)] text-white hover:bg-[var(--qhr-color-danger-700)]", "native_modifier": "qhr-btn--destructive" }
    },
    "size": {
      "sm": { "tailwind": "text-sm px-[var(--qhr-space-3)] py-[var(--qhr-space-1)] rounded-[var(--qhr-radius-sm)]", "native_modifier": "qhr-btn--sm" },
      "md": { "tailwind": "text-base px-[var(--qhr-space-4)] py-[var(--qhr-space-2)] rounded-[var(--qhr-radius-md)]", "native_modifier": "qhr-btn--md" },
      "lg": { "tailwind": "text-lg px-[var(--qhr-space-6)] py-[var(--qhr-space-3)] rounded-[var(--qhr-radius-md)]", "native_modifier": "qhr-btn--lg" }
    },
    "state": {
      "disabled": { "tailwind": "opacity-50 cursor-not-allowed pointer-events-none", "native_modifier": "is-disabled" },
      "loading":  { "tailwind": "opacity-75 cursor-wait", "native_modifier": "is-loading" }
    }
  },
  "interactive": false
}
```

Every one of the 17 components in `CONTRACT.md` §3 gets exactly this shape. Interactive components (Modal, Dropdown, Tabs, Accordion, Toast, Tooltip, Nav) add an `"alpine_module"` field pointing at its file in `behavior/`.

---

## 4. Layer 3 — Renderers (generated output)

Four renderer families read `recipes/*.json` and emit track-ready files. Same Button recipe above, four outputs:

**Plates** (`renderers/plates/button.php`) — consumed by every PHP track:
```php
<button
  class="qhr-btn qhr-btn--<?= $variant ?? 'primary' ?> qhr-btn--<?= $size ?? 'md' ?><?= isset($disabled) ? ' is-disabled' : '' ?>"
  <?= isset($disabled) ? 'disabled' : '' ?>
><?= $this->e($label) ?></button>
```

**Static HTML — Tailwind foundation** (`renderers/html/tailwind/button.html`) — utility classes pre-baked at generation time, since static HTML has no templating step:
```html
<button class="inline-flex items-center justify-center font-medium transition-colors bg-[var(--qhr-color-primary-600)] text-white hover:bg-[var(--qhr-color-primary-700)] text-base px-[var(--qhr-space-4)] py-[var(--qhr-space-2)] rounded-[var(--qhr-radius-md)]">Label</button>
```

**HTMX fragment** (`renderers/htmx/button.fragment.php`) — identical markup to the Plates version, with `hx-*` wiring pre-added where the component implies a server round-trip (e.g. a submit button):
```php
<button class="qhr-btn qhr-btn--primary qhr-btn--md" hx-post="<?= $action ?>" hx-swap="outerHTML"><?= $this->e($label) ?></button>
```

**React** (`renderers/react/Button.tsx`) — the only renderer with a real runtime implementation, since JSX has no server templating equivalent:
```tsx
export function Button({ variant = "primary", size = "md", disabled, children }: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], disabled && states.disabled)} disabled={disabled}>
      {children}
    </button>
  );
}
```

**Native-foundation CSS** (`renderers/html/native/components.css` entry, shared by `tidyfactor-design`'s Native option and by any Plates track that chose Native over Tailwind):
```css
.qhr-btn { display: inline-flex; align-items: center; justify-content: center; font-weight: 500; transition: background-color var(--qhr-duration-fast); }
.qhr-btn--primary { background: var(--qhr-color-primary-600); color: white; }
.qhr-btn--primary:hover { background: var(--qhr-color-primary-700); }
.qhr-btn--md { font-size: var(--qhr-text-base); padding: var(--qhr-space-2) var(--qhr-space-4); border-radius: var(--qhr-radius-md); }
```

---

## 5. Layer 4 — Behavior pack (Alpine.js)

The six interactive modules (`dropdown.js`, `modal.js`, `tabs.js`, `accordion.js`, `tooltip.js`, `toast.js`) are plain Alpine `x-data` factories with no build step and no dependency on any specific renderer:

```js
// behavior/modal.js
document.addEventListener('alpine:init', () => {
  Alpine.data('qhrModal', () => ({
    open: false,
    show() { this.open = true; document.body.style.overflow = 'hidden'; },
    hide() { this.open = false; document.body.style.overflow = ''; },
    init() { this.$watch('open', v => { if (v) this.$nextTick(() => this.$refs.dialog?.focus()); }); }
  }));
});
```

These files are copied byte-for-byte into every server-rendered consuming project (Plates/static-HTML/htmx tracks). The React renderer does **not** use them — Modal/Dropdown/etc. in `renderers/react/` reimplement the same behavior with native React state, because Alpine and React cannot coexist as competing owners of the same DOM node. This is the one place the kit deliberately has two independent implementations of the same behavior, and it is intentional, not drift.

---

## 6. Arabic & RTL layer

This inherits `tidyfactor-design`'s already-locked typography rule rather than inventing a new one: **El Messiri for headings, Tajawal for body text, Amiri is never used.** `i18n/typography.md` restates this as Qahera UI Kit's own rule so a consuming project doesn't need to cross-reference `tidyfactor-design` to find it.

`i18n/rtl.css` handles direction mechanically:
- Every spacing/positioning value in `tokens.css` and the recipes uses **logical properties** (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`) instead of physical ones (`margin-left`, `padding-right`) — this is what makes `html[dir="rtl"]` correct automatically, with zero per-component RTL override.
- Icons that encode direction (arrows, chevrons) get a `[dir="rtl"] &` mirror rule in the recipe's `native_modifier`, not a duplicate component.

Per the decision already locked in this project (`cairo-ui-kit.md`): this section is the *entire* scope of "Arabic support" in this repository. Cairo/Egyptian heritage — color palettes evoking Islamic Cairo architecture, geometric accents, a distinct visual "personality" — is deliberately **not** in `tokens.css` or `recipes/`. It belongs to downstream templates/boilerplates built on top of this kit, kept there so the kit's own technical contract stays neutral and portable.

---

## 7. Distribution model — resolved

**Decision: copy-paste distribution, shadcn/ui-style — not an installable runtime package.**

Rationale: every consuming track (`tidyfactor-html`, `-htmx`, `-php*`) is built on a zero-build, no-runtime-dependency philosophy for shared/cPanel hosting. A `qahera-ui-kit` npm/Composer dependency would violate that for every track except `tidyfactor-nextjs-saas`. Copy-paste keeps the invariant intact everywhere: a consuming project *owns* the files it received, can edit them freely, and never breaks because an upstream package updated.

Mechanically:
1. Each track's own `components`/`compo` command (already an existing command in `tidyfactor-design`, and the equivalent in the other tracks) gains a new capability: fetch a named component's renderer file from this repo (pinned to a git tag/commit, e.g. `v0.1.3`) and copy it into the consuming project's own file tree, alongside `tokens.css` and the relevant `behavior/*.js` files.
2. The kit's own semver governs what "v0.1.3" means (§8) — a consuming project can sit on an old pinned version indefinitely; nothing pulls updates automatically.
3. `tidyfactor-nextjs-saas` is the one exception where a real package (`@alwkala/qahera-ui-kit-react`) is reasonable, since React/npm tooling is already a build-step environment for that track — but even there, the recipe/token layer stays the same JSON/CSS source, not a parallel implementation.

---

## 8. Versioning & governance

- **Semver on the whole repo**: a MINOR bump adds a component or a token category; a PATCH fixes a recipe or renderer bug; a MAJOR bump renames a token, a variant value, or a component (a breaking change to `CONTRACT.md` itself).
- **Contract before code**: `CONTRACT.md` is amended first for any naming change; recipes and renderers are never allowed to drift ahead of what the contract documents.
- **New component workflow** (`docs/CONTRIBUTING.md`): add the row to `CONTRACT.md` §3 → author `recipes/<name>.recipe.json` → generate the four renderers → add an Alpine module if interactive → add a demo usage to the matching `examples/*-demo/` project.
- **Cross-repo boundary**: this repo does not depend on `tidyfactor-*` skills, and no `tidyfactor-*` skill depends on this repo at the code level — the link is a documentation cross-reference (each track's docs point here for its default component source), matching the ownership decision already made.

---

## 9. Roadmap

- **v0.1 (current)**: the 17 components in `CONTRACT.md` §3, all four renderers, the six Alpine modules, the RTL/typography layer.
- **v0.2**: date picker, combobox/autocomplete, pagination, file upload, stepper/wizard (deferred from v0.1 per `CONTRACT.md`).
- **Family, not roadmap items for this repo**: **Alex Admin Kit** (TailAdmin replacement) consumes this repo's `tokens/` and general components but ships its own admin-specific recipes (data table with sort/filter, sidebar shell, stat cards) in its own repo. **Qena UI Kit**'s scope is not yet defined.
- **Not yet scheduled**: the `tidyfactor-design` integration itself (making Qahera Native/Tailwind the 5th pluggable foundation option) — this is a change to `tidyfactor-design`'s skill, tracked there, not in this repo.