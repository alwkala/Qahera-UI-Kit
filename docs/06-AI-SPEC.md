# 06. AI-SPEC: AI Metadata, Progressive Disclosure & Sovereign Agent Skill

**Status:** Canonical Subordinate Specification  
**Authority:** QAHERA-SPEC §31, §32, §33, §34, §35  

---

## 1. Why AI-Native?

Conventional component libraries document code solely for human eyes through visual storybooks.
Qahera is built for human and AI co-engineering. An agent can discover, reason, compose, and validate components deterministically without loading hundreds of source files into its context window.

---

## 2. Progressive Context Hierarchy (Levels 0–4)

```text
Level 0: Index Manifest (ai/components.yaml) & Catalogs
  ↳ Lightweight list of all 42 components, 20 patterns, and 18 templates.
     │
     ▼
Level 1: AI Decision Model (meta block in recipe)
  ↳ WHAT, WHEN, HOW, and WHY NOT. Alternatives and trade-offs.
     │
     ▼
Level 2: Recipe (recipes/<name>.yaml)
  ↳ Structure, tokens, slots, and states.
     │
     ▼
Level 3: Framework Renderer (renderers/<target>/<name>)
  ↳ Code snippet for the exact requested target (HTML, React RSC, PHP, HTMX, JS).
     │
     ▼
Level 4: Real Integration Example (examples/ & templates/)
  ↳ Realistic page context and production layouts.
```

---

## 3. Four-Dimensional AI Decision Model

Every component recipe must provide answers to:
1. **WHAT:** What is this control and what role does it perform?
2. **WHEN:** In what UX scenarios should the agent choose this component?
3. **HOW:** Which props and slots should be bound?
4. **WHY NOT:** When should the agent avoid this component and what should it use instead?

---

## 4. The Sovereign AI Agent Skill (`.agents/skills/qahera-ui/`)

Qahera UI Kit ships with a native, 15-rule compliant AI Coding Agent Skill:
- **Router:** `SKILL.md` (~350 tokens).
- **Commands:**
  - `/qahera-ui compose`: Assembles production-ready screens following Dogfooding (`QAHERA-COMP-001`).
  - `/qahera-ui pattern`: Composes canonical UX units from the 20 pre-built patterns.
  - `/qahera-ui scaffold`: Generates new components following the strict Definition of Done (DoD).
  - `/qahera-ui audit`: Verifies the 15 Non-Negotiable Invariants and runs CI tests.
  - `/qahera-ui theme`: Synthesizes authentic Egyptian cultural/architectural themes (`QAHERA-THEME-001`).
- **Quality Stamp:** All code emissions are pre-evaluated with:
  `/* Pre-emit critique: P5 H5 E5 S5 R5 V5 D5 */`
