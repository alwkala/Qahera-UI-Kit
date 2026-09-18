# Command: audit-template

Runtime entry point for deterministically auditing a downstream application template or webpage against Qahera UI Kit canonical invariants.

## Dispatch

1. Load `../workflows/audit-template.md`
2. Load `../memory/anti-slop-matrix.md`
3. Load `../memory/cli-tools.md`

## Invariants

- **Zero Custom CSS (`QHR-RULE-001`)**: Target directory must contain 0 bytes of custom `.css`, `.scss`, or `.less` stylesheets.
- **Canonical Classes (`QHR-RULE-002`)**: All UI elements must use canonical `.qhr-*` classes exclusively.
- **Zero Emoji (`QAHERA-VISUAL-001`)**: All iconography must reference semantic SVGs. Unicode emojis are strictly prohibited.
- **RTL Logical Properties (`QHR-RULE-004`)**: Physical margin/padding properties are strictly forbidden.
- **Typography Discipline (`QHR-RULE-005`)**: Font "Amiri" is strictly prohibited.
