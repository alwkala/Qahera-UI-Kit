# 11. GOVERNANCE: Semantic Versioning & Architectural Stewardship

**Status:** Canonical Subordinate Specification  
**Authority:** QAHERA-SPEC §52, §53, §54  

---

## 1. SemVer Rules for Design Systems

* **PATCH (e.g. 0.1.1):** Bug fixes in CSS recipes, accessibility fixes, renderer template corrections without altering prop names or token names.
* **MINOR (e.g. 0.2.0):** Introducing a new component recipe, adding an optional non-breaking variant or slot, adding a new framework renderer.
* **MAJOR (e.g. 1.0.0):** Breaking changes to `contracts/`, removing or renaming a component, renaming a token or prop key.

---

## 2. Gatekeeping Checks Before Release

No release tag is cut unless:
1. `contracts/` and `recipes/` have 100% naming parity.
2. `tokens.css` passes validation with zero undeclared CSS custom properties.
3. Every interactive component passes keyboard navigation and screen-reader tests.
4. LTR and RTL visual parity is verified across all 18 components.
