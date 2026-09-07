# 07. ACCESSIBILITY-SPEC: Universal Accessibility & APG Compliance

**Status:** Canonical Subordinate Specification  
**Authority:** QAHERA-SPEC §44, §47  
**Standard:** WCAG 2.1 AA / W3C WAI-ARIA APG  

---

## 1. Non-Negotiable Accessibility Rules

1. **Semantic HTML First:** Always use native `<button>`, `<a>`, `<input>`, `<dialog>`, etc., before resorting to `role=""` attributes.
2. **Keyboard Focus & Indicators:** Focus rings are never removed (`outline: none` is prohibited without a replacement `--qhr-ring` focus visible state).
3. **Contrast Ratio:** Text on background must achieve at least 4.5:1 for normal text and 3:1 for large text across light and dark themes.
4. **Interactive Overlays:**
   - Modals and Drawers must trap tab focus inside the dialog while open.
   - Pressing `Escape` must close the top-most active overlay.
   - Closing an overlay must restore focus to the triggering element.
5. **Screen Readers:** ARIA states (`aria-expanded`, `aria-hidden`, `aria-selected`, `aria-disabled`) must be kept in sync with DOM reality.
