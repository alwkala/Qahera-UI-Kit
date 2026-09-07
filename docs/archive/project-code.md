# Qahera UI Kit

## AI-Native Design System & UI Component Architecture

**Owner:** Alwkala
**Project Family:** Alwkala UI Kits
**Compatible with:** TidyFactor Ecosystem
**Status:** Architecture Draft v1.0
**Primary Language:** Arabic-first capable / English-compatible
**Direction:** RTL + LTR
**Distribution:** Copy-first / source-owned
**Design Philosophy:** AI Native · Developer First · Accessible · Deterministic · Framework Flexible

---

# 1. Project Definition

Qahera UI Kit is an **AI-Native Design System Kit** designed from day one for collaboration between:

* Human developers
* AI coding agents
* UI/UX designers
* Design systems
* Application templates
* Boilerplates
* TidyFactor skills and workflows

Qahera is not simply a collection of UI components.

It is a structured system that defines:

```text
Design Tokens
      ↓
Component Contracts
      ↓
Component Recipes
      ↓
Component Behavior
      ↓
Framework Renderers
      ↓
Validation
      ↓
Developer / AI consumption
```

The primary goal is to reduce the amount of design and implementation decisions that a developer or AI agent needs to make repeatedly.

---

# 2. Product Family

Qahera is the first product in a larger Alwkala UI Kit family.

```text
ALWKALA UI KIT FAMILY

                    UI Kit Core
                        │
        ┌───────────────┼────────────────┐
        │               │                │
     Qahera           Alex             Qena
     UI Kit         Admin Kit         UI Kit
        │               │                │
   General UI       Admin UI         Future scope
        │               │                │
        └───────────────┼────────────────┘
                        │
                 Shared Standards
                        │
             AI / Developer Contracts
```

### Qahera UI Kit

Primary role:

> General-purpose web interface system.

Positioning:

**daisyUI alternative — but AI Native and ecosystem-aware.**

---

### Alex Admin Kit

Primary role:

> Administrative interfaces, dashboards and business applications.

Positioning:

**TailAdmin alternative.**

Alex consumes Qahera's foundation where appropriate but adds admin-specific structures:

* Sidebar
* Dashboard shell
* Data table
* Filters
* Metrics
* Stat cards
* CRUD interfaces
* Settings
* Permissions
* Empty states
* Admin navigation
* Analytics interfaces

---

### Qena UI Kit

Future family member.

Its scope should remain undefined until a real product/use case requires it.

The family must not create products merely to increase repository count.

---

# 3. Ownership Boundary

Qahera is an Alwkala project.

It is NOT a TidyFactor repository.

```text
ALWKALA
│
├── Qahera UI Kit
├── Alex Admin Kit
├── Qena UI Kit
│
└── TidyFactor-compatible ecosystem
```

TidyFactor remains focused on:

```text
Context
Memory
Governance
Skills
Command Engineering
MCP
CLI
Agent Workflows
AI-assisted Development
```

The relationship is:

```text
                 TIDYFACTOR
                     │
          methodology / orchestration
                     │
                     ▼
               UI Kit Skills
                     │
                     ▼
              Qahera UI Kit
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Templates   Starters   Applications
```

Qahera does not become a TidyFactor subsystem.

It becomes a **compatible external capability**.

---

# 4. Core Design Principle

The central architectural principle is:

> **Author once. Describe once. Render everywhere.**

A component should have one conceptual definition.

```text
Component Contract
        │
        ├── Tokens
        ├── Variants
        ├── States
        ├── Accessibility
        ├── Behavior
        └── Usage
                │
                ▼
             Recipe
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
      HTML     PHP      React
      HTMX     Plates   TSX
```

No consuming framework should redefine the component's design vocabulary.

---

# 5. Source of Truth

Qahera uses a strict hierarchy of authority.

```text
CONTRACT
   ↓
TOKENS
   ↓
RECIPES
   ↓
BEHAVIOR
   ↓
RENDERERS
   ↓
EXAMPLES
```

### Human-authored

These are authoritative:

```text
contracts/
tokens/
recipes/
behavior/
docs/
```

### Generated

These are derived:

```text
renderers/
dist/
generated/
```

A generated renderer must never become an independent source of truth.

If a component is wrong:

```text
WRONG

renderer → patch

CORRECT

contract / token / recipe
          ↓
       generate
          ↓
      renderer
```

This follows the existing architectural principle already established in the current Qahera documentation.

---

# 6. YAML-First Architecture

## Decision

Qahera will use YAML as the primary machine-readable authoring format.

JSON is not the canonical source.

### Why YAML?

YAML is preferable for:

* Human readability
* AI context consumption
* Lower structural verbosity
* Comments
* Easier editing
* Compact component definitions
* Hierarchical configuration
* Documentation + data in one artifact

The objective is not merely "use YAML because it is shorter."

The objective is:

> **Reduce unnecessary syntax tokens while preserving a predictable machine-readable vocabulary.**

---

# 7. YAML Source Model

Example:

```yaml
component: button

base:
  display: inline-flex
  align: center
  justify: center

variants:
  variant:
    primary:
      classes: btn-primary
    secondary:
      classes: btn-secondary
    outline:
      classes: btn-outline
    ghost:
      classes: btn-ghost
    destructive:
      classes: btn-destructive

  size:
    sm: btn-sm
    md: btn-md
    lg: btn-lg

states:
  disabled: is-disabled
  loading: is-loading

behavior:
  interactive: false

accessibility:
  role: button
  keyboard: native
```

The same definition can produce multiple outputs.

---

# 8. JSON Compatibility

JSON should not disappear completely.

It becomes a generated interoperability format.

```text
source/
  component.yaml
       │
       ├── compiler
       │
       ├── component.json
       ├── component.css
       ├── Button.tsx
       ├── button.php
       └── button.html
```

Therefore:

```text
YAML = Authoritative Source

JSON = Generated Interchange Artifact
```

This is a much cleaner architecture than maintaining YAML and JSON independently.

---

# 9. Repository Structure

Recommended final structure:

```text
qahera-ui-kit/
│
├── README.md
├── LICENSE
├── CHANGELOG.md
├── CONTRIBUTING.md
├── VERSION
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CONTRACT.md
│   ├── DESIGN-TOKENS.md
│   ├── COMPONENTS.md
│   ├── ACCESSIBILITY.md
│   ├── RTL.md
│   ├── AI-NATIVE.md
│   ├── DISTRIBUTION.md
│   ├── RENDERERS.md
│   ├── GOVERNANCE.md
│   └── CONTRIBUTING.md
│
├── contracts/
│   ├── component.yaml
│   ├── variants.yaml
│   ├── states.yaml
│   └── accessibility.yaml
│
├── tokens/
│   ├── core.yaml
│   ├── colors.yaml
│   ├── typography.yaml
│   ├── spacing.yaml
│   ├── radius.yaml
│   ├── shadows.yaml
│   ├── motion.yaml
│   ├── z-index.yaml
│   └── tokens.css
│
├── recipes/
│   ├── button.yaml
│   ├── input.yaml
│   ├── textarea.yaml
│   ├── select.yaml
│   ├── checkbox.yaml
│   ├── radio.yaml
│   ├── card.yaml
│   ├── badge.yaml
│   ├── alert.yaml
│   ├── toast.yaml
│   ├── modal.yaml
│   ├── dropdown.yaml
│   ├── tabs.yaml
│   ├── accordion.yaml
│   ├── table.yaml
│   ├── avatar.yaml
│   ├── tooltip.yaml
│   └── navbar.yaml
│
├── behavior/
│   ├── dropdown.js
│   ├── modal.js
│   ├── tabs.js
│   ├── accordion.js
│   ├── tooltip.js
│   └── toast.js
│
├── renderers/
│   ├── html/
│   │   ├── native/
│   │   ├── tailwind/
│   │   └── web-components/
│   │
│   ├── php/
│   │   ├── plates/
│   │   └── native/
│   │
│   ├── htmx/
│   │
│   └── react/
│
├── generated/
│   ├── json/
│   ├── css/
│   └── manifests/
│
├── schemas/
│   ├── token.schema.yaml
│   ├── recipe.schema.yaml
│   └── component.schema.yaml
│
├── cli/
│   ├── inspect
│   ├── generate
│   ├── validate
│   └── add
│
├── examples/
│   ├── html/
│   ├── htmx/
│   ├── php/
│   └── react/
│
├── tests/
│   ├── tokens/
│   ├── recipes/
│   ├── renderers/
│   ├── accessibility/
│   └── visual/
│
└── .tidyfactor/
    └── integration.yaml
```

---

# 10. Five Architectural Layers

Qahera should be understood as five layers.

## Layer 1 — Foundation

```text
Tokens
Typography
Colors
Spacing
Radius
Shadow
Motion
RTL
```

---

## Layer 2 — Contract

Defines:

```text
Component names
Props
Variants
States
Slots
Events
Accessibility
Naming
```

The contract defines vocabulary, not implementation.

---

## Layer 3 — Recipe

Defines how the contract becomes visual structure.

```text
Button
  ├── variant
  ├── size
  ├── state
  └── behavior
```

---

## Layer 4 — Renderer

Transforms the recipe into framework-specific implementation.

```text
HTML
PHP
HTMX
React
Web Components
```

---

## Layer 5 — Consumption

The developer receives usable source.

```text
Qahera
   ↓
CLI / copy
   ↓
Project
   ↓
Developer modifies source
```

The consuming application owns the resulting files.

---

# 11. Component Contract

The existing Qahera contract correctly establishes a fixed vocabulary such as:

```text
variant
size
tone
state
```

and explicitly keeps the same vocabulary across server-rendered and React implementations.

This should be expanded into a formal contract.

Example:

```yaml
name: button

category: actions

props:
  variant:
    type: enum
    values:
      - primary
      - secondary
      - outline
      - ghost
      - link
      - destructive

  size:
    type: enum
    values:
      - sm
      - md
      - lg

  state:
    type: enum
    values:
      - default
      - disabled
      - loading

slots:
  - label
  - icon-start
  - icon-end

accessibility:
  element: button
  keyboard: native
```

---

# 12. Component Metadata

Every component should carry AI-readable metadata.

Example:

```yaml
name: modal

category: overlay

description: >
  Dialog surface used to display focused content
  without leaving the current page.

when_to_use:
  - confirmations
  - forms
  - focused workflows

avoid_when:
  - simple inline feedback
  - non-blocking information

variants:
  size:
    - sm
    - md
    - lg

states:
  - open
  - closed
  - loading

behavior:
  focus_trap: true
  escape_close: true
  click_outside: true

accessibility:
  role: dialog
  aria_required: true

rtl:
  supported: true

frameworks:
  - html
  - php
  - htmx
  - react
```

This is where Qahera starts becoming genuinely **AI Native**.

An AI agent can answer:

> "Which component should I use?"

without scanning hundreds of files.

---

# 13. Component Intelligence

Every component should eventually expose four AI-facing dimensions:

```text
WHAT
What is this?

WHEN
When should I use it?

HOW
How do I implement it?

WHY NOT
When should I avoid it?
```

Example:

```yaml
decision:
  primary_for:
    - destructive confirmation
    - important action

  not_for:
    - navigation
    - passive information

  alternatives:
    - alert
    - toast
```

This is a major differentiator from conventional UI libraries.

---

# 14. Tokens

Tokens remain the single visual source of truth.

Recommended taxonomy:

```text
Primitive Tokens
      ↓
Semantic Tokens
      ↓
Component Tokens
```

Example:

```yaml
color:
  primitive:
    blue:
      600: "#0b6bcb"

  semantic:
    primary:
      bg: blue.600
      fg: white

  component:
    button:
      primary:
        background: primary.bg
        foreground: primary.fg
```

This allows the theme to evolve without rewriting component recipes.

---

# 15. Arabic Is a Technical Capability

Arabic support should remain inside the core system.

This is consistent with the current contract: RTL and Arabic typography are technical requirements, while Egyptian/Cairo heritage is intentionally excluded from the base component contract.

Therefore:

```text
Qahera Core
│
├── RTL
├── Logical CSS
├── Arabic typography
├── Bidirectional content
├── Arabic labels
└── Arabic accessibility
```

But:

```text
Egyptian Heritage
Cairo visual identity
Islamic geometry
Pharaonic motifs
Regional decorative language
```

belong in:

```text
Templates
Boilerplates
Themes
Marketing products
Vertical kits
```

This is the correct separation:

> **Arabic is infrastructure. Heritage is expression.**

---

# 16. Typography

Qahera inherits the existing Arabic typography decision:

```text
Headings → El Messiri
Body → Tajawal
Amiri → prohibited
```

This should be encoded as a formal token/configuration rather than remaining only in documentation.

```yaml
typography:
  arabic:
    heading: El Messiri
    body: Tajawal
```

The current architecture already explicitly records this rule.

---

# 17. RTL Architecture

Never create:

```text
ButtonLTR
ButtonRTL
```

Instead:

```text
Button
```

uses logical properties:

```css
margin-inline-start
margin-inline-end

padding-inline-start
padding-inline-end

inset-inline-start
inset-inline-end
```

Therefore:

```text
LTR ─────┐
         ├── same component
RTL ─────┘
```

Directional icons should be the exception and explicitly declare mirroring behavior.

---

# 18. Behavior Architecture

Behavior is separate from visual rendering.

```text
Component
    │
    ├── visual recipe
    │
    └── behavior
          │
          ├── Alpine
          └── React
```

For server-rendered environments:

```text
Alpine.js
```

is the default behavior layer.

For React:

```text
Native React state
```

is used.

This is intentional and should remain so; the current documentation correctly identifies that Alpine and React cannot both own the same DOM node.

---

# 19. Renderer Architecture

The renderer should be treated as a compiler target.

```text
YAML
 │
 ▼
Parser
 │
 ▼
Normalized Component Model
 │
 ├── HTML renderer
 ├── PHP renderer
 ├── HTMX renderer
 ├── React renderer
 └── Web Component renderer
```

This gives the project an important future capability:

> Adding a framework should not require redesigning the component system.

Only a renderer is added.

---

# 20. Renderer Independence

A renderer may have implementation-specific differences.

It must NOT have vocabulary differences.

Correct:

```text
HTML:
data-variant="primary"

React:
variant="primary"

PHP:
$variant = "primary"
```

Incorrect:

```text
HTML:
variant="primary"

React:
kind="primary"

PHP:
style="primary"
```

The semantic contract remains identical.

---

# 21. Distribution Model

The preferred model remains:

> **Source ownership over runtime dependency.**

The existing architecture already selected copy-paste/shadcn-style distribution because it preserves the zero-build philosophy across PHP/HTML/HTMX tracks.

The final model should therefore be:

```text
Qahera Registry
       │
       ▼
Component source
       │
       ▼
Developer project
       │
       ▼
Developer owns code
```

No mandatory runtime dependency.

No forced upgrade.

No hidden remote dependency.

---

# 22. Qahera CLI

Eventually Qahera should have a lightweight CLI.

Examples:

```bash
qahera init
```

```bash
qahera add button
```

```bash
qahera add modal
```

```bash
qahera add forms
```

```bash
qahera list
```

```bash
qahera inspect button
```

```bash
qahera validate
```

```bash
qahera doctor
```

The CLI should be deliberately smaller than TidyFactor CLI.

Its job is:

```text
Discover
Select
Copy
Generate
Validate
```

Not:

```text
Orchestrate the entire AI development environment
```

That remains TidyFactor territory.

---

# 23. TidyFactor Integration

Integration should happen through adapters, not ownership.

```text
                 TidyFactor
                     │
            ┌────────┴────────┐
            │                 │
       Design Skill        Styler
            │                 │
            └────────┬────────┘
                     │
                Qahera Adapter
                     │
                     ▼
                Qahera UI Kit
```

Potential future integrations:

```text
tidyfactor-design
       ↓
component selection

tidyfactor-styler
       ↓
implementation / refinement

tidyfactor-next
       ↓
React renderer

tidyfactor-html
       ↓
HTML renderer

tidyfactor-php
       ↓
PHP renderer

tidyfactor-htmx
       ↓
HTMX renderer
```

The integration should be protocol/documentation based initially.

A hard code dependency should not be introduced unless it creates measurable value.

---

# 24. AI Integration

Qahera should provide an AI manifest.

Example:

```text
.ai/
├── qahera.yaml
├── components.yaml
├── tokens.yaml
├── patterns.yaml
├── rules.yaml
└── examples/
```

`qahera.yaml`:

```yaml
name: qahera
version: 1.0

purpose: >
  AI-native UI component system.

rules:
  use_tokens: true
  invent_components: false
  invent_variants: false
  use_logical_css: true
  rtl_safe: true

component_source:
  recipes: recipes/
  contracts: contracts/

preferred:
  components:
    - button
    - input
    - card
    - modal
```

This allows an AI agent to understand the system without loading the entire repository.

---

# 25. Context Efficiency

This is one of the strongest potential differentiators.

An AI agent should NOT need:

```text
50 components × 10 files
```

to generate one button.

Instead:

```text
intent
  ↓
component metadata
  ↓
recipe
  ↓
relevant tokens
  ↓
renderer
```

Example:

```text
"Create a destructive confirmation dialog."

Agent needs:

modal.yaml
button.yaml
danger tokens
modal behavior
renderer target
```

Not the entire UI repository.

---

# 26. AI Context Levels

Provide progressive disclosure.

### Level 0 — Index

```yaml
button:
  category: action

modal:
  category: overlay
```

### Level 1 — Metadata

```yaml
button:
  variants:
    - primary
    - secondary
    - destructive
```

### Level 2 — Recipe

Full component implementation definition.

### Level 3 — Renderer

Framework-specific code.

### Level 4 — Examples

Real usage.

This is much more efficient for agents than indiscriminate repository ingestion.

---

# 27. Validation Pipeline

Every component should pass:

```text
Schema Validation
       ↓
Contract Validation
       ↓
Token Validation
       ↓
Renderer Validation
       ↓
Accessibility Validation
       ↓
RTL Validation
       ↓
Visual Regression
       ↓
Example Build
```

A component should not be considered complete merely because its HTML renders.

---

# 28. Definition of Done

A component is complete only when:

```text
[ ] Contract exists
[ ] YAML recipe exists
[ ] Tokens are referenced
[ ] No hardcoded design values
[ ] Accessibility documented
[ ] RTL verified
[ ] Behavior documented
[ ] HTML renderer exists
[ ] PHP renderer exists
[ ] HTMX renderer exists
[ ] React renderer exists
[ ] Example exists
[ ] Tests exist
[ ] AI metadata exists
[ ] Documentation exists
```

---

# 29. Anti-Slop Rules

Qahera should explicitly prohibit:

```text
❌ Random component names
❌ Arbitrary variants
❌ Hardcoded colors
❌ Hardcoded spacing
❌ Framework-specific vocabulary
❌ Duplicate RTL components
❌ Unnecessary dependencies
❌ Decorative complexity without purpose
❌ AI-generated one-off components
❌ Renderer-specific design decisions
```

Instead:

```text
Use the contract.
Use the tokens.
Use the recipe.
Use the existing component.
Extend only when necessary.
```

---

# 30. Component Creation Workflow

New component:

```text
Idea
 ↓
Use-case justification
 ↓
Contract
 ↓
Accessibility model
 ↓
Token mapping
 ↓
YAML recipe
 ↓
Behavior
 ↓
Renderers
 ↓
Tests
 ↓
Documentation
 ↓
AI metadata
 ↓
Example
 ↓
Release
```

This should be mandatory.

---

# 31. Versioning

Use semantic versioning.

### PATCH

Bug fix:

```text
1.0.1
```

No contract changes.

### MINOR

Backward-compatible:

```text
1.1.0
```

Examples:

* New component
* New non-breaking variant
* New renderer

### MAJOR

Breaking:

```text
2.0.0
```

Examples:

* Rename component
* Rename token
* Remove variant
* Change contract semantics

The current documentation already establishes this SemVer philosophy and the rule that contract changes precede implementation changes.

---

# 32. Qahera vs Existing UI Libraries

Qahera should not compete only on:

```text
"number of components"
```

Its differentiation is:

| Conventional UI Kit | Qahera                 |
| ------------------- | ---------------------- |
| Human-first         | Human + AI             |
| Components          | Components + contracts |
| CSS/classes         | Tokens + recipes       |
| Framework-centric   | Renderer-centric       |
| Documentation       | AI-readable metadata   |
| LTR often primary   | RTL/LTR first-class    |
| Install dependency  | Source ownership       |
| Generic variants    | Controlled vocabulary  |
| Runtime-focused     | Context-efficient      |
| Visual library      | Development system     |

---

# 33. Relationship to daisyUI

Qahera can replace daisyUI at the conceptual level:

```text
daisyUI
  ↓
utility/component abstraction

Qahera
  ↓
tokens
+ contracts
+ recipes
+ behaviors
+ renderers
+ AI metadata
+ RTL
+ governance
```

Therefore the message should not be:

> "We built another component library."

It should be:

> **"We built a UI system that both developers and AI agents can understand."**

---

# 34. Relationship to TailAdmin

TailAdmin is not replaced by Qahera directly.

Instead:

```text
Qahera
   │
   ├── foundations
   ├── components
   └── interaction patterns
            │
            ▼
      Alex Admin Kit
            │
            ├── Dashboard
            ├── Sidebar
            ├── Data Table
            ├── Filters
            ├── Metrics
            └── CRUD
```

Thus Alex becomes a vertical specialization rather than a fork.

---

# 35. Heritage Strategy

Heritage must remain outside the core.

Correct:

```text
Qahera UI Kit
      │
      ├── Arabic
      ├── RTL
      ├── Accessibility
      └── Neutral design system
             │
             ▼
      Qahera Templates
             │
             ├── Cairo
             ├── Alexandria
             ├── Qena
             ├── Islamic Cairo
             └── Egyptian Heritage
```

This is exactly the right architectural boundary already recorded in the existing contract.

---

# 36. Future Product Stack

The long-term Alwkala UI ecosystem can therefore become:

```text
                  ALWKALA UI ECOSYSTEM

                         Core
                          │
              ┌───────────┼───────────┐
              │           │           │
           Qahera        Alex        Qena
              │           │           │
          General       Admin      Vertical
              │           │           │
              └───────────┼───────────┘
                          │
                    Templates
                          │
                    Boilerplates
                          │
                     Starters
                          │
                     Applications
```

And separately:

```text
                    TIDYFACTOR

 Context
 Memory
 Governance
 Skills
 MCP
 CLI
 Agent Workflows
        │
        │ compatibility
        ▼
   Alwkala UI Kits
```

---

# 37. Recommended MVP

Do NOT attempt to build the entire ecosystem immediately.

### Phase 1

Build:

```text
Qahera Core
├── YAML tokens
├── YAML contracts
├── YAML recipes
├── 17 components
├── RTL
├── Arabic typography
├── HTML renderer
├── PHP renderer
├── HTMX renderer
├── React renderer
├── AI manifest
└── documentation
```

The existing v0.1 component scope of 17 components is a sensible starting point.

### Phase 2

Add:

```text
qahera CLI
validation
visual regression
component search
AI context manifests
```

### Phase 3

Add:

```text
Qahera MCP
```

Potential tools:

```text
search_component
inspect_component
search_pattern
inspect_tokens
get_example
validate_component
```

### Phase 4

Build:

```text
Alex Admin Kit
```

on top of Qahera.

### Phase 5

Build:

```text
Templates
Boilerplates
Themes
Egyptian Heritage packs
```

---

# 38. The Strategic Architecture

The most important distinction is this:

```text
Qahera is NOT:

Components + CSS
```

It is:

```text
                QA HERA

             Design System
                   │
        ┌──────────┼──────────┐
        │          │          │
      Tokens    Contracts   Recipes
        │          │          │
        └──────────┼──────────┘
                   │
               Behaviors
                   │
              Renderers
                   │
        ┌──────────┼──────────┐
        │          │          │
       HTML       PHP       React
        │          │          │
        └──────────┼──────────┘
                   │
              AI Metadata
                   │
              Validation
                   │
             Developer CLI
                   │
            TidyFactor Adapter
```

That is the product.

---

# 39. North Star

The north-star principle for Qahera should be:

> **Build once. Understand once. Reuse everywhere.**

And the AI-native interpretation:

> **If a developer can understand the system quickly, an AI agent should be able to understand it even faster.**

---

# 40. Recommended Positioning

### Short

**Qahera UI Kit — AI-Native UI for Developers and AI Agents.**

### Technical

**A contract-driven, YAML-first design system that generates framework-ready UI components for humans and AI agents.**

### Ecosystem

**A developer-owned UI system designed to work naturally with Alwkala products and the TidyFactor ecosystem.**

### Strongest

> **Qahera is not another component library. It is a UI development system designed for the age of AI-assisted software engineering.**
