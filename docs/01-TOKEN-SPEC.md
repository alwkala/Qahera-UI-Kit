# Qahera UI Kit

## Token Specification — v1.0

**Status:** Canonical  
**Source Format:** YAML  
**Generated Formats:** CSS, JSON, Tailwind configuration  
**Namespace:** `qhr`  

---

## 1. Purpose

Qahera Design Tokens are the canonical vocabulary for visual decisions across the entire system.

Tokens are not renderer-specific values.

They are semantic design decisions that can be consumed by:

* CSS
* Tailwind
* HTML
* PHP / Plates
* HTMX
* React
* Web Components
* AI agents
* Documentation
* Theme systems
* Visual regression tests

The fundamental rule is:

> **Define visual intent once. Generate implementation-specific representations from it.**

---

# 2. Canonical Source

YAML is the authoritative source.

```text
tokens/
├── primitives.yaml
├── semantic.yaml
├── components.yaml
├── typography.yaml
├── motion.yaml
└── themes/
    ├── default.yaml
    └── dark.yaml
```

Generated artifacts:

```text
generated/
├── tokens.css
├── tokens.json
└── tailwind.preset.js
```

Generated files MUST NOT be manually edited.

---

# 3. Token Layers

Qahera uses three token levels.

```text
Primitive
   ↓
Semantic
   ↓
Component
```

### Primitive

Raw design values.

Examples:

```yaml
color:
  blue:
    500: "#3b82f6"
  slate:
    500: "#64748b"
```

### Semantic

Meaning-based values.

```yaml
color:
  primary:
    value: "{color.blue.600}"
```

### Component

Component-specific decisions.

```yaml
button:
  primary:
    background: "{color.primary.bg}"
```

AI agents SHOULD prefer semantic and component tokens over primitives.

---

# 4. Naming Convention

Canonical internal path:

```text
<category>.<group>.<name>
```

Public CSS variable:

```text
--qhr-<category>-<group>-<name>
```

Examples:

```css
--qhr-color-primary-bg
--qhr-color-danger-fg
--qhr-space-4
--qhr-radius-md
--qhr-shadow-sm
--qhr-text-base
```

---

# 5. Color Tokens

## 5.1 Primitive Palette

Color scales use:

```text
50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
```

The actual palette is defined by the Qahera theme, not by the component renderer.

---

# 6. Semantic Colors

Required semantic roles:

```yaml
color:
  primary:
  secondary:
  neutral:
  success:
  warning:
  danger:
  info:
```

Each role SHOULD provide:

```yaml
color:
  success:
    bg:
    fg:
    border:
    hover:
```

This allows components to consume intent rather than palette names.

---

# 7. Spacing

Canonical spacing tokens:

```text
0, 0-5, 1, 1-5, 2, 2-5, 3, 3-5, 4, 5, 6, 8, 10, 12, 16, 20, 24
```

Public representation:

```css
--qhr-space-0
--qhr-space-1
--qhr-space-2
...
--qhr-space-24
```

Components MUST use spacing tokens rather than arbitrary pixel values.

---

# 8. Radius

Required:

```yaml
radius:
  none:
  xs:
  sm:
  md:
  lg:
  xl:
  pill:
```

Example usage:

```css
border-radius: var(--qhr-radius-md);
```

---

# 9. Typography

Required text scales:

```text
xs, sm, base, lg, xl, 2xl, 3xl, 4xl
```

Typography is composed from:

* font family
* size
* line height
* weight
* letter spacing

Arabic typography MUST remain part of the technical system.

The default Arabic stack uses:

```text
El Messiri (Display / Headings)
Tajawal (Body / Paragraphs)
system fallbacks
```

Amiri is not part of the default Qahera UI typography system.

---

# 10. Motion

Motion tokens MUST be semantic.

```yaml
duration:
  instant:
  fast:
  normal:
  slow:

ease:
  standard:
  entrance:
  exit:
  emphasized:
```

Components MUST NOT independently invent animation timings.

---

# 11. Shadows

Required:

```yaml
shadow:
  xs:
  sm:
  md:
  lg:
  xl:
```

Component recipes consume these tokens.

---

# 12. Dark Mode / Themes

Themes MUST override semantic tokens, not component markup.

```text
Primitive palette
      ↓
Semantic mapping
      ↓
Component
```

Therefore:

```yaml
themes:
  default:
  dark:
```

can change visual appearance without changing component contracts.

---

# 13. RTL Requirements

Token architecture MUST avoid directional assumptions.

Prefer:

```css
margin-inline-start
padding-inline-end
inset-inline-start
border-start-start-radius
```

Avoid:

```css
margin-left
padding-right
left
right
```

unless the property is intentionally physical.

---

# 14. AI Metadata

Every important token MAY expose:

```yaml
meta:
  description:
  intent:
  category:
  aliases:
  avoid_when:
```

Example:

```yaml
primary:
  value: "{color.blue.600}"

  meta:
    description: "Primary interactive brand color"
    intent: "Primary actions and active states"
    avoid_when:
      - "Destructive action"
      - "Passive informational content"
```

This metadata exists specifically to improve AI generation quality.

---

# 15. Token Resolution

The compiler resolves references:

```text
button.primary.background
        ↓
color.primary.bg
        ↓
color.blue.600
        ↓
#0b6bcb
```

Circular references MUST be rejected.

Undefined references MUST produce compiler errors.

---

# 16. Token Governance

Rules:

1. No arbitrary component colors.
2. No renderer-specific canonical tokens.
3. No duplicate semantic meanings.
4. No manual modification of generated token files.
5. New semantic tokens require justification.
6. Primitive tokens MUST NOT be consumed directly when a semantic token exists.

---

# 17. AI Rule

When generating UI:

```text
semantic token > component token > primitive token > arbitrary value
```

Arbitrary values are the last resort.

---

# 18. Canonical Principle

> **Tokens describe decisions, not CSS.**
