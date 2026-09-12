# 09. CLI-SPEC: Developer & Compiler Tooling Architecture

**Status:** Canonical Subordinate Specification  
**Authority:** QAHERA-SPEC §22, §40  

---

## 1. Scope Boundary

The **Qahera CLI** (`qahera-ui` / `qahera`) is intentionally focused, deterministic, and lightweight:
- **Zero-Install Invocation:** Executable anywhere via `npx qahera-ui`.
- **Source Code Ownership (shadcn-style):** Add component, pattern, or template source code directly into consumer projects.
- **Project Bootstrapping (`init`):** Emits tokens, stylesheets, `qahera.json` configuration, and automatically embeds the AI Agent Skill (`.agents/skills/qahera-ui`).
- **Compiler Pipeline (`build`):** Runs the 8-stage compiler to build and emit canonical JSON registries.
- **Audit Suite (`test`):** Automated 4-stage QA audit verifying schemas, WCAG 2.1 AA accessibility, RSC 0kb client footprints, and 100% logical CSS parity.

---

## 2. Command Set

```bash
# 1. Initialize project and embed AI Agent Skill
npx qahera-ui init --target=react

# 2. Add canonical component source code
npx qahera-ui add button modal input --target=react
npx qahera-ui add navbar dropdown --target=php --dest=./views/qahera

# 3. Add composite UX patterns
npx qahera-ui add pattern:dashboard-stat --target=react
npx qahera-ui add pattern:data-table-toolbar --target=php

# 4. Add application template blueprints
npx qahera-ui add template:admin --target=react
npx qahera-ui add template:auth --target=php

# 5. List all canonical components, patterns, and templates
npx qahera-ui list

# 6. Run the 8-stage compiler
npx qahera-ui build

# 7. Compile atomic component CSS into bundle
npx qahera-ui build:css

# 8. Execute the 4-stage CI audit suite
npx qahera-ui test
```

---

## 3. Project Configuration (`qahera.json`)

When `npx qahera-ui init` is executed, it establishes the project's single source of truth configuration:

```json
{
  "$schema": "https://qahera.alwkala.com/schema.json",
  "version": "1.5.1",
  "style": "default",
  "theme": "default",
  "target": "react",
  "aliases": {
    "components": "@/components/ui/qahera",
    "styles": "./src/styles/qahera"
  }
}
```
Coding agents and the CLI read this configuration to resolve relative imports and paths adaptively.
