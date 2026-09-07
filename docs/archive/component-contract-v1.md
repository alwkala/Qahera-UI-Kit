# Qahera UI Kit — AI Native Design System Kit
## Component contract v0.1

**Ownership & family context**: Qahera UI Kit is launched as its own project directly under Alwkala — not under TidyFactor. It is *coordinated with and compatible with* the TidyFactor skill ecosystem, but kept as a separate identity so TidyFactor (still early-stage) stays legible as what it actually is: context management, command engineering, the governance layer, skills, MCP memory, and the CLI. Qahera UI Kit is the first of a family of Alwkala UI-kit products, each named after an Egyptian city and each replacing a specific incumbent library:

| Product | Replaces | Scope |
|---|---|---|
| **Qahera UI Kit** (this document) | daisyUI | General component library — the 17 components below |
| **Alex Admin Kit** | TailAdmin | Dedicated admin/dashboard kit |
| **Qena UI Kit** | — | Additional family member (scope TBD) |
| *(more planned)* | — | — |

Status: draft, scoped for MVP. This document is the single naming/behavior authority every consuming track (`tidyfactor-html`, `tidyfactor-htmx`, `tidyfactor-php`, `tidyfactor-php-micro`, `tidyfactor-php-mono`, `tidyfactor-php-kernel`, `tidyfactor-design`, `tidyfactor-nextjs-saas`) follows when it renders one of these components. The contract fixes *names* and *prop vocabulary*, not markup — each track renders its own markup from this vocabulary.

**Why "AI Native"**: the fixed vocabulary below exists so an AI coding agent can generate a correct `Button` or `Modal` in any track without inventing new naming per project — the contract is the thing that makes output predictable across hundreds of AI-authored scaffolds, built from day one for the developer and the AI to use together, not just a style guide for human designers.

---

## 1. Token naming (source of truth)

CSS custom properties, prefixed `--qhr-` — from **Qahera** (قاهرة), Cairo's Arabic name — chosen over a plain English abbreviation to keep the brand's Arabic root visible in the code itself, and to avoid collisions with a host project's own variables. Tailwind config in every track extends from these, it never redefines raw values locally.

| Category | Prefix | Example |
|---|---|---|
| Color | `--qhr-color-{name}-{50..900}` | `--qhr-color-primary-600` |
| Spacing | `--qhr-space-{0..24}` | `--qhr-space-4` |
| Radius | `--qhr-radius-{sm,md,lg,pill}` | `--qhr-radius-md` |
| Shadow | `--qhr-shadow-{sm,md,lg}` | `--qhr-shadow-sm` |
| Font size | `--qhr-text-{xs,sm,base,lg,xl,2xl}` | `--qhr-text-sm` |
| Motion | `--qhr-duration-{fast,base,slow}`, `--qhr-ease-{in,out,in-out}` | `--qhr-duration-fast` |

Color roles (semantic, map onto the raw ramps above): `primary`, `secondary`, `neutral`, `success`, `warning`, `danger`, `info`.

---

## 2. Variant vocabulary (cva-style)

Every component that has visual variants uses this fixed prop set — never invent new prop names per component.

| Prop | Allowed values | Applies to |
|---|---|---|
| `variant` | `primary` \| `secondary` \| `outline` \| `ghost` \| `link` \| `destructive` | button, badge, alert |
| `size` | `sm` \| `md` \| `lg` (some components add `xs`) | button, input, badge, avatar |
| `tone` | `neutral` \| `info` \| `success` \| `warning` \| `danger` | alert, badge, toast |
| `state` | `default` \| `hover` \| `focus` \| `disabled` \| `loading` | button, input, select |

Naming rule: attribute/class name is always `data-variant`, `data-size`, `data-tone`, `data-state` in server-rendered markup (PHP/HTML/HTMX tracks), and the matching camelCase prop (`variant`, `size`, `tone`, `state`) in the React/TSX renderer. Same vocabulary, different binding mechanism.

---

## 3. Canonical component list (v0.1 / MVP scope)

| # | Component | Variants used | Needs interactivity? | Behavior owner |
|---|---|---|---|---|
| 1 | Button | variant, size, state | No | — |
| 2 | Input | size, state | No | — |
| 3 | Textarea | size, state | No | — |
| 4 | Select | size, state | Yes | Alpine (native `<select>` fallback for no-JS) |
| 5 | Checkbox / Radio | state | No | — |
| 6 | Card | — (structural only) | No | — |
| 7 | Badge | variant, tone, size | No | — |
| 8 | Alert | tone | No | — |
| 9 | Toast | tone | Yes | Alpine (auto-dismiss, stacking) |
| 10 | Modal | size | Yes | Alpine (focus trap, esc-to-close) |
| 11 | Dropdown | — | Yes | Alpine (click-outside, keyboard nav) |
| 12 | Tabs | — | Yes | Alpine (or plain hash-nav fallback) |
| 13 | Accordion | — | Yes | Alpine |
| 14 | Table | size | No (pagination/sort deferred to v0.2) | — |
| 15 | Avatar | size | No | — |
| 16 | Tooltip | — | Yes | Alpine (hover/focus trigger) |
| 17 | Nav / Navbar | — | Yes (mobile toggle) | Alpine |

Deferred to v0.2: date picker, combobox/autocomplete, pagination, file upload, stepper/wizard — all of these need more behavior design than a v0.1 contract should lock in. (Admin-specific pieces — data tables with sort/filter, sidebar nav shells, stat cards — belong to **Alex Admin Kit**'s contract, not this one.)

---

## 4. Per-track renderer mapping

| Track | Output artifact per component | Interactivity mechanism |
|---|---|---|
| `tidyfactor-html` | Static HTML snippet + optional Web Component wrapper | Shared Alpine.js behavior pack |
| `tidyfactor-htmx` | Server-rendered fragment, pre-wired `hx-*` attributes | Shared Alpine.js behavior pack + htmx swaps |
| `tidyfactor-php` / `-php-micro` / `-php-mono` / `-php-kernel` | Plates `.php` partial | Shared Alpine.js behavior pack |
| `tidyfactor-design` | Same Plates or static output (it prototypes on top of the same foundation) | Shared Alpine.js behavior pack |
| `tidyfactor-nextjs-saas` | React `.tsx` component | Native React state (separate implementation, same token/variant vocabulary) |

Alpine.js behavior modules (`dropdown.js`, `modal.js`, `tabs.js`, `accordion.js`, `tooltip.js`, `toast.js`) are written once and copied verbatim into every server-rendered track — never re-implemented per track.

---

## 5. Decisions

1. ~~TailAdmin overlap in `tidyfactor-php-kernel`~~ — **Resolved.** Alex Admin Kit is the dedicated TailAdmin replacement for the kernel's admin panel; Qahera UI Kit's Button/Input/Table stay scoped to general/public-facing use and are consumed *by* Alex Admin Kit rather than competing with it.
2. **daisyUI overlap in `tidyfactor-design`** — Directionally resolved: Qahera UI Kit is meant as the ecosystem-native equivalent to daisyUI. Still open: whether it plugs in as a 5th named option inside the existing pluggable CSS-foundation choice (Native / Tailwind / daisyUI / Hybrid / **Qahera**), or replaces the Tailwind-only option outright.
3. **Distribution model** — Still open: copy-paste per project (shadcn/ui style, recommended — matches the zero-build philosophy already used elsewhere) vs. a versioned installable package. Decides whether `tokens.css` and the component recipes live in each project's repo or are pulled from a shared Alwkala package at build time.
4. ~~Repo home~~ — **Resolved.** Own repo directly under Alwkala (not the TidyFactor org), cross-linked from TidyFactor's docs for coordination, not ownership.
5. ~~Heritage vs. Arabic-support layers~~ — **Resolved.** Arabic-language support (RTL logical properties, Arabic typography rules) is this kit's core technical contract — the part every component in Section 3 must get right. Cairo/Egyptian heritage and history is a marketing layer applied one level up, in downstream templates and boilerplates built on top of Qahera UI Kit — it does not enter this contract's token or component definitions.