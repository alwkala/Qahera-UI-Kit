# Qahera UI Kit

## Recipe Specification — v1.0

**Status:** Canonical  
**Source Format:** YAML  
**Purpose:** Translate component intent into implementation-ready styling decisions.  

---

# 1. What Is a Recipe?

A recipe is the styling and composition logic that connects:

```text
Component Contract
        ↓
Design Tokens
        ↓
Renderer Output
```

Recipes answer:

> **How should this component look and behave in this particular visual state?**

They do not redefine what the component means.

---

# 2. Recipe vs Component

Component:

```text
Button = action control
```

Recipe:

```text
Button / primary / md
    background → primary
    text → contrast
    radius → md
    padding → space-3 / space-4
```

---

# 3. Canonical Structure

```yaml
component: Button

base:
  ...

variants:
  primary:
    ...

sizes:
  sm:
    ...
  md:
    ...
  lg:
    ...

states:
  hover:
    ...
  focus:
    ...
  disabled:
    ...
  loading:
    ...
```

---

# 4. Base Recipe

Base styles define characteristics shared by all variants.

Example:

```yaml
base:
  display: inline-flex
  align-items: center
  justify-content: center
  gap: "{space.2}"
  border-radius: "{radius.md}"
  transition:
    duration: "{duration.fast}"
    easing: "{ease.standard}"
```

Base rules MUST NOT contain variant-specific decisions.

---

# 5. Variant Recipe

Example:

```yaml
variants:

  primary:
    background: "{color.primary}"
    foreground: "{color.primary.contrast}"

  secondary:
    background: "{color.secondary}"
    foreground: "{color.secondary.contrast}"

  outline:
    background: transparent
    foreground: "{color.primary}"
    border: "{color.primary}"
```

---

# 6. Size Recipe

Sizes control spatial scale.

```yaml
sizes:

  sm:
    height: "{space.8}"
    padding-inline: "{space.3}"
    text: "{text.sm}"

  md:
    height: "{space.10}"
    padding-inline: "{space.4}"
    text: "{text.base}"

  lg:
    height: "{space.12}"
    padding-inline: "{space.5}"
    text: "{text.lg}"
```

---

# 7. State Recipe

States are layered over the base and variant.

Resolution order:

```text
base
 ↓
variant
 ↓
size
 ↓
tone
 ↓
state
```

Example:

```yaml
states:

  hover:
    filter: emphasis

  focus:
    ring:
      width: 2
      color: "{color.primary}"

  disabled:
    opacity: 0.5
    cursor: not-allowed
```

---

# 8. State Priority

When multiple states exist:

```text
disabled
loading
invalid
selected
hover
focus
```

The normalized model resolves conflicts deterministically.

---

# 9. Recipe Outputs

One recipe may generate multiple representations.

```text
Recipe
   ↓
Normalized Style Model
   ├── Tailwind
   ├── Native CSS
   ├── Web Components
   ├── React
   └── PHP/Plates
```

Example conceptual output:

```text
Tailwind:
px-4 py-2 rounded-md ...

Native:
qhr-button qhr-button--primary
```

Both originate from the same recipe.

---

# 10. No Renderer-Specific Recipes

Do NOT create:

```text
button-tailwind.yaml
button-react.yaml
button-php.yaml
```

unless there is an unavoidable renderer capability difference.

Canonical recipe:

```text
button.yaml
```

Renderer adapters translate it.

---

# 11. Capability Overrides

If a renderer cannot express a feature directly:

```yaml
capabilities:
  animation:
    fallback: css
```

The renderer may provide a fallback.

It MUST NOT silently change the component semantics.

---

# 12. Responsive Behavior

Responsive decisions belong in recipes when they affect presentation.

Example:

```yaml
responsive:
  sm:
    padding-inline: "{space.3}"

  lg:
    padding-inline: "{space.5}"
```

Breakpoints are tokenized.

---

# 13. RTL Recipe Rules

Recipes MUST prefer logical properties.

Preferred:

```text
padding-inline
margin-inline
inset-inline
border-start-start-radius
```

Avoid directional duplication such as:

```text
LTR recipe
RTL recipe
```

unless the semantic behavior genuinely differs.

---

# 14. Dark Theme

Theme changes should normally occur through token substitution:

```text
Recipe
  ↓
Semantic Token
  ↓
Theme
```

Not:

```text
Button Light Recipe
Button Dark Recipe
```

This dramatically reduces duplication.

---

# 15. AI Metadata

Recipes SHOULD contain:

```yaml
ai:
  intent:
  visual_role:
  density:
  preferred_when:
  avoid_when:
```

Example:

```yaml
ai:
  intent: "Primary action"
  visual_role: "High emphasis"
  density: "comfortable"
  preferred_when:
    - "Main action in a section"
  avoid_when:
    - "Multiple competing primary actions"
```

---

# 16. Recipe Composition

Recipes may inherit shared foundations.

Example:

```yaml
extends:
  - interactive
  - control
```

Composition MUST be deterministic.

The compiler MUST reject circular inheritance.

---

# 17. Recipe Resolution

The compiler resolves:

```text
Component
 ↓
Base recipe
 ↓
Variant
 ↓
Size
 ↓
Tone
 ↓
State
 ↓
Theme
 ↓
Renderer
```

The final normalized representation is immutable.

---

# 18. Determinism

Given identical:

```text
component
+
props
+
tokens
+
theme
+
renderer version
```

the output MUST be deterministic.

This is essential for:

* AI reproducibility
* CI
* visual regression
* caching
* generated code review

---

# 19. Recipe Governance

A recipe MUST NOT:

* redefine component semantics
* introduce arbitrary colors
* duplicate tokens
* depend on renderer-specific markup
* contain hidden JavaScript behavior
* bypass accessibility requirements

---

# 20. AI Generation Rule

When an AI agent needs to build a component:

```text
1. Identify intent
2. Select component
3. Select recipe
4. Resolve tokens
5. Resolve state
6. Resolve renderer
7. Generate output
```

The agent should NOT invent CSS if an existing recipe can satisfy the request.

---

# 21. Canonical Principle

> **Recipes encode visual decisions; components encode semantic contracts.**
