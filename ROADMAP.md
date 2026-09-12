# Qahera UI Kit — SemVer Multi-Target & Agentic Roadmap (v1.0 → v2.0)
## The Sovereign AI-Native Design System & Multi-Target Engine
### Synthesis of shadcn/ui · daisyUI · Preline UI Architecture

> **Architectural Mission:** Establish **Qahera UI Kit** (by Alwkala Studio) as the premier, contract-governed, AI-native design system for bidirectional (RTL/LTR) web applications, combining **shadcn-style source code ownership**, **daisyUI-style 1-line Tailwind plugin integration**, **Preline-style multi-framework accessibility**, and a **first-in-class Autonomous AI Agent decision layer**.

---

## 🏛️ The Triad Benchmark Synthesis (ثلاثية الإلهام المرجعي)

Qahera UI Kit synthesizes the best architectural paradigms of the three defining modern UI movements:

```text
               ┌─────────────────────────────────────────────────────────┐
               │              QAHERA UI KIT v1.5 → v2.0                  │
               │   The Sovereign Arab-First AI-Native Design System      │
               └───────────────────────────┬─────────────────────────────┘
                                           │
         ┌─────────────────────────────────┼─────────────────────────────────┐
         ▼                                 ▼                                 ▼
   [ shadcn/ui ]                     [ daisyUI ]                      [ Preline UI ]
   Source Ownership                  Zero-Setup Plugin                Multi-Framework Parity
   • CLI code scaffolding            • 1-Line Tailwind plugin         • Vanilla JS + Tailwind
   • No runtime package lock-in      • Semantic CSS utility classes   • Rich admin & data grids
   • Full developer source code      • Pure CSS / zero JS core        • Tested WCAG accessibility
   • Radical styling autonomy        • 12 Cairo Atlas themes          • Interactive component scripts
```

---

## 🗺️ Master SemVer Milestone Sequence (التسلسل المعياري للإصدارات)

| SemVer Release | Focus Theme | Key Deliverables & Scope | Status | Target Date |
|---|---|---|---|---|
| **v1.0.0** | Core Foundation & Contracts | 38 Contracts, 41 Canonical Icons, 3-Tier W3C Tokens, Compiler Pipeline | **Completed** | 2026-08 |
| **v1.4.0** | Sovereign Cairo Studio | 12 Cairo Atlas Themes, Viewport Simulator, Radius Matrix, Logical CSS | **Completed** | 2026-09 |
| **v1.5.0** | Grand Architectural Parity | 42 Components, 20 Patterns, 100% 5-Stack Parity (HTML, React, PHP, JS, HTMX) | **Completed** | **2026-09-11** |
| **v1.5.1** | Sovereign AI Decision Layer & NPX CLI | `qahera-ui` Skill (15/15 compliance), Zero-Install `npx qahera-ui`, `qahera.json`, AI Embedding | **Completed** | **2026-09-12** |
| **v1.6.0** | Tokens Studio, Advanced Data & SVG Icons | Advanced DataGrids (Preline-style), DatePicker, Form Schemas, W3C DTCG Sync, Curated 150+ SVG Icon Engine | *Planned* | Q4 2026 |
| **v1.7.0** | Tailwind Plugin & Microwebsite | Official Tailwind Plugin (`qahera-ui-kit/tailwind`), `alwkala.com/qahera` Microwebsite, npm dual-dist | *Planned* | Q1 2027 |
| **v2.0.0** | AI Agent Engine & Native MCP | Autonomous MCP Server (`qahera-mcp`), Agent Skills Suite, Global Registries (Smithery/Glama) | *Roadmap* | Q1-Q2 2027 |

---

## 1. Release Milestones in Detail

### 1.1 Milestone v1.5.0 — Grand Architectural Parity (Current Milestone · Completed)
* **Status:** **Shipped & Verified (100% 1:1 Parity Matrix)**
* **Deliverables:**
  - **42 Canonical Components & 20 UX Patterns** with 100% vocabulary parity across 5 production renderers.
  - **PHP 8.x Plates SSR Track:** 42 templates in `renderers/php/plates/*.php` + `QaheraPlatesExtension.php` helper.
  - **Vanilla JS Web Components:** 42 autonomous custom elements in `renderers/js/components/*.js` + auto-registration bundle `index.js`.
  - **React 19 / Next.js 16 RSC:** 29 pure Server Components (0kb client JS) + 15 verified leaf client components.
  - **CLI Scaffolder:** `qahera add` & `qahera list` supporting all 5 targets (`--target=react|php|html|htmx|js`).
  - **Quality Gates:** 100% test pass on Schemas, WCAG AA contrast ($\ge 4.5:1$), and Logical CSS.

---

### 1.2 Milestone v1.6.0 — Tokens Studio, Advanced Data Components & Figma Sync (Q4 2026)
* **Goal:** Elevate enterprise application capabilities (inspired by **Preline UI** & **Ant Design**) and establish bidirectional design token workflows.
* **Scope of Deliverables:**
  1. **Advanced Enterprise Data Components:**
     - `TreeDataGrid` / `AdvancedTable`: Column pinning, multi-column sorting, virtual scrolling for large datasets, and inline cell editing.
     - `DatePicker` / `DateRangePicker`: Gregorian & Hijri calendar support with bidirectional keyboard navigation.
     - `TagInput` / `MultiCombobox`: Accessible chip tagging with search filtering.
  2. **Form Schema Validation Binding:**
     - Pre-configured adapters for Zod, Valibot, and PHP server-side validation with standard ARIA error reflections.
  3. **Bidirectional W3C DTCG & Figma Tokens Sync:**
     - CLI command `qahera tokens:sync` supporting W3C Design Tokens Community Group (DTCG) specification.
     - Automated export to Figma Tokens (Tokens Studio JSON) and bidirectional token pull pipeline.
  4. **Micro-Interactions & Focus Traps:**
     - Floating UI anchoring engine for smart positioning of tooltips and dropdowns in complex viewports.
  5. **Sovereign SVG Icon Library Engine (`icons/` & `@alwkala/qahera-icons`):**
     - Curating lightweight, high-performance open-source vector paths from **Lucide Icons**, **Tabler Icons**, and **Heroicons** with 100% stroke/viewBox parity (`viewBox="0 0 24 24"`, `stroke-width="2"`, `fill="none"`).
     - Expanding from 41 baseline icons to 150+ enterprise semantic icons (< 400 bytes per icon).
     - Automated multi-target compiler: emits React TSX (`Icon.tsx`), PHP Plates (`icon.php`), Vanilla JS (`qhr-core.js`), and SVG sprite sheet (`icons.svg`).
     - Smart bidirectional RTL mirroring (`arrow-start`, `arrow-end`, `chevron-start`, `chevron-end`).

---

### 1.3 Milestone v1.7.0 — Official Tailwind Plugin & Sovereign Microwebsite Launch (Q1 2027)
* **Goal:** Zero-setup adoption (inspired by **daisyUI**) and multi-channel public web presence.
* **Scope of Deliverables:**
  1. **The Official Tailwind CSS Plugin (`qahera-ui-kit/tailwind`):**
     - Single-line integration in `tailwind.config.js`:
       ```javascript
       plugins: [
         require('qahera-ui-kit/tailwind')({
           themes: true, // Injects all 12 Cairo Atlas themes
           rtl: true,    // 100% logical property utilities
           prefix: 'qhr-',
         })
       ]
       ```
     - Automatic injection of semantic tokens into Tailwind's `theme.extend` (`colors.qhr.*`, `borderRadius.qhr.*`).
     - Zero build friction: works seamlessly with Next.js, Vite, Laravel, Astro, and Nuxt.
  2. **Official Microwebsite (`alwkala.com/qahera`):**
     - **Grand Living Showcase:** Real-time visual catalog of all 42 components and 20 patterns.
     - **Interactive Theme Studio:** Live visual theme customizer with instant CSS/YAML/Tailwind config export.
     - **Multi-Stack Code Inspector:** Instant switching between HTML, React, PHP, JS, and HTMX code specimens.
     - **Viewport & RTL Simulator:** Seamless toggle between Desktop/Tablet/Mobile and RTL/LTR modes.
  3. **npm Dual-Distribution Package (`npm i qahera-ui-kit` / `@alwkala/qahera`):**
     - Global and local CLI binary (`npx qahera add <component>`).
     - Bundled CSS distributions (`dist/qahera.css`, `dist/qahera-themes.css`).
     - Official Tailwind plugin export entry point.

---

### 1.4 Milestone v2.0.0 — Autonomous AI Agent Engine & Native MCP Server (Q1-Q2 2027)
* **Goal:** Establish Qahera as the world's first authoritative AI-native design system with a dedicated Model Context Protocol (MCP) server and agent skills suite.
* **Scope of Deliverables:**
  1. **Native Qahera MCP Server (`qahera-mcp` via JSON-RPC 2.0 Stdio):**
     - Tool `qahera_search_components`: Ultra-fast semantic lookup across components, patterns, and categories.
     - Tool `qahera_inspect_component`: Progressive AI context disclosure (Levels 0–4: Index, Metadata, Recipe, Renderer, Example).
     - Tool `qahera_inspect_tokens`: Retrieve design token scales, contrast ratios, and neighborhood theme overrides.
     - Tool `qahera_validate_recipe`: Autonomous validation of agent-authored recipes against `recipe.schema.yaml`.
     - Tool `qahera_generate_snippet`: Machine-guaranteed snippet generation for any of the 5 supported stacks.
  2. **Agent Skills Suite (The Alwkala Skills Engine):**
     - **Skills-LAB Certified Skill:** Packaged skill directory conforming to the 15 TidyFactor Skill Architect rules.
     - **Multi-Agent Adaptations:**
       * **Antigravity IDE:** Builtin native skill integration with cognitive memory.
       * **Claude Code:** Standalone skill file in `~/.claude/skills/qahera/SKILL.md`.
       * **Cursor:** Ruleset definition in `.cursor/rules/qahera.mdc`.
       * **Windsurf & Copilot:** Specialized agent instructions in `.windsurf/rules/` and `.github/copilot-instructions.md`.
  3. **Global MCP & Skills Directory Distribution:**
     - Registration on **[mcpservers.org](https://mcpservers.org/)**, **Smithery.ai**, **Glama.ai**, **PulseMCP**, and the official Model Context Protocol registry.
     - Universal Agent Skills publication on **[skills.sh](https://www.skills.sh/)** and the TidyFactor Brain registry.
     - One-click install command: `npx -y @smithery/cli install @alwkala/qahera-mcp`.

---

## 2. Multi-Channel Publishing Governance (حوكمة النشر متعدد القنوات)

To guarantee high visibility, community adoption, and enterprise credibility, Qahera UI Kit adheres to a 5-channel governance matrix:

```text
                               ┌─────────────────────────────────────────────────┐
                               │     QAHERA MULTI-CHANNEL PUBLISHING MATRIX      │
                               └────────────────────────┬────────────────────────┘
                                                        │
         ┌────────────────┬────────────────┬────────────┴───┬────────────────┬────────────────┐
         ▼                ▼                ▼                ▼                ▼                ▼
  [ alwkala.com ]    [ GitHub OSS ]    [ npm Registry ] [ Tailwind Hub ] [ MCP Registries ] [ skills.sh ]
  Microwebsite       Level 5 Maturity  CLI & Core CSS   Plugin Ecosystem Global AI Tooling  Agent Ecosystem
  • Living Showcase  • CI Quality Gates • `npx qahera`   • daisyUI-style  • mcpservers.org  • skills.sh
  • Theme Studio     • SemVer Releases • `qahera-ui-kit` • 1-line install • Smithery.ai     • Skills-LAB
  • Multi-Stack Doc  • Issue Blueprints• Atomic CSS     • Token bridge   • Glama / PulseMCP • TidyFactor
```

### Channel 1: The Official Microwebsite (`alwkala.com/qahera`)
* **Role:** Primary public portal, visual showcase, and developer documentation hub.
* **Governance Standard:**
  - Automated CI/CD deployment on every tagged release (`v*.*.*`).
  - Zero-defect visual parity: showcases run directly on the canonical compiled CSS bundle.
  - Real-time RTL/LTR and theme switching supporting all 12 Cairo Atlas neighborhoods.

### Channel 2: GitHub Open Source Governance (`github.com/alwkala/Qahera-UI-Kit`)
* **Role:** Canonical repository, collaboration engine, and automated quality gatekeeper.
* **Governance Standard:**
  - **Level 5 OSS Maturity:** Strict adherence to `CODE_OF_CONDUCT.md`, `SECURITY.md`, `LICENSE` (MIT), and `CONTRIBUTING.md`.
  - **Automated CI Gates:** Every PR must pass schema validation, WCAG AA contrast check, RSC budget audit, and logical CSS scans (`node ci/audit-all.js`).
  - **Release Notes Discipline:** Automated changelog generation following Conventional Commits format.

### Channel 3: npm Package Registry (`qahera-ui-kit` & `@alwkala/qahera`)
* **Role:** Developer distribution pipe for CLI scaffolding and Tailwind plugins.
* **Governance Standard:**
  - Pure zero-dependency footprint where possible.
  - Verified bundle size budgets: Core CSS $\le 225\text{ KB}$ raw ($\le 30\text{ KB}$ gzipped).
  - Clean export maps in `package.json` for atomic imports (`/tailwind`, `/css`, `/tokens`).

### Channel 4: Global MCP Registries (mcpservers.org, Smithery, Glama, PulseMCP)
* **Role:** Discoverable AI gateway for autonomous coding assistants and IDE agents.
* **Governance Standard:**
  - Official listing on major directories: **[mcpservers.org](https://mcpservers.org/)**, **[Smithery.ai](https://smithery.ai/)**, **[Glama.ai](https://glama.ai/mcp/servers)**, and **[PulseMCP](https://pulsemcp.com/)**.
  - Verified MCP manifest (`mcp.json`) conforming to JSON-RPC 2.0 protocol.
  - Sub-50ms tool response latency with progressive token caching.

### Channel 5: Global Agent Skills Directories (skills.sh & Skills-LAB)
* **Role:** Standardized prompt engineering instructions and workflow guides for agentic pair programming across Claude, Cursor, Windsurf, and Antigravity.
* **Governance Standard:**
  - Official listing and packaging on **[skills.sh](https://www.skills.sh/)** for 1-command installation into developer environments.
  - Strict adherence to the 15 Skills-LAB rules (token budget $\le 1024$ chars in frontmatter, explicit dispatch tables, verified links).

---

## 3. Work Package Architecture (حزم العمل التنفيذية)

### Work Package G: The Official Tailwind CSS Plugin (`renderers/tailwind/`)
1. **Core Module (`renderers/tailwind/index.js`):**
   - Implements `tailwindcss/plugin.withOptions` to accept user configurations (`themes`, `prefix`, `rtl`).
   - Automatically registers `@layer components` rules referencing canonical CSS.
   - Binds `--qhr-*` custom properties to Tailwind utility classes (`bg-qhr-surface`, `text-qhr-primary`, `rounded-qhr-md`).
2. **Preset Exporter (`renderers/tailwind/preset.js`):**
   - Exposes a ready-made Tailwind preset configuration for new projects.

### Work Package H: Multi-Channel Publishing & Microwebsite Architecture
1. **Microwebsite Build Pipeline (`site/` or `examples/previews/`):**
   - Single-command static site generator compiling the living registry into deployable static pages for `alwkala.com/qahera`.
   - SEO metadata, OpenGraph cards, and schema.org structured data.
2. **Release Scaffolder (`cli/publish.js`):**
   - Automated workflow validating test suites, bumping version across `package.json` and specs, tagging git release, and emitting npm packages.

### Work Package I: Autonomous AI Engine & Native MCP Server (`mcp/`)
1. **MCP Server Core (`mcp/server.js`):**
   - Model Context Protocol Stdio server implementation using `@modelcontextprotocol/sdk`.
   - In-memory SQLite or cached JSON lookup for sub-10ms component discovery.
2. **Agent Skills Manifest (`skills/qahera/`):**
   - Canonical `SKILL.md` file equipped with decision matrices, anti-patterns, and multi-target code samples.

### Work Package J: The Sovereign SVG Icon Library & Multi-Target Engine (`icons/` & `cli/build-icons.js`)
1. **Canonical Schema & Registry Expansion (`icons/registry.yaml`):**
   - Curating lightweight, high-performance vector paths from **Lucide Icons**, **Tabler Icons**, and **Heroicons** with 100% stroke/viewBox parity (`viewBox="0 0 24 24"`, `stroke-width="2"`, `fill="none"`).
   - Standardized categories: navigation, actions, status, commerce, media, security, editing, devices.
   - Vector optimization via SVGO to achieve $< 400\text{ bytes}$ per icon with zero redundant nodes or metadata.
2. **Automated Multi-Target Synchronizer (`cli/build-icons.js`):**
   - Emits React type-safe icon components (`renderers/react/Icon.tsx` with `QaheraIconName` union types).
   - Emits PHP Plates SVG path registry (`renderers/php/plates/icon.php`).
   - Emits Vanilla JS Web Component paths (`renderers/js/qhr-core.js`).
   - Compiles production SVG sprite sheet (`renderers/html/native/icons.svg`).
3. **Smart Bidirectional RTL Mirroring (`QAHERA-VISUAL-001`):**
   - Logical directional awareness for asymmetric icons (`arrow-start`, `arrow-end`, `chevron-start`, `chevron-end`, `undo`, `redo`).
4. **CLI Icon Adder (`qahera icon search <query>` / `qahera icon add <name>`):**
   - On-demand cherry-picking of individual SVGs directly into consuming project folders with 0kb unused bundle waste.

---

## 4. Definition of Done (DoD) for Releases

A release milestone in Qahera UI Kit is declared production-ready only when:
- [ ] **Contract Integrity:** All component contracts pass `node bin/qahera.js validate` with 0 errors.
- [ ] **Renderer Parity:** All supported targets (HTML, React, PHP, JS, HTMX) achieve 100% vocabulary parity.
- [ ] **Accessibility:** All components pass automated WCAG 2.1 AA contrast ($\ge 4.5:1$) and landmark/ARIA audits.
- [ ] **RTL Parity:** 100% logical CSS properties verified with zero forbidden physical margins/paddings.
- [ ] **Visual Discipline:** Zero emoji detected across components (`QAHERA-VISUAL-001`).
- [ ] **Performance Budget:** Raw CSS remains $\le 225\text{ KB}$ and client RSC footprint remains 0kb for presentational components.
- [ ] **Documentation Sync:** `README.md`, `README.ar.md`, `docs/STATUS.md`, and `ROADMAP.md` are completely updated.
- [ ] **Automated CI Suite:** Passes `npm test` with 100% green checks across all 4 stages.

---

*Authored by **Alwkala** Studio Architecture Team. © 2026 Alwkala. Distributed under the MIT License.*
