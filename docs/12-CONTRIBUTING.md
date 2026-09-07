# 12. CONTRIBUTING: Contributor Standards & Checklist

**Status:** Canonical Subordinate Specification  
**Authority:** QAHERA-SPEC §48, §49, §50, §51  

---

## 1. The Pre-Emit Checklist

Before submitting a new component or modifying an existing one:

- [ ] Does a similar component or variant already exist in Qahera?
- [ ] Has the component contract been defined in `contracts/`?
- [ ] Are all visual values mapped to `--qhr-*` tokens?
- [ ] Are logical properties used for all margins, paddings, and borders?
- [ ] Is accessibility documented (role, ARIA attributes, keyboard interactions)?
- [ ] Is an Alpine.js factory created in `behavior/` (if interactive)?
- [ ] Are all 4 renderers updated (Native HTML, Tailwind HTML, PHP Plates, React TSX)?
- [ ] Does it render flawlessly in both `<html dir="ltr">` and `<html dir="rtl">`?
