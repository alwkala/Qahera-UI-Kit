# Contributing to Qahera UI Kit

Thank you for your interest in contributing to **Qahera UI Kit**.

Whether you are a human developer, design system architect, or AI coding agent, this guide explains how to propose, modify, and test components within this repository.

---

## 1. Governing Rules (The Contract-First Law)

1. **Never edit a generated renderer directly** to fix a styling or semantic issue. Fix the `tokens/`, `contracts/`, or `recipes/` YAML source, then regenerate.
2. **Never hardcode visual values** (hex codes, pixel margins/paddings, durations). Use `--qhr-*` tokens.
3. **Never break RTL/LTR parity.** Use logical CSS properties (`margin-inline-start`, `padding-inline-end`, `inset-inline-start`).
4. **Follow controlled prop vocabulary:** Only use approved variants (`primary`, `secondary`, `outline`, `ghost`, `link`, `destructive`), sizes (`xs`, `sm`, `md`, `lg`, `xl`), and states.
5. **Honor Arabic typography:** Headings use **El Messiri**, body uses **Tajawal**. Never use **Amiri**.

---

## 2. Component Creation Workflow

To propose and add a new component, follow the strict lifecycle:

```text
1. Idea & Justification → Does it belong to general UI (Qahera) or admin (Alex)?
2. Contract Definition  → Define props, states, slots, and a11y in contracts/
3. Token Mapping        → Verify all needed tokens exist in tokens/
4. YAML Recipe          → Author recipes/<name>.yaml with full AI metadata
5. Behavior (if needed) → Author behavior/<name>.js (Alpine.js factory)
6. Renderers            → Generate/author HTML, PHP, HTMX, and React targets
7. Validation           → Validate YAML schemas and verify LTR/RTL rendering
8. Examples & Docs      → Add showcase to examples/ and update documentation
```

---

## 3. Pull Request Standards

- Ensure all YAML files match schemas in `schemas/`.
- Ensure `cli/compiler.js` compiles without errors.
- Verify that both LTR and RTL display correctly in `examples/html/index.html`.
