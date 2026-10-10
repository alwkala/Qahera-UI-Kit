# Architecture & The 17 Non-Negotiable Invariants

Qahera UI Kit enforces strict architectural discipline. Whether code is authored by human developers or AI coding agents, every contribution must satisfy these foundational invariants without exception.

---

## The 17 Non-Negotiable Invariants

| Invariant Code | Title | Core Rule |
|---|---|---|
| `QAHERA-SRC-001` | **YAML is Authoritative** | Contracts (`contracts/`) and recipes (`recipes/`) in YAML are the single source of truth. JSON and dist files are generated targets. |
| `QAHERA-SRC-002` | **Generated Files Never Hand-Patched** | Never manually patch files in `dist/`, `renderers/`, or `generated/`. Fix the source YAML and recompile. |
| `QAHERA-TOK-001` | **Tokens Precede Styling** | Zero hardcoded colors (`#0b6bcb`), arbitrary pixel margins, or ad-hoc transitions. All properties map to `--qhr-*`. |
| `QAHERA-CON-001` | **Contracts Precede Implementations** | No component or variant exists in any renderer without a registered contract in `contracts/components/`. |
| `QAHERA-RTL-001` | **RTL is Infrastructure** | 100% Logical CSS properties (`margin-inline-start`, `inset-inline-start`, `padding-inline`). Physical `left`/`right` properties are banned. |
| `QAHERA-TYP-001` | **Arabic Typography Discipline** | Alexandria (`--qhr-font-heading`) for titles; Cairo (`--qhr-font-body`) for UI. Font **Amiri** is strictly prohibited for UI layouts. |
| `QAHERA-CUL-001` | **Heritage Stays in Templates** | Cultural, Egyptian, and Islamic motifs belong to downstream templates; core components remain universally portable. |
| `QAHERA-DRF-001` | **Renderer Parity & Zero Drift** | Prop names, values, and ARIA roles remain identical across all 5 framework renderers. |
| `QAHERA-OWN-001` | **Source Ownership over Lock-in** | Consuming apps copy and own component source code (shadcn style). Zero runtime package lock-in. |
| `QAHERA-AIM-001` | **AI Metadata Requirement** | Every recipe must declare WHAT (purpose), WHEN (use cases), and WHY NOT (anti-patterns). |
| `QAHERA-VIS-001` | **Zero Emoji Policy** | Emojis (e.g. 🚀, 🗑️, ✕) are strictly banned in UI components. Only registered SVGs from `icons/registry.yaml` are allowed. |
| `QAHERA-RSC-001` | **Modular CSS & RSC 0kb Boundary** | Pure Server Components in React. Client interactive JavaScript is isolated to terminal leaf components. |
| `QAHERA-CMP-001` | **Canonical Dogfooding** | Showcases and templates must be constructed exclusively from registered `qhr-*` components and patterns. |
| `QAHERA-ALP-001` | **Alpine.js Hydration Protocol** | No bulky inline attributes (`x-data="{...}"`); unique `:key` attributes; no nested `x-for`. |
| `QAHERA-THM-001` | **Thematic Topography** | Themes synthesize global design movements with authentic Cairo urban contexts via semantic token overrides. |
| `QAHERA-SCR-001` | **Script Tokenizer Immunity** | No unescaped `</script>` tags in string literals. Code snippet copying extracts directly from DOM nodes. |
| `QAHERA-BAR-001` | **Disambiguated Barrel Exports** | Components and patterns sharing names (e.g. `Pagination`) must use explicit named re-exports. |

---

## The Zero-Custom-CSS Mandate (`QAHERA-SITE-COMP-001`)

Under Qahera's governance contract:
* **Prohibited:** Inventing ad-hoc CSS classes, custom widgets, arbitrary inline styles, or bespoke interactive controls.
* **Mandatory:** Every button, card, modal, navbar, dropdown, input, badge, or layout must originate from Qahera UI Kit's official registry.

Verify compliance automatically using the CLI:
```bash
npx qahera-ui lint
```
