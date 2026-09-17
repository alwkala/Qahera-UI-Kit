# Changelog

All notable changes to **Qahera UI Kit** will be documented in this file.
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.5] - 2026-09-17

### HTML Custom Data Autocomplete, Zero-Touch IDE Scaffolding & CLI CDN Engine
> *"Qahera UI Kit v1.5.5 completes the twin-pillar IDE intelligence suite by introducing official HTML Custom Data (`qahera.html-data.json`), empowering VS Code, Cursor, and Google Antigravity with full autocomplete and hover cards for all 45 Web Components and 13 Cairo themes. It upgrades `qahera init` to perform Zero-Touch IDE configuration, adds the instant `qahera cdn [theme]` boilerplate generator, and elevates the `qahera-ui` AI agent skill to v1.2.0."*

### Added
- **VS Code HTML Custom Data Generator (`cli/generate-html-data.js`):**
  - Authoritative generator conforming to Microsoft's `customData.schema.json` (HTML) v1.1.
  - Full tag autocompletion and hover documentation for all 45 canonical Web Components (`<qhr-button>`, `<qhr-card>`, `<qhr-badge>`, `<qhr-modal>`, `<qhr-cartouche>`, `<qhr-frieze>`, `<qhr-seal>`, etc.).
  - Controlled attribute autocompletion: `variant`, `size`, `tone`, `shape`, `state`, and `elevation` with zero prop drift.
  - Global attribute autocompletion for `data-theme` (13 Cairo neighborhood themes with cultural narratives), `data-mode` (`light` | `dark`), and `dir` (`rtl` | `ltr`).
  - Emitted to root and distribution bundles: `qahera.html-data.json` and `dist/qahera.html-data.json`.
- **Zero-Touch IDE Scaffolding in `qahera init` (`cli/add.js`):**
  - Project initialization now automatically copies `qahera.css-data.json` and `qahera.html-data.json`.
  - Automatically writes or merges `.vscode/settings.json` with `css.customData` and `html.customData`.
  - Automatically emits `.vscode/extensions.json` recommending YAML, Prettier, and Stylelint.
- **Instant CDN Boilerplate CLI Command (`qahera cdn [theme]`):**
  - Added CLI command `npx qahera-ui cdn [theme]` (e.g. `npx qahera-ui cdn heliopolis > index.html`) emitting a zero-build, responsive Arabic HTML5 template pre-wired with 3-tier CDN assets and fonts.
- **Sovereign AI Decision Layer Upgrade (`qahera-ui` v1.2.0):**
  - Upgraded skill metadata to `v1.2.0` with full support for Invariant 17 (`QAHERA-CSS-DATA-001`).
  - Updated operational memory: `cli-tools.md` (new CLI tools and CDN quickstart), `templates-catalog.md` (all 20 production tracks), and `anti-slop-matrix.md` (anti-guessing token rule).
  - Added Step 7 (IDE Custom Data Audit) to `workflows/audit-kit.md`.
- **Dual IDE Data Build Pipeline:**
  - Added `qahera build:html-data` and unified `qahera build:ide-data` (and `npm run build:ide-data`).
  - Registered `"./html-data": "./dist/qahera.html-data.json"` in `package.json`.

---

## [1.5.4] - 2026-09-17

### VS Code CSS Custom Data Autocomplete, Smart Token Map & Studio Refinements
> *"Qahera UI Kit v1.5.4 introduces official VS Code / Cursor / Google Antigravity CSS Custom Data (`qahera.css-data.json`), unlocking instant editor autocomplete, rich bilingual Markdown hover cards, and syntax validation for all 325 canonical design tokens. It ships the `build:css-data` CLI pipeline, adds `./css-data` npm package exports, and polishes Cairo Studio's dual-mode UX and contrast typography."*

### Added
- **VS Code CSS Custom Data Generator (`cli/generate-css-data.js`):**
  - Authoritative generator conforming to Microsoft's `customData.schema.json` v1.1.
  - Generates `qahera.css-data.json` covering 325 canonical `--qhr-*` design tokens with granular CSS syntax types (`<color>`, `<length>`, `<box-shadow>`, `<family-name>`, `<time>`, `<timing-function>`, `<integer>`).
  - Rich bilingual Markdown hover cards with Egyptian cultural heritage narratives (الوَدج، النِبو، الخِسبِد، الطمي، البردي، الكحل), light/dark values, strict governance rules, and ready-to-paste `var(--qhr-...)` snippets.
  - Automatic dual-workspace synchronization to both upstream kit and downstream showcase site.
- **CLI Pipeline Integration (`bin/qahera.js`):**
  - Added `qahera build:css-data` (and `npm run build:css-data`), automatically executed as part of the unified `build` and `compile` pipeline.
- **NPM Package Export & Workspace Configuration:**
  - Registered `"./css-data": "./dist/qahera.css-data.json"` in `package.json`.
  - Configured `Qahera-UI-Kit.code-workspace`, `Qahera-UI-Kit/.vscode/settings.json`, and `Qahera/.vscode/settings.json` with `"css.customData": ["./qahera.css-data.json"]`.

### Fixed
- **Cairo Studio UI Polish & Visual Refinements (`studio/index.html`):**
  - Removed decorative frame and box from brand logo in studio header for clean architectural elegance.
  - Fixed contrast failure on version badge (`v1.1`) in Garden City theme (`#ffffff` text on `#2563eb` background).
  - Streamlined header controls into single-row layout with icon-only action triggers and compact telemetry footer.

---

## [1.5.3] - 2026-09-17

### Universal Ecosystem Distribution, Packagist Support, Arabic NPM Parity & Platform Synchronization
> *"Qahera UI Kit v1.5.3 introduces official PHP Composer / Packagist package architecture (`alwkala/qahera-ui`), guarantees Arabic documentation distribution on NPM (`README.ar.md`), enables zero-build CDN quickstarts via jsDelivr / unpkg, authors automated GitHub Actions release workflows, and synchronizes live platform metrics and state across all 45 canonical components and 21 patterns."*

### Added
- **Official PHP Packagist Distribution (`composer.json`):**
  - Registered package manifest `alwkala/qahera-ui` with PSR-4 autoloading for `Qahera\Renderers\Plates\` targeting PHP 8.1+ applications (Laravel, FlightPHP, Slim, WordPress).
- **Arabic Documentation in NPM Package (`package.json`):**
  - Added `README.ar.md` to `files` array in `package.json`, ensuring complete bilingual documentation is bundled in npm releases and unpkg mirrors.
- **CDN Quickstart Architecture (`README.md` & `README.ar.md`):**
  - Added zero-build CDN inclusion examples using jsDelivr and unpkg for `dist/qahera-tokens.css`, `dist/qahera-themes.css`, and `dist/qahera.css`.
- **Automated GitHub Release Workflow (`.github/workflows/release.yml`):**
  - Continuous integration pipeline verifying 4-stage quality audits and automating GitHub Releases upon git tag pushes (`v*`).

### Fixed
- **Platform Metric Alignment & Cross-Language Dictionaries:**
  - Synchronized canonical counts (45 components, 21 compositional patterns, 20 templates) across English, Arabic, and all supported localization dictionaries.
- **Universal State & URL Query Parameter Synchronization:**
  - Integrated zero-flash `?lang=` parameter hydration in showcase hub, ensuring 100% parity with `sitemap.xml` alternate URLs.

---

## [1.5.2] - 2026-09-17

### React Pattern Parity (21/21), AI Manifest Completeness & Repository Hygiene
> *"Qahera UI Kit v1.5.2 achieves 100% React pattern parity across all 21 UX patterns, restores complete indexing for all 45 canonical components in the AI Decision Layer (`ai/components.yaml`), eliminates duplicate and legacy artifacts, enforces strict TypeScript zero-error typing, and validates 100% compliance across all 4 CI quality stages."*

### Added
- **100% React UX Pattern Parity (`renderers/react/patterns/`):**
  - Engineered 9 missing production React 19 / TSX pattern implementations, reaching full 21/21 parity with canonical YAML specifications:
    - [`ChatStream.tsx`](renderers/react/patterns/ChatStream.tsx): Conversational AI message feed with live streaming indicators, role-based message bubbles, and composer input controls.
    - [`DatePaginator.tsx`](renderers/react/patterns/DatePaginator.tsx): Bidirectional horizontal date strip with active day selection, month/year headers, and navigation chevrons.
    - [`FileManagerGrid.tsx`](renderers/react/patterns/FileManagerGrid.tsx): Cloud asset explorer with folder cards, file metadata rows, and storage quota progress telemetry.
    - [`HeroSkylinePanorama.tsx`](renderers/react/patterns/HeroSkylinePanorama.tsx): Cinematic panorama hero banner with gradient overlays, kicker badges, and dual primary/secondary CTA triggers.
    - [`KanbanBoard.tsx`](renderers/react/patterns/KanbanBoard.tsx): Multi-column agile sprint board with task progression columns, priority badges, assignee avatars, and tags.
    - [`MetricComparisonGrid.tsx`](renderers/react/patterns/MetricComparisonGrid.tsx): Multi-dimensional KPI analytics grid with benchmark comparisons, trend vectors, and percentage deltas.
    - [`Questionnaire.tsx`](renderers/react/patterns/Questionnaire.tsx): Multi-step interactive survey/onboarding assessment flow with selectable choice cards, progress indicators, and response handling.
    - [`SortableList.tsx`](renderers/react/patterns/SortableList.tsx): Reorderable item list with directional step controls, status badges, and drag-handle affordances.
    - [`UserCard.tsx`](renderers/react/patterns/UserCard.tsx): Profile summary card with identity metadata, avatar status, quick telemetry metrics, and contextual action buttons.
  - Updated barrel export in [`renderers/react/patterns/index.ts`](renderers/react/patterns/index.ts) to export all 21 canonical UX patterns.
- **AI Decision Layer Heritage Indexing (`ai/components.yaml`):**
  - Restored entries for 3 heritage components: **Cartouche**, **Frieze**, and **Seal**, bringing total indexed components in the AI manifest to 45 (42 core + 3 heritage).

### Fixed
- **Strict TypeScript Zero-Error Typing:**
  - Resolved `onSelect` prop name collision with `React.HTMLAttributes<HTMLDivElement>.onSelect` in `Questionnaire.tsx`.
  - Enforced canonical controlled vocabulary (`size="sm"`) for Badge, Chip, and Avatar in `KanbanBoard.tsx` to align with strict token types.
- **Repository Hygiene & Duplicate Elimination:**
  - Purged 3 redundant kebab-case preview files from `examples/previews/` (`badge.html`, `button.html`, `card.html`).
  - Purged 17 legacy PascalCase pattern duplicates from `renderers/html/native/patterns/`, standardizing on kebab-case canonical filenames.
- **CSS Manifest Comment Synchronization:**
  - Updated `renderers/html/native/components.css` header comment from 38 to 45 canonical component imports.

---

## [1.5.1] - 2026-09-12

### Sovereign AI Decision Layer (`qahera-ui`), Zero-Install NPX CLI Scaffolding & Multi-Channel Distribution
> *"Qahera UI Kit v1.5.1 delivers the sovereign AI Agent Skill `qahera-ui` (15/15 compliance), full operational parity across 42 components, 20 patterns, and 18 templates, zero-install CLI distribution via `npx qahera-ui`, and automated AI decision layer embedding on project initialization."*

### Added
- **Sovereign AI Decision Layer (`.agents/skills/qahera-ui/`):**
  - High-performance, low-token AI agent skill conforming to all 15 structural rules of `tidyfactor-skill-architect`.
  - 5 operational commands: `/qahera-ui compose` (Dogfooding layout assembly), `/qahera-ui pattern` (UX pattern composition), `/qahera-ui scaffold` (DoD component authoring), `/qahera-ui audit` (15 Invariants verification), and `/qahera-ui theme` (Egyptian cultural topography).
  - 7-Axis Pre-Emit Critique stamp (`/* Pre-emit critique: P5 H5 E5 S5 R5 V5 D5 */`).
  - Categorized Anti-Slop Matrix covering 9 technical domains (Alexandria & Cairo typography, 100% Logical CSS, Zero Emoji `QAHERA-VISUAL-001`).
  - Strict Alpine.js Hydration Protocol (`QAHERA-ALPINE-001`) preventing DOM stalls.
  - Operational memory catalogs: `patterns-catalog.md` (20 canonical patterns), `templates-catalog.md` (18 template tracks), and `cli-tools.md` (7 CLI commands).
  - Two-tier documentation: Canonical English [`README.md`](.agents/skills/qahera-ui/README.md) and native Arabic [`README.ar.md`](.agents/skills/qahera-ui/README.ar.md).
- **Zero-Install CLI Scaffolding (`npx qahera-ui`):**
  - Dual bin aliases configured in `package.json` (`qahera-ui` and `qahera`).
  - `npx qahera-ui init`: Automatically emits `tokens.css`, `components.css`, `qahera.json` project configuration, and embeds `.agents/skills/qahera-ui` directly into the consumer workspace.
  - `npx qahera-ui add`: Supports adding individual components, composite patterns (`pattern:dashboard-stat`), and full application templates (`template:admin`).
  - Complete NPM files whitelist declared in `package.json` for lightweight distribution.

---

## [1.5.0] - 2026-09-07

### Universal Living Showcase Generator v3.0, Grand Interactive Registry Hub & Zero-Defect Preview Engine
> *"Qahera UI Kit introduces Universal Living Showcase Generator v3.0: transforming static component previews into rich, multi-variant interactive playgrounds, restoring the full 78-item Grand Living Registry Hub with 12 Cairo Atlas neighborhood themes, and eliminating tokenizer leaks and dropdown synchronization bugs for a flawless developer experience."*

### Added
- **Universal Living Showcase Generator v3.0 (`cli/generate-previews.js`):**
  - Autonomous CLI preview generation engine emitting 62 rich component and pattern playgrounds + Grand Living Registry Hub (`examples/previews/index.html`).
  - **Showcase Separation Architecture (`examples/showcases/*.html`):** Decoupled preview playgrounds into 43 authoritative showcase files equipped with interactive triggers (`openLiveModal()`, `openLiveDrawer()`, real toast dispatchers, active input validations) instead of raw export-only snippets.
  - Full suite of 11 interactive behavior scripts (`behavior/*.js`) injected with `defer` prior to Alpine.js, guaranteeing zero console errors across all previews.
  - Multi-variant interactive stages supporting 12 Cairo Atlas neighborhood themes, responsive viewport simulation (Desktop, Tablet, Mobile), Day/Night lighting modes, and bidirectional LTR/RTL parity.
- **Grand Interactive Living Showcase Hub (`examples/previews/index.html`):**
  - Restored and elevated the full 78 canonical items matrix across 3 distinct architectural tiers: 40 Components, 20 Patterns, and 18 Application Templates.
  - Instant multi-field fuzzy search engine indexing Arabic display names, English technical IDs, functional categories, tags, and paths with `/` and `Ctrl+K` keyboard shortcuts.
  - Segmented category tabs with live item counters: All (78), Components (40), Patterns (20), Templates (18).
  - Faceted functional category chips filter (Actions, Forms, Navigation, Overlay, Feedback, Analytics, Ecommerce, Media, AI).
  - Dual view modes: High-fidelity 3D Card Grid with elevated surfaces and hover glows vs Compact List view.
  - Dynamic pagination engine with selectable page sizes (12, 24, 48, All) and smooth scroll transitions.
  - Integrated 12 Cairo Atlas neighborhood theme switcher directly in the navbar with active swatch dots and localStorage persistence.

### Fixed
- **Component Picker Dropdown Synchronization (`QAHERA-PREVIEW-001`):**
  - Resolved bug where the header dropdown was statically defaulted to the first item ("Accordion") on every page.
  - Dynamically injects the `selected` attribute per-component and per-pattern, with strict discrimination between identical component and pattern identifiers (e.g. Component `pagination` vs Pattern `Pagination`).
  - Added dual-guard runtime synchronization in `initStage()` matching `window.location.pathname` to override browser bfcache or form persistence.
- **HTML Tokenizer Script Tag Collision & DOM Reading (`QAHERA-PREVIEW-002`):**
  - Resolved browser HTML parser issue where string literals containing `</script>` inside inline `<script>` tags prematurely closed script blocks and leaked raw JavaScript text onto pages (`"; navigator.clipboard.writeText(rawHtml)...`).
  - Replaced script string embedding with direct DOM reading from `<code id="rawComponentSource">` via `textContent` in `copyComponentHtml()`, achieving 100% clean markup and zero script collision risk.
- **Showcase Syntax Integrity:**
  - Repaired truncated template and unclosed script block in `examples/showcases/toast.html`, ensuring 100% matched script tags across all 67 preview and showcase documents.

---

## [1.4.0] - 2026-09-07

### Sovereign Cairo Studio, Cultural Neighborhood Refinement & Dual-Target Export Suite
> *"Qahera UI Kit delivers a production-grade Theme Studio with responsive viewport simulation, strict architectural token adherence, cultural neighborhood recalibration (Royal Egyptian Green for El-Marg, Classic Azure for El-Zeitoun, Champagne Pearl & Obsidian for Zamalek), and a dual-target Canonical vs Custom developer export engine."*

### Added
- **Sovereign Theme Studio Header Architecture (`examples/previews/ThemeStudio.html`):**
  - Responsive Viewport Switcher simulating Desktop (100%), Tablet (768px), and Mobile (390px) directly on the component stage.
  - Focus Mode toggle allowing developers to collapse the controls sidebar to inspect responsive component grids in full width.
  - Unified action bar streamlining fragmented export triggers into a single primary CTA («تصدير الكود»).
- **Strict Canonical Radius Matrix Alignment & 100% Component Compliance:**
  - Mapped studio radii sliders directly to authoritative tokens (`--qhr-radius-xl`, `--qhr-radius-lg`, `--qhr-radius-md`, `--qhr-radius-sm`, `--qhr-radius-xs`).
  - Selecting `0px` radius now guarantees 100% razor-sharp edges across cards, buttons, inputs, selects, badges, checkboxes, switches, tables, and progress bars without exception (essential for Neo-Brutalist archetypes like Shubra).
- **Independent Border Width vs Spacing Density Customization:**
  - Dedicated **Border Width** stroke controller (`0px` to `4px`) isolated with `box-sizing: border-box !important` to eliminate physical footprint shifts and size inflation.
  - Dedicated **Padding & Spacing Density** token engine with 4 levels: Compact (`0.8x`), Default (`1.0x`), Spacious (`1.25x`), and Luxury (`1.5x`), dynamically governing cards, buttons, inputs, badges, and tables.
  - Dedicated **Elevation & Depth Level** controller (Flat, Subtle, Elevated, Floating).
- **Dual-Target Multi-Format Export Engine (Canonical Package vs Custom Developer Preset):**
  - **Canonical Official Mode:** Exports the authoritative Qahera UI Kit neighborhood theme specification (`@qahera/theme-*`).
  - **Custom Developer Preset Mode:** Enables custom theme metadata input (Theme Name, Slug/ID, Author) and emits standalone, decoupled code across CSS Tokens (`qahera-[custom-id].css`), YAML 1.2 Specification (`[custom-id].yaml`), Tailwind Configuration (`tailwind.config.js`), and W3C JSON Tokens (`[custom-id]-tokens.json`) with direct one-click file downloading.
- **Master Showcase & Registry Synchronization (`examples/previews/index.html`):**
  - Linked `tokens/themes/themes.css` into the master registry hub and dynamically cascaded the 11 neighborhood themes across page surfaces, navbar, cards, tags, and focus states via authoritative `--qhr-*` tokens.
  - Integrated the 11 Cairo Neighborhood themes subbar with live reactive switching, swatch indicators, and resilient local storage persistence.
  - Added dual-mode light/dark parity across all showcase elements, respecting both `[data-mode]` and `[data-theme]`.
  - Added a prominent direct link in the showcase navbar to `ThemeStudio.html`.

### Changed
- **Recalibrated Archetype 10: El-Marg (`el-marg` in `cairo-atlas.yaml`, `themes.css`, `ThemeStudio.html`):**
  - Re-anchored the neighborhood identity to its historical etymology: the Royal Meadows & Estates of the Muhammad Ali Dynasty on the northeastern gateway of Cairo.
  - Established the authentic palette: **Royal Egyptian Flag Green** (`#0E5E3A` day / `#158052` night) and **Embroidered Royal Gold** (`#D4AF37` / `#E5B83B`) inspired by the Kingdom of Egypt royal flag and embroidered crown insignia.
  - School: `Khedivial Royal Meadows & Dynasty Estates`.
- **Recalibrated Archetype 9: El-Zeitoun (`el-zaytoun` in `cairo-atlas.yaml`, `themes.css`, `ThemeStudio.html`):**
  - Completely discarded the superficial and inaccurate "olive green" palette.
  - Re-anchored the neighborhood to its authentic 20th-century residential identity as a prestigious garden suburb of classic villas: **Cairo Classic Azure** (`#1D4ED8` day / `#3B82F6` night) paired with **Sandstone Amber** (`#D97706` / `#F59E0B`).
  - School: `Suburban Aristocratic Villas & Classic Heritage`.
- **Redesigned Archetype 1: Zamalek (`zamalek` in `cairo-atlas.yaml`, `themes.css`, `ThemeStudio.html`):**
  - Transformed from generic green/gold to the distinguished **Island Embassies & Diplomatic Mansions** aesthetic.
  - Established the new authoritative palette: **Champagne Pearl & Obsidian Black** (`#FBF9F5` day ivory, `#FFFFFF` marble surface, `#18181B` obsidian primary / `#09090B` night obsidian, `#121216` dark marble, `#E5C378` antique champagne gold) with frosted glass and gilded trims.
  - School: `Diplomatic Mansions & Champagne Pearl Obsidian`.

### Fixed
- **Showcase Index `savedDir` ReferenceError & `file:///` Storage Isolation:** Declared `savedDir` properly in `examples/previews/index.html` and wrapped storage operations with defensive `safeStorageGet`/`safeStorageSet` helpers to prevent crashes when loading via strict local `file:///` security origins.
- **Sidebar Scroll Clipping Bug in ThemeStudio:** Replaced overflowing outer container with a fixed, 100% opaque tabs header and dedicated internal scroll container (`.sidebar-content-area`), eliminating content bleed behind navigation tabs.
- **Windows Browser Scrollbar & Slider Polish:** Replaced raw default range inputs and OS arrow scrollbars with custom 6px pill-track sliders, gold thumbs with scale animations, and sleek 5px rounded scrollbars.

---

## [1.3.0] - 2026-09-07

### Cairo Design Atlas (11×8 Matrix), Dual-Mode Architecture & Sovereign Theme Studio
> *"Qahera UI Kit transitions from a cosmetic color switcher to a profound Cultural Design System: The Cairo Design Atlas — 11 neighborhood archetypes across 8 design dimensions with dual Day & Night lighting modes."*

### Added
- **Cairo Design Atlas Specification (`tokens/themes/cairo-atlas.yaml`):**
  - Standardized the 11 Cairo Archetypes across 8 fundamental design dimensions:
    1. `zamalek` (الزمالك): Cosmopolitan Art Deco & Emerald Island.
    2. `downtown` (وسط البلد): Khedivial Classical & Editorial Swiss.
    3. `heliopolis` (هليوبوليس): Art Deco & Neo-Pharaonic Sandstone.
    4. `maadi` (المعادي): Organic Botanical & Serene Earth.
    5. `roxy` (روكسي): Egyptian Retro / Y2K / Neon Glow.
    6. `sakakini` (السكاكيني): Italian Gothic & Rococo Palace.
    7. `el-hussein` (الحسين): Islamic Heritage & Historic Cairo.
    8. `shubra` (شبرا): Vibrant Neo-Brutalism & Urban Energy.
    9. `el-zaytoun` (الزيتون): Olive Heritage & Cosmopolitan Serenity.
    10. `el-marg` (المرج): Raw Materiality & Industrial Terracotta.
    11. `new-cairo` (القاهرة الجديدة): Glassmorphism & High-Tech Smart City.
- **Thematic Topography Dual-Mode Stylesheet (`tokens/themes/themes.css` & `dist/qahera-themes.css`):**
  - Complete dual-mode CSS custom properties for all 11 Cairo archetypes (`[data-theme="..."][data-mode="dark|light"]`).
  - Injected universal archetype FX utilities: `.fx-scanlines`, `.fx-grain`, `.fx-glass`, `.fx-glow`, `.fx-hard-shadow`.
- **Cairo Design Atlas Studio (`examples/previews/ThemeStudio.html`):**
  - Interactive studio built with 100% Qahera UI Kit canonical components and Alpine.js.
  - 11 Archetype navigation selector pills with active indicator dots.
  - High-fidelity Lumina-grade glassmorphic KPI cards with multi-stop glowing SVG sparklines.
  - Exclusive Roxy Retro / Y2K interactive control pod with neon glow, pixel vibes, and scanline effect toggle.
  - Interactive 8-Dimension tuning controllers (Base Colors, Radii, Borders, FX, Motion, Density).
  - 1-Click Code Exporter for instant production CSS and YAML tokens.
- **Showcase Registry Synchronization (`examples/previews/index.html`):**
  - Synchronized `themesList` dropdown with the 11 Cairo Archetypes.

---

## [1.2.0] - 2026-09-07

### Thematic Topography, Egyptian Cultural Archetypes & Sovereign Theme Studio Roadmap
> *"Qahera UI Kit elevates multi-theming from generic superficial colors to a rigorous synthesis of Global Design Movements and Egyptian Architectural Topography."*

### Added
- **Architectural Governance Invariant 15 (`QAHERA-THEME-001` in `AGENTS.md`):**
  - Formally codified that themes must NEVER be arbitrary abstract names (e.g. `theme-blue`, `cool-dark`) or cosmetic labels.
  - Every theme strictly synthesizes a recognized global design movement (Art Deco, Belle Époque, Neo-Brutalism, Modern Minimalist, Vernacular Claymorphism, Desert Raw Materiality) with an authentic Egyptian cultural, architectural, or urban context.
  - 100% semantic token override purity in `tokens/themes/*.yaml` via `[data-theme="..."]` with zero component contract drift and zero physical CSS.
- **Flagship Egyptian Urban & Regional Theme Library (8 New YAML Sources in `tokens/themes/`):**
  1. `heliopolis-deco` (`tokens/themes/heliopolis.yaml`): Art Deco & Neo-Pharaonic Revival (Baron Empain sandstone ochre, Korba stepped geometry, 4px box radius).
  2. `downtown-classic` (`tokens/themes/downtown.yaml`): Belle Époque & Neoclassical Editorial (Khedivial antique marble ivory, aged brass, heritage crimson, 6px box radius).
  3. `new-cairo-tech` (`tokens/themes/new-cairo.yaml`): Ultra-Modern Glassmorphism & High-Tech (Deep cyber slate, electric cyan, frosted translucent surfaces, 16px box radius, pill selectors).
  4. `maadi-botanical` (`tokens/themes/maadi.yaml`): Organic Earth & Botanical Minimal (Degla limestone linen, serene eucalyptus & sage, natural earth taupe, 14px box radius).
  5. `shubra-pop` (`tokens/themes/shubra.yaml`): Vibrant Pop & Neo-Brutalism (High-contrast festive crimson, amber saffron, bold 2px pitch-black borders, 2px radius).
  6. `nubian-vernacular` (`tokens/themes/nubia.yaml`): Vernacular Claymorphism & Organic Adobe (West Suhail cobalt blue, Nile silt terracotta, sun yellow, 20px organic curves).
  7. `sinai-mineral` (`tokens/themes/sinai.yaml`): Desert Mineral & Raw Materiality (Starry midnight indigo, sand dune amber, St. Catherine rose granite, 8px mineral cuts).
  8. `cairo-azure` (`tokens/themes/cairo-azure.yaml`): Islamic Geometric & Heritage Azure (Al-Mu'izz lapis lazuli deep blue, mosque dome turquoise, pierced lantern brass, 10px arabesque symmetry).
- **Unified Thematic Topography Stylesheet (`tokens/themes/themes.css`):**
  - Complete CSS custom property overrides for all 9 architectural presets supporting both component tokens (`--qhr-*`) and showcase variables (`--q-*`).
- **Interactive Architectural Theme Picker Dropdown in Showcase (`examples/previews/index.html`):**
  - Dropdown selector featuring real-time swatch preview dots, Arabic cultural names, global design movement subtitles, and active state indicators.
  - Full keyboard accessibility and click-outside dismissal (`@click.outside="themeMenuOpen = false"`).
  - Preserved quick 1-click day/night toggle icon alongside the theme picker.
- **Theme Studio Generator Specification in `ROADMAP.md` (Phase 5 & Work Package F):**
  - Detailed architecture for interactive theme generator (daisyUI-style) with Base Colors, Semantic Roles, Radius Matrix (Boxes/Fields/Selectors), Effects (Depth 3D, Noise), Proportional Sizing, and Border Width sliders.
- **Atomic Knowledge Item in `tidyfactor-brain`:**
  - Persisted `KI-Qahera-Thematic-Topography.md` under `alwkala` project scope.

---

## [1.1.0] - 2026-09-07

### Master Showcase, Hydration Protocol, Smart Pagination & Architectural Governance
> *"Qahera UI Kit achieves full canonical composition, 100% reliable Alpine.js hydration, high-performance client pagination, and universal registry indexing."*

### Added
- **Canonical Pagination Component (39th Registered Component with 6 Styled Variations):**
  - Fully established first-class `Pagination` component across all 6 targets: Contract (`contracts/components/Pagination.yaml`), Recipe (`recipes/Pagination.yaml`), atomic modular CSS (`renderers/html/native/components/pagination.css`), Native HTML (`renderers/html/native/Pagination.html`), Tailwind (`renderers/html/tailwind/Pagination.html`), React RSC (`renderers/react/Pagination.tsx`), PHP Plates (`renderers/php/plates/Pagination.php`), and Vanilla Web Component (`renderers/js/components/qhr-pagination.js`).
  - **6 Rich Styled Variations Inspired by shadcn/ui & Elevated for MENA Luxury:**
    1. `default`: Standard elevated luxury glass bar with summary, controls, and size selector.
    2. `outline`: High-contrast card-bordered container (`qhr-pagination--outline`) with elevated borders and soft shadow.
    3. `pills`: Fully rounded capsules (`qhr-pagination--pills`) with circular numeric indicators.
    4. `segmented`: Joined button group strip (`qhr-pagination--segmented`) with fused pill borders.
    5. `ghost`: Borderless minimal styling (`qhr-pagination--ghost`) seamlessly embedded into data tables.
    6. `compact` & `icons-only`: Space-constrained stepper triggers for dense dashboards.
  - **Headless & Composable React Primitives:** Exported `<Pagination>`, `<PaginationContent>`, `<PaginationItem>`, `<PaginationLink>`, `<PaginationPrevious>`, `<PaginationNext>`, `<PaginationFirst>`, `<PaginationLast>`, `<PaginationEllipsis>`, and `<PaginationSummary>`.
  - Strict 100% Logical CSS styling with zero physical properties, responsive desktop-to-mobile flex layout, high-contrast states, and bidirectional icon rotations (`[dir="rtl"] .qhr-pagination__icon-prev/next { transform: rotate(180deg); }`).
  - Production bundle `dist/qahera.css` updated to 177.95 KB (23.91 KB gzip), strictly adhering to performance budgets.
- **Smart Client-Side Pagination & DOM Optimization (`patterns/pagination.yaml` Dogfooding):**
  - High-performance slice rendering (`paginatedItems`) eliminating excessive DOM nodes and guaranteeing instantaneous 0ms first-load and silky filter performance even with hundreds of items.
  - Interactive pagination navigation bar (`qhr-pagination`) with responsive previous/next buttons, dynamic windowed page numbering with ellipsis (`1, 2, 3, ..., 7`), and live range boundary text (`عرض 1 إلى 12 من أصل 78`).
  - Integrated page-size selector (`12`, `24`, `48`, or `الكل`) defaulting to 12 items (optimal for 3/4-column responsive card grids).
  - Smooth stage scrolling (`stage.scrollIntoView({ behavior: 'smooth', block: 'start' })`) upon page jumps and automatic reset to Page 1 on filter or search mutation.
- **Master Showcase & Registry Hub (`examples/previews/index.html`):**
  - World-class interactive catalog indexing all **78 canonical items** (39 components, 20 UX patterns, 18 application templates).
  - Instant reactive search by Arabic name, English identifier, description, category, and tags with keyboard shortcuts (`/`, `Ctrl+K`, `Escape`).
  - Segmented control category tabs (`qhr-tabs--segmented`) and functional category chips (`qhr-chip`).
  - Dual view modes: Elevated Cards Grid (`grid`) and Developer Tabular View (`list`) with 1-click clipboard identifier copying.
  - Strict icon-only theme toggle button (Sun/Moon SVGs without text) and full RTL/LTR bidirectional toggle.
- **Architectural Governance Invariants in `AGENTS.md`:**
  - **Invariant 13 (`QAHERA-COMP-001`):** Mandatory dogfooding and canonical composition requirement across all previews and templates. Ad-hoc utility classes strictly prohibited.
  - **Invariant 14 (`QAHERA-ALPINE-001`):** Alpine.js hydration and template integrity protocol banning attribute collisions, enforcing 100% globally unique template keys, prohibiting interactive descendants inside anchor wrappers, and eliminating nested `x-for` templates.

### Fixed
- **Alpine.js Initial Hydration Stall in Showcase:**
  - Resolved initial-load blank cards issue caused by duplicate `:key` collisions (`Questionnaire` component vs pattern) by generating unambiguous unique keys (`uniqueKey`).
  - Resolved HTML5 interactive descendant violation by migrating card root from `<a>` to `<article>`, preventing the browser HTML parser from splitting tags and breaking Alpine's single-root `<template x-for>` invariant.
  - Replaced nested `<template x-for>` for card tags with atomic helper rendering `x-html="renderTags(item.tags)"`.
  - Initialized array states with shallow copies (`[...DATA]`) and synchronized filters via `this.$nextTick()` inside `init()`.
- **Attribute Escaping Collision:**
  - Migrated extensive Alpine state and dataset out of inline HTML attributes (`x-data="{...}"`) into clean, decoupled `Alpine.data('registryApp', ...)` within `<script>` tags.

---

## [1.0.0] - 2026-09-06

### Major Architecture Milestone
> *"Qahera gives AI a structured visual vocabulary for building consistent interfaces."*

### Added
- **Token Specification v1.0 ([`docs/01-TOKEN-SPEC.md`](docs/01-TOKEN-SPEC.md)):**
  - Canonical 3-tier taxonomy: primitives, semantic intents, component bindings, and theme overrides (`default.yaml`, `dark.yaml`).
  - Zero-dependency recursive token reference resolver (`cli/token-resolver.js`) resolving 225 tokens across CSS variables, JSON, and Tailwind presets with circular dependency protection.
- **Component Specification v1.0 ([`docs/02-COMPONENT-SPEC.md`](docs/02-COMPONENT-SPEC.md)):**
  - Contract-first architecture enforcing PascalCase canonical component naming.
  - Authored all 18 canonical component contracts in `contracts/components/*.yaml` with detailed semantic anatomy, controlled slots (`start`, `default`, `end`), keyboard focus trap specs, and 4-dimensional AI decision matrix (`contracts/ai-decision-matrix.yaml`).
  - Strict validation schema (`schemas/component.schema.yaml`).
- **Recipe Specification v1.0 ([`docs/03-RECIPE-SPEC.md`](docs/03-RECIPE-SPEC.md)):**
  - Deterministic visual translation connecting contracts to tokens.
  - Authored `cli/recipe-compiler.js` resolving token references and building normalized style models in `generated/manifests/recipes.json`.
  - Enforced deterministic state cascade: `base -> variant -> size -> tone -> state` with state priority: `disabled > loading > invalid > selected > hover > focus`.
  - All 18 component recipes in `recipes/*.yaml` updated to v1.0 with rich AI metadata (`intent`, `visual_role`, `density`, `preferred_when`, `avoid_when`).
- **Documentation & Context Synchronization:**
  - Updated `README.md`, `VERSION`, `.tidyfactor/integration.yaml`, and `ai/*.yaml` manifests to reflect canonical v1.0 readiness.

---

## [0.1.0] - 2026-09-06

### Added
- Canonical specification (`SPEC.md`) and AI Agent governance rules (`AGENTS.md`).
- Established YAML-First architecture across tokens, contracts, and recipes.
- 3-tier token taxonomy (`tokens/`): colors, typography, spacing, radius, shadows, motion, z-index, and compiled `tokens.css`.
- Core contracts (`contracts/`): component metadata, controlled variant vocabulary, interaction states, accessibility, and slots.
- 18 canonical component recipes (`recipes/`) with AI-native metadata (WHAT, WHEN, HOW, WHY NOT).
- 8 framework-free interactive behavior modules (`behavior/`) powered by Alpine.js.
- Multi-target renderers starter (`renderers/`): HTML (Native/Tailwind), PHP (Plates), HTMX, and React.
- AI progressive disclosure manifests (`ai/`).
- Token & recipe compilation pipeline in `cli/`.
- Interactive bilingual LTR/RTL kitchen-sink demo (`examples/html/index.html`).
