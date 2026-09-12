# Operational Memory: Native CLI Tools & Compiler Reference

<!-- last-verified: 2026-09-12 -->

The Qahera UI Kit repository provides a native Node.js CLI entrypoint at `bin/qahera.js`, invocable locally as `qahera` or globally via `npx qahera-ui`. This document specifies all available commands, their parameters, and operational use cases.

---

## Command Reference

### 1. `npx qahera-ui init` (or `qahera init`)
- **Purpose**: Scaffolds Qahera in an external consumer project.
- **Operations Performed**:
  - Emits `tokens.css` with all `--qhr-*` custom properties.
  - Emits `components.css` with baseline component styles.
  - Generates `qahera.json` configuration in the project root with target and path aliases.
  - Embeds `.agents/skills/qahera-ui` into the consumer project, equipping coding agents (Antigravity, Cursor, Claude Code) with the AI Decision Layer.
- **Usage**:
  ```bash
  npx qahera-ui init --target=react
  npx qahera-ui init --target=php --dest=./views/qahera
  ```

### 2. `npx qahera-ui add <items...>` (or `qahera add`)
- **Purpose**: Copies component, pattern, or template source code directly into a consuming project (`renderers/` source files), following the **shadcn-style** source ownership model.
- **Usage**:
  ```bash
  # Individual components
  npx qahera-ui add button modal input --target=react
  npx qahera-ui add navbar dropdown --target=php --dest=./views/qahera
  
  # Canonical UX patterns
  npx qahera-ui add pattern:dashboard-stat --target=react
  npx qahera-ui add pattern:data-table-toolbar --target=php
  
  # Production application templates
  npx qahera-ui add template:admin --target=react
  npx qahera-ui add template:auth --target=php
  ```
- **Flags**:
  - `--target=<target>`: Target renderer (`react`, `php`, `html`, `htmx`, `js`).
  - `--dest=<path>`: Custom destination directory.
  - `--overwrite`: Overwrites existing files.
  - `--all`: Adds all 42 canonical components.

### 3. `npx qahera-ui list` (or `qahera list` / `ls`)
- **Purpose**: Prints the complete canonical registry of 42 components, 20 patterns, and 18 templates.

### 4. `npx qahera-ui build` (or `qahera build`)
- **Purpose**: Runs the 8-stage compiler pipeline:
  1. Discover: Scans contracts, recipes, patterns, icons.
  2. Parse: Validates YAML syntax.
  3. Normalize: Canonical IDs and names.
  4. Validate: Invariant enforcement.
  5. Resolve: Cross-references & behaviors.
  6. Register: Builds canonical registry.
  7. Generate: Emits component JSONs & `registry.json`.
  8. Report: Build stats and diagnostics.

### 5. `npx qahera-ui build:css`
- **Purpose**: Compiles all atomic component stylesheets from `renderers/html/native/components/*.css` into the consolidated distribution bundle `dist/qahera.css`.

### 6. `npx qahera-ui validate` (or `qahera validate`)
- **Purpose**: Fast, read-only validation. Executes stages 1–5 without mutating or writing generated files to disk.

### 7. `npx qahera-ui test` (or `qahera test` / `audit`)
- **Purpose**: The supreme CI quality gate. Executes 4 automated test stages:
  - Stage 1: Compiler Schema & Invariant Validation (42 contracts, 42 recipes, 20 patterns, 41 icons).
  - Stage 2: WCAG 2.1 AA Accessibility & Color Contrast (4.5:1 / 3:1).
  - Stage 3: Performance Budgets & RSC 0kb Client Footprint verification.
  - Stage 4: Strict RTL/LTR Parity & 100% Logical CSS enforcement.
