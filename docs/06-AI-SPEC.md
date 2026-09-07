# 06. AI-SPEC: AI Metadata & Progressive Disclosure Model

**Status:** Canonical Subordinate Specification  
**Authority:** QAHERA-SPEC §31, §32, §33, §34, §35  

---

## 1. Why AI-Native?

Conventional component libraries document code for human eyes through visual storybooks.
Qahera is built for human and AI co-engineering. An agent can discover, reason, compose, and validate components deterministically without loading hundreds of source files into its context window.

---

## 2. Progressive Context Hierarchy (Levels 0–4)

```text
Level 0: Index Manifest (ai/components.yaml)
  ↳ Lightweight list of all components, categories, and one-line summaries.
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
  ↳ Code snippet for the exact requested target.
     │
     ▼
Level 4: Real Integration Example (examples/)
  ↳ Realistic page context.
```

---

## 3. Four-Dimensional AI Decision Model

Every component recipe must provide answers to:
1. **WHAT:** What is this control and what role does it perform?
2. **WHEN:** In what UX scenarios should the agent choose this component?
3. **HOW:** Which props and slots should be bound?
4. **WHY NOT:** When should the agent avoid this component and what should it use instead?
