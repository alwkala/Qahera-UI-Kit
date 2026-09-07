# 04. BEHAVIOR-SPEC: Client-Side Interactive Engine

**Status:** Canonical Subordinate Specification  
**Authority:** QAHERA-SPEC §26, §27  
**Engine:** Framework-Free Vanilla / Alpine.js Factory Modules  

---

## 1. Zero-Build Behavior Invariant

Server-rendered tracks (HTML, PHP/Plates, HTMX) must not require a Node.js bundler runtime in production.

All behavior files in `behavior/*.js` are authored as standalone Alpine.js `Alpine.data()` factory extensions that:
- Have zero external dependencies beyond Alpine.js core.
- Are copied verbatim into consuming projects.
- Adhere strictly to W3C WAI-ARIA Authoring Practices Guide (APG).

---

## 2. The 11 Interactive Behavior Modules

1. **`behavior/dropdown.js`** (`qhrDropdown`): Click-outside listener, Escape key dismissal, keyboard arrow navigation, focus management.
2. **`behavior/modal.js`** (`qhrModal`): Focus trap, scroll lock (`overflow: hidden`), Escape key closure, restoring initial focus.
3. **`behavior/tabs.js`** (`qhrTabs`): Arrow key navigation (`Home`/`End`, ArrowLeft/ArrowRight based on document direction), automatic/manual tab activation.
4. **`behavior/accordion.js`** (`qhrAccordion`): Collapsible accordion items, single or multi-expand modes, ARIA-expanded sync.
5. **`behavior/tooltip.js`** (`qhrTooltip`): Hover and focus triggers, delay timers, safe screen-edge positioning.
6. **`behavior/toast.js`** (`qhrToast`): Global toast bus, stacking manager, auto-dismiss timeout with pause-on-hover.
7. **`behavior/select.js`** (`qhrSelect`): Custom accessible combobox/select with searchable options and keyboard navigation.
8. **`behavior/navbar.js`** (`qhrNavbar`): Mobile responsive hamburger toggle, backdrop dismissal, keyboard trap for mobile navigation drawer.
9. **`behavior/back-to-top.js`** (`qhrBackToTop`): Scroll depth monitor (default 400px threshold) with smooth viewport return.
10. **`behavior/canvas-sparks.js`** (`qhrCanvasSparks`): Lightweight gold metallic particles simulation on HTML canvas with RAF cycle and auto-pause on theme switch.
11. **`behavior/preloader.js`** (`qhrPreloader`): Cinematic splash/loading progression with simulated progress, percentage counter, and smooth opacity dismissal.

---

## 3. React Boundary Rule

The React renderer (`renderers/react/`) does **NOT** consume `behavior/*.js`. React components implement their own state hooks (`useState`, `useRef`, `useId`) because Alpine and React must never compete over DOM node ownership.
