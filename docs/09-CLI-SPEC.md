# 09. CLI-SPEC: Developer & Compiler Tooling Architecture

**Status:** Canonical Subordinate Specification  
**Authority:** QAHERA-SPEC §22, §40  

---

## 1. Scope Boundary

The **Qahera CLI** (`qahera`) is intentionally focused and lightweight:
- **Discover:** Search and inspect components, tokens, and recipes.
- **Copy / Add:** Add component source files directly to a project (shadcn-style).
- **Compile:** Read YAML tokens & recipes and generate `tokens.css`, `brand.json`, `tailwind.preset.js`, and manifests.
- **Validate:** Verify YAML files against JSON/YAML schemas.

Broader AI environment orchestration and workspace switching remain the exclusive domain of the TidyFactor CLI.

---

## 2. Command Set

```bash
# Initialize Qahera tokens and behavior in a project
qahera init

# Add a specific component (recipes + renderers + behavior)
qahera add button
qahera add modal

# Inspect a component contract and tokens
qahera inspect button

# Validate schemas and contracts
qahera validate

# Re-compile tokens and manifests
qahera compile
```
