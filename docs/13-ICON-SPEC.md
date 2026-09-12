# 13. ICON-SPEC: Canonical SVG Icon Library & Performance Architecture

**Status:** Canonical Subordinate Specification  
**Authority:** QAHERA-SPEC §42 · Invariant 11 (`QAHERA-VISUAL-001`)  
**Milestone:** v1.6.0 (Sovereign SVG Icon Engine)

---

## 1. Architectural Mission

The **Qahera SVG Icon Engine** provides an authoritative, ultra-lightweight, and semantically governed vector iconography layer. It replaces ad-hoc SVGs, heavy icon fonts, and unverified Unicode/emojis with a deterministic, multi-target vector catalog.

### Open-Source Curated Lineage
To maintain world-class visual consistency and mathematical precision without reinventing base primitives, Qahera harmonizes vector geometry curated from premier permissive open-source libraries:
* **[Lucide Icons](https://lucide.dev/) (ISC License):** Gold standard for modern stroke-based UI icons.
* **[Heroicons](https://heroicons.com/) (MIT License):** Tailwind Labs benchmark for clean interface geometry.
* **[Tabler Icons](https://tabler.io/icons) (MIT License):** Comprehensive coverage for enterprise, commerce, and file formats.

---

## 2. Geometric & Rendering Invariants

Every icon admitted into `icons/registry.yaml` must strictly satisfy the 7 geometric constraints:

1. **Fixed ViewBox:** `viewBox="0 0 24 24"` (all coordinates bounded to the 24x24 grid).
2. **Uniform Stroke Width:** `stroke-width="2"` with proportional CSS scaling down to 12px and up to 32px.
3. **Stroke-First Rendering:** `fill="none"` and `stroke="currentColor"`.
4. **Smooth Caps & Joins:** `stroke-linecap="round"` and `stroke-linejoin="round"`.
5. **Ultra-Lightweight Weight Budget:** Optimized via SVGO to achieve **$< 400\text{ bytes}$** per SVG path.
6. **Zero Unicode / Zero Emoji:** Total enforcement of `QAHERA-VISUAL-001` (emojis and icon fonts are strictly prohibited).
7. **No Arbitrary Classes:** Styling is inherited strictly via `color` and `--qhr-color-*` tokens.

---

## 3. Logical Directional Icons (RTL/LTR Mirroring)

Asymmetric directional icons MUST use logical directional naming:

| Logical Icon Name | LTR Visual Direction | RTL Visual Direction | Use Case |
|---|---|---|---|
| `arrow-start` | Left arrow ($\leftarrow$) | Right arrow ($\rightarrow$) | Return to previous page / Back |
| `arrow-end` | Right arrow ($\rightarrow$) | Left arrow ($\leftarrow$) | Advance to next step / Forward |
| `chevron-start` | Chevron Left ($<$) | Chevron Right ($>$) | Previous pagination / collapse |
| `chevron-end` | Chevron Right ($>$) | Chevron Left ($<$) | Next pagination / expand |
| `step-forward` | Advances rightward | Advances leftward | Workflow stepper progression |
| `step-back` | Regresses leftward | Regresses rightward | Workflow stepper regression |

*Implementation: Mirrored automatically via CSS logical transforms:*
```css
[dir="rtl"] .qhr-icon--dir-mirror {
  transform: scaleX(-1);
}
```

---

## 4. Multi-Target Compilation Pipeline

The single source of truth is strictly YAML: `icons/registry.yaml`.  
Running `node cli/build-icons.js` automatically synchronizes all 5 renderer tracks:

```text
                                icons/registry.yaml
                         (Canonical YAML Single Source of Truth)
                                         │
                   ┌─────────────────────┼─────────────────────┐
                   ▼                     ▼                     ▼
          renderers/react/       renderers/php/        renderers/js/
             Icon.tsx            plates/icon.php        qhr-core.js
          (React 19 TSX)         (League/Plates)      (Web Components)
                   │                     │                     │
                   └─────────────────────┼─────────────────────┘
                                         ▼
                             renderers/html/native/
                                   icons.svg
                               (SVG Sprite Sheet)
```

1. **React 19 / TypeScript (`renderers/react/Icon.tsx`):**
   - Emits strict union types: `export type QaheraIconName = 'search' | 'menu' | ...;`
   - 0kb client overhead via Server Components rendering SVG paths directly.
2. **PHP 8.x League/Plates (`renderers/php/plates/icon.php`):**
   - Associative array path lookup with `$this->qhrIcon('search', 20)` shorthand.
3. **Vanilla JS Web Components (`renderers/js/qhr-core.js`):**
   - Self-registering `<qhr-icon name="search" size="20">` component.
4. **Native Static HTML (`renderers/html/native/icons.svg`):**
   - High-performance SVG `<use href="icons.svg#search" />` symbol sprite sheet.

---

## 5. Developer Experience & CLI Scaffolding

Developers can search and cherry-pick icons directly without installing multi-megabyte icon packages:

```bash
# Search available icons by keyword or category
node bin/qahera.js icons:search payment

# Add single SVG icon directly to project directory (0kb waste)
node bin/qahera.js icons:add credit-card --dest=./icons

# Recompile multi-target icon files after adding custom icons
node bin/qahera.js icons:build
```

---

*Authored by **Alwkala** Studio Architecture Team. © 2026 Alwkala. Distributed under the MIT License.*
