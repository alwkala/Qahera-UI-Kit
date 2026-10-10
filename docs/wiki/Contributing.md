# Contributing to Qahera UI Kit

We welcome contributions from engineers, designers, and AI architects who share our commitment to design system rigor and architectural sovereignty.

---

## The Upstream-First Principle (`QAHERA-UPSTREAM-FIRST`)

All components, tokens, and recipes originate in the core kit (`Qahera-UI-Kit`). The official platform website (`c:\wamp64\www\Qahera`) is a downstream consumer. Never write downstream custom components before their contract is authored upstream.

```
Upstream: Qahera-UI-Kit (Contract + Recipe + Token + Tests)
                 │
                 ▼ (node bin/qahera.js sync:downstream)
Downstream: Qahera Platform Website
```

---

## Local Development Workflow

### 1. Prerequisites
* Node.js $\ge 20.x$
* npm $\ge 10.x$
* Git

### 2. Setup
```bash
git clone https://github.com/alwkala/Qahera-UI-Kit.git
cd Qahera-UI-Kit
npm ci
```

### 3. Local Verification Suite
Before committing or opening a PR, run the comprehensive verification pipeline:

```bash
# 1. Typecheck TypeScript contracts and renderers
npm run typecheck

# 2. Build CSS bundles, icons, and IDE custom data
node bin/qahera.js build

# 3. Run full 4-stage quality audit (Schema, A11y, Perf, RTL Parity)
node bin/qahera.js test

# 4. Run fast architectural linter
node bin/qahera.js lint
```

---

## Definition of Done (DoD) for Any Component

A component contribution is accepted only when:
- [ ] Contract is authored in `contracts/components/<name>.yaml` with strict controlled vocabulary.
- [ ] Recipe is defined in `recipes/<name>.yaml` with complete AI metadata (`purpose`, `use_when`, `avoid_when`).
- [ ] Visual properties map 100% to `--qhr-*` design tokens (Zero hardcoded colors or pixels).
- [ ] 100% Logical CSS properties used (`margin-inline-start`, `inset-inline-start`).
- [ ] Zero emoji policy (`QAHERA-VISUAL-001`) strictly upheld.
- [ ] Renderers implemented across all 5 framework targets (`renderers/`).
- [ ] Standalone interactive preview page exists in `examples/previews/<name>.html`.
- [ ] `node bin/qahera.js test` passes with 0 errors and 0 warnings.

---

## Submitting Pull Requests

1. Create a feature branch: `git checkout -b feat/your-feature-name`.
2. Commit with conventional commit messages: `feat(component): add Stepper contract and renderers`.
3. Push to your fork and submit a PR to `main`.
4. GitHub Actions will automatically run:
   * TypeScript typecheck
   * Registry compiler validation
   * WCAG AA accessibility audit
   * CSS bundle size performance budget
   * Logical CSS & Arabic typography discipline
