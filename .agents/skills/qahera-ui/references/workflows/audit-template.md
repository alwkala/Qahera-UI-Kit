# Workflow: Audit Template

Ordered steps to audit a downstream template or page against Qahera UI Kit canonical invariants.

## Step 1: Identify Target Path
1. Identify the template directory to audit (e.g. `templates/fintech-wealth` or `templates/her-story`).
2. Verify that the target directory exists.

## Step 2: Execute Deterministic CLI Audit
Run the native CLI auditor:
```bash
node bin/qahera.js audit:template <target-path>
```

## Step 3: Analyze Compliance Diagnostics
1. If the command exits with code `0`:
   - Template passes all invariants.
2. If the command exits with code `1`:
   - Inspect reported violations:
     - `QHR-RULE-001`: Delete any bespoke `.css` files immediately.
     - `QHR-RULE-002`: Map any unregistered class names back to `.qhr-*` components.
     - `QHR-RULE-007`: Replace raw Unicode emojis with SVGs from `icons/registry.yaml`.
     - `QHR-RULE-004`: Convert physical CSS margins/paddings to logical properties.
   - Refactor the code and re-run until exit code is `0`.

## Validation Checklist

- [ ] Command `node bin/qahera.js audit:template <path>` executed.
- [ ] Auditor returned exit code `0` (COMPLIANT).
- [ ] Zero bespoke `.css` files exist in the template folder.
- [ ] Zero unregistered CSS classes exist in the markup.
- [ ] Zero Unicode emojis exist in the markup.
