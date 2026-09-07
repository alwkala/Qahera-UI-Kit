# Qahera UI Kit

## Component Specification — v1.0

**Status:** Canonical  
**Source Format:** YAML  
**Architecture:** Contract-first  
**Rendering:** Multi-target  

---

# 1. Component Philosophy

A Qahera component is not a CSS class.

It is a **semantic contract**.

The contract defines:

* purpose
* anatomy
* properties
* variants
* states
* accessibility
* behavior
* slots
* composition
* tokens
* renderer requirements
* AI metadata

The renderer determines how that contract becomes code.

---

# 2. Component Lifecycle

Every component follows:

```text
Intent
  ↓
Contract
  ↓
Recipe
  ↓
Behavior
  ↓
Normalized Model
  ↓
Renderer
  ↓
Output
```

No renderer should independently redefine component semantics.

---

# 3. Canonical Component Contract

Example:

```yaml
name: Button

category: actions

purpose: >
  Triggers an explicit user action.

anatomy:
  - root
  - icon-start
  - label
  - icon-end

variants:
  - primary
  - secondary
  - outline
  - ghost
  - link
  - destructive

sizes:
  - sm
  - md
  - lg

states:
  - default
  - hover
  - focus
  - disabled
  - loading
```

---

# 4. Component Naming

Canonical component names use PascalCase:

```text
Accordion
Alert
Avatar
BackToTop
Badge
Breadcrumb
Button
Callout
CanvasSparks
Card
Carousel
Checkbox
Chip
Divider
Drawer
Dropdown
FileUpload
Input
Kbd
Modal
Navbar
Preloader
Progress
Radio
Rating
Ribbon
Select
Skeleton
Spinner
Stepper
Switch
Table
Tabs
Textarea
Timeline
Toast
Tooltip
Treeview
```

Renderer-specific names are derived.

Examples:

```text
Button
↓
<button>
Button
↓
QButton
Button
↓
React Button component
```

---

# 5. Variant Vocabulary

Variants are controlled globally.

```text
primary
secondary
outline
ghost
link
destructive
```

A component MUST NOT invent an equivalent such as:

```text
brand
filled
dangerous
main
```

unless a new vocabulary decision is formally introduced.

---

# 6. Size Vocabulary

Default:

```text
sm
md
lg
```

`xs` is permitted only where component anatomy requires it.

---

# 7. State Vocabulary

Canonical:

```text
default
hover
focus
disabled
loading
```

Additional state may exist when semantically required.

Examples:

```text
checked
selected
expanded
open
invalid
valid
```

These are component states, not arbitrary visual variants.

---

# 8. Tone

Components that communicate semantic status use:

```text
neutral
info
success
warning
danger
```

Tone MUST NOT be implemented by creating independent component variants.

---

# 9. Component Anatomy

Every component MUST define its semantic parts.

Example:

```yaml
anatomy:
  root:
  icon-start:
  label:
  icon-end:
```

Anatomy enables:

* styling
* accessibility
* AI reasoning
* renderer generation
* documentation
* testing

---

# 10. Slots

Components may expose controlled slots.

Example:

```yaml
slots:
  start:
  default:
  end:
```

Slots MUST have a defined semantic purpose.

Avoid generic uncontrolled slot systems when a component has a known anatomy.

---

# 11. Composition

Components SHOULD compose smaller primitives.

Example:

```text
Alert
├── Icon
├── Content
│   ├── Title
│   └── Description
└── Close
```

Composition MUST NOT duplicate semantic contracts.

---

# 12. Accessibility

Every interactive component MUST define:

```yaml
accessibility:
  role:
  keyboard:
  focus:
  aria:
  disabled:
```

Examples:

### Button

```text
Enter → activate
Space → activate
Tab → focus
```

### Modal

```text
Escape → close
Focus trap → enabled
Focus restoration → enabled
```

---

# 13. RTL

Component contracts MUST remain direction-neutral.

The renderer handles:

* logical CSS
* icon mirroring
* text direction
* alignment
* inline ordering

Components MUST NOT assume LTR.

---

# 14. Behavior

Behavior is defined independently from visual styling.

Example:

```yaml
behavior:
  loading:
    disable: true
    preserve-label: true
```

A component may therefore have:

```text
visual state
+
behavior state
```

without coupling behavior to a specific JavaScript framework.

---

# 15. Renderer Contract

Every renderer receives the same normalized component model.

Conceptually:

```text
Button Contract
      ↓
Normalized Button Model
      ↓
 ┌────┼────┬────┬─────┐
HTML PHP HTMX React WebComponent
```

The output syntax differs.

The component semantics do not.

---

# 16. AI Metadata

Components SHOULD expose:

```yaml
ai:
  description:
  use_when:
  avoid_when:
  common_patterns:
  accessibility_notes:
  composition_notes:
```

Example:

```yaml
ai:
  description: "Primary action control"
  use_when:
    - "User must explicitly submit or confirm an action"
  avoid_when:
    - "Navigation between pages"
```

---

# 17. AI Component Selection

Agents SHOULD select components based on intent.

Example:

```text
"Allow user to confirm deletion"
        ↓
intent = destructive confirmation
        ↓
Modal + Button(destructive)
```

Not:

```text
"Looks like a red button"
        ↓
Button(destructive)
```

Intent precedes appearance.

---

# 18. Required MVP

Qahera v0.1:

```text
Button
Input
Textarea
Select
Checkbox
Radio
Card
Badge
Alert
Toast
Modal
Dropdown
Tabs
Accordion
Table
Avatar
Tooltip
Nav
```

---

# 19. Deferred Components

v0.2:

```text
DatePicker
Combobox
Pagination
FileUpload
Stepper
Wizard
```

These should not enter the core until their contracts are stable.

---

# 20. Component Addition Protocol

A new component requires:

```text
1. Intent
2. Contract
3. Anatomy
4. Variants
5. States
6. Accessibility
7. Recipe
8. Behavior
9. Renderers
10. Example
11. Tests
12. Documentation
```

No component is considered complete before all required layers exist.

---

# 21. Anti-Slop Rules

Do not create:

```text
Button2
ModernButton
CoolButton
PrimaryButton2
CardNew
FancyCard
```

If the semantic contract is the same, it is the same component.

Variation belongs in:

```text
variant
size
tone
recipe
theme
```

---

# 22. Canonical Principle

> **A Qahera component is a contract with multiple implementations.**
