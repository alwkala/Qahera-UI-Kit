# Qahera UI Kit

## AI-Native Design System Specification

**Specification:** QAHERA-SPEC
**Version:** 1.0.0-draft
**Project:** Qahera UI Kit
**Owner:** Alwkala
**Family:** Alwkala UI Kits
**Compatibility:** TidyFactor Ecosystem
**Status:** Foundational Specification

---

# 1. Purpose

Qahera UI Kit is an **AI-Native Design System** built from the first day for collaborative software development between humans and AI agents.

It provides a deterministic system for defining, generating, consuming, validating, and evolving UI components.

Qahera is designed to replace conventional component abstractions such as daisyUI for general-purpose interfaces and to provide the foundation consumed by specialized products such as Alex Admin Kit.

Qahera is not merely:

* a CSS framework
* a component collection
* a Tailwind preset
* a React component library
* a visual style guide

It is a **component system with an explicit machine-readable contract**.

---

# 2. Core Principle

The fundamental rule is:

> **One semantic definition, multiple implementations.**

A component must have one canonical definition of:

* identity
* purpose
* vocabulary
* variants
* states
* tokens
* behavior
* accessibility
* RTL behavior
* usage rules

Framework-specific implementations are renderings of that definition.

```text
                    COMPONENT INTENT
                           │
                           ▼
                     COMPONENT CONTRACT
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           TOKENS        RECIPE        BEHAVIOR
             │             │             │
             └─────────────┼─────────────┘
                           ▼
                    NORMALIZED MODEL
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
           HTML           PHP           React
             │             │             │
            HTMX      Web Components   Future
```

---

# 3. Architectural Goals

Qahera MUST optimize for:

1. Developer productivity
2. AI context efficiency
3. Deterministic output
4. Framework flexibility
5. Source ownership
6. Accessibility
7. RTL/LTR parity
8. Design consistency
9. Minimal unnecessary dependencies
10. Easy customization
11. Easy onboarding
12. Long-term maintainability

Qahera MUST NOT optimize primarily for:

* maximum component count
* maximum abstraction
* framework lock-in
* dependency complexity
* visual novelty
* configuration for its own sake

---

# 4. Design Philosophy

Qahera follows:

```text
Simple by Default
Extensible by Design
Explicit over Implicit
Contract before Code
Source before Runtime
Tokens before Values
Composition before Duplication
Semantic Naming before Styling
AI-readable before AI-generated
```

---

# 5. Ownership Boundary

Qahera is owned and maintained by **Alwkala**.

It is not a TidyFactor repository.

TidyFactor and Qahera are complementary projects.

```text
ALWKALA
│
├── Qahera UI Kit
├── Alex Admin Kit
├── Qena UI Kit
├── Templates
├── Boilerplates
└── Applications
```

Separately:

```text
TIDYFACTOR
│
├── Context
├── Memory
├── Governance
├── Skills
├── MCP
├── CLI
├── Command Engineering
└── Agent Workflows
```

The relationship is compatibility, not ownership.

---

# 6. Product Family

Qahera establishes the foundation for a family of Alwkala UI products.

| Product        | Role                  | Primary Position      |
| -------------- | --------------------- | --------------------- |
| Qahera UI Kit  | General UI            | daisyUI alternative   |
| Alex Admin Kit | Admin UI              | TailAdmin alternative |
| Qena UI Kit    | Future specialization | Scope TBD             |

Family products MAY consume Qahera.

They SHOULD NOT fork Qahera's core contracts.

```text
                 QA HERA CORE
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Qahera       Alex       Qena
       General      Admin      Future
          │          │
          └──────────┼──────────┘
                     ▼
              Templates
              Boilerplates
              Starters
```

---

# 7. Heritage Boundary

Qahera distinguishes between:

## Technical Arabic Support

Part of the core.

Includes:

* RTL
* logical CSS properties
* Arabic typography
* bidirectional content
* Arabic labels
* Arabic accessibility considerations
* RTL-aware directional icons

## Egyptian / Regional Heritage

Not part of the core contract.

Includes:

* Cairo visual motifs
* Egyptian architectural references
* Islamic geometry
* Pharaonic references
* regional decorative systems
* historical visual language

These belong in:

```text
Themes
Templates
Boilerplates
Marketing Assets
Vertical Products
Heritage Packs
```

Therefore:

> **Arabic is infrastructure. Heritage is expression.**

---

# 8. Source of Truth

Qahera uses a strict source hierarchy.

```text
Specification
     │
     ▼
Contracts
     │
     ▼
Tokens + Recipes
     │
     ▼
Behavior
     │
     ▼
Normalized Model
     │
     ▼
Renderers
     │
     ▼
Examples / Distribution
```

Only the upper layers are authoritative.

Generated artifacts MUST NOT become independent sources of truth.

---

# 9. YAML-First Policy

YAML is the canonical authoring format.

```text
YAML = Source
JSON = Generated Interchange
CSS = Generated Runtime Artifact
TSX = Generated/Renderer Output
PHP = Generated/Renderer Output
HTML = Generated/Renderer Output
```

Qahera MUST NOT maintain parallel hand-authored YAML and JSON definitions.

If JSON is required by a tool, it is generated from YAML.

---

# 10. Why YAML

YAML is selected because it provides:

* lower syntactic overhead
* human readability
* AI readability
* comments
* hierarchical structures
* concise component descriptions
* convenient authoring
* suitable configuration semantics

The objective is **context efficiency**, not simply fewer characters.

An AI agent should be able to load the smallest useful YAML document to perform a task.

---

# 11. Canonical Repository

```text
qahera-ui-kit/
│
├── SPEC.md
├── README.md
├── LICENSE
├── VERSION
├── CHANGELOG.md
├── CONTRIBUTING.md
│
├── contracts/
├── tokens/
├── recipes/
├── behavior/
├── renderers/
├── generated/
├── schemas/
├── ai/
├── cli/
├── docs/
├── examples/
├── tests/
└── .tidyfactor/
```

---

# 12. Contracts

The `contracts/` directory defines the semantic API of Qahera.

```text
contracts/
├── component.yaml
├── props.yaml
├── variants.yaml
├── states.yaml
├── slots.yaml
├── behavior.yaml
├── accessibility.yaml
└── naming.yaml
```

The contract answers:

> What is this component and what vocabulary does it expose?

It does not prescribe framework-specific markup.

---

# 13. Component Identity

Every component MUST have:

```yaml
name: button
category: actions
description: Primary interactive action control
```

The name is stable and globally unique inside Qahera.

Names MUST:

* be semantic
* be framework-neutral
* use lowercase canonical identifiers
* avoid visual implementation details
* avoid framework-specific terminology

Good:

```text
button
dialog
dropdown
alert
```

Bad:

```text
blue-button
tailwind-button
primary-rounded-button
react-dialog
```

---

# 14. Component Categories

Initial categories:

```text
actions
forms
navigation
feedback
layout
data-display
overlay
media
utility
```

Categories exist primarily for discovery and AI retrieval.

They are not required to determine implementation.

---

# 15. Props Vocabulary

Qahera establishes a controlled vocabulary.

Initial shared properties:

```text
variant
size
tone
state
```

The same semantic property MUST retain the same meaning across components.

Example:

```text
variant = visual/semantic style
size    = dimensional scale
tone    = semantic status
state   = interaction state
```

The existing Qahera contract already establishes these controlled values and the same vocabulary across server-rendered and React outputs.

---

# 16. Variant System

Variants MUST be finite and documented.

Example:

```yaml
variant:
  values:
    - primary
    - secondary
    - outline
    - ghost
    - link
    - destructive
```

A developer or AI agent MUST NOT invent:

```text
variant="important"
variant="hero"
variant="special"
variant="nice"
```

unless the contract is intentionally extended.

---

# 17. State System

States are semantic conditions.

Initial standard:

```text
default
hover
focus
disabled
loading
```

Additional states MAY be component-specific.

Examples:

```text
checked
selected
open
closed
error
success
```

State names MUST describe behavior, not appearance.

---

# 18. Slots

Components SHOULD expose explicit slots where composition is expected.

Example:

```yaml
slots:
  - icon-start
  - label
  - icon-end
```

This is preferable to creating multiple specialized components:

```text
Button
IconButton
ButtonWithIcon
ButtonWithRightIcon
```

unless those components have genuinely different semantic behavior.

---

# 19. Token Architecture

Qahera uses three token levels.

```text
Primitive Tokens
       ↓
Semantic Tokens
       ↓
Component Tokens
```

### Primitive

Raw design values.

```text
blue.600
space.4
radius.md
```

### Semantic

Meaning.

```text
primary
danger
surface
content
muted
```

### Component

Component-specific mapping.

```text
button.primary.background
button.primary.foreground
```

---

# 20. Token Rules

A component MUST NOT hardcode:

```text
#0b6bcb
16px
10px
300ms
```

when the value is represented by a Qahera token.

Instead:

```text
primary.600
space.4
radius.md
duration.fast
```

All visual values MUST trace back to the token system.

---

# 21. Token Structure

Recommended:

```text
tokens/
├── core.yaml
├── colors.yaml
├── typography.yaml
├── spacing.yaml
├── radius.yaml
├── shadows.yaml
├── motion.yaml
├── z-index.yaml
└── semantic.yaml
```

Example:

```yaml
color:
  primary:
    600: "#0b6bcb"

space:
  4: "16px"

radius:
  md: "10px"
```

---

# 22. Typography

Typography is part of the design foundation.

Arabic defaults:

```yaml
typography:
  arabic:
    heading: "El Messiri"
    body: "Tajawal"
```

The current Qahera documentation explicitly establishes El Messiri for headings, Tajawal for body text, and excludes Amiri.

Typography MUST be tokenized.

---

# 23. RTL

RTL is a core capability, not an optional theme.

Qahera MUST prefer logical CSS:

```css
margin-inline-start
margin-inline-end
padding-inline-start
padding-inline-end
inset-inline-start
inset-inline-end
```

over:

```css
margin-left
margin-right
padding-left
padding-right
left
right
```

unless physical direction is explicitly required by the component.

---

# 24. Bidirectional Design

Every component SHOULD be tested in:

```text
LTR
RTL
mixed-direction content
Arabic text
Latin text
numbers
dates
icons
```

Directional icons MUST explicitly declare whether they mirror in RTL.

---

# 25. Recipe Definition

A recipe describes how a contract becomes an implementation.

Example:

```yaml
component: button

base:
  - inline-flex
  - items-center
  - justify-center

variants:
  variant:
    primary:
      token: color.primary
    secondary:
      token: color.secondary
    destructive:
      token: color.danger

sizes:
  sm:
    token: size.sm
  md:
    token: size.md
  lg:
    token: size.lg

states:
  disabled:
    behavior: disabled
  loading:
    behavior: loading
```

Recipes MUST reference tokens and contract vocabulary.

---

# 26. Behavior

Visual state and behavioral state are separate concerns.

```text
Recipe
   │
   └── visual definition

Behavior
   │
   └── interaction definition
```

Interactive components MUST document:

* trigger
* state
* transition
* keyboard behavior
* focus behavior
* closing behavior
* accessibility behavior

---

# 27. Behavior Implementations

Server-rendered tracks use Alpine.js behavior modules where appropriate.

React tracks use native React state.

```text
                 Component Behavior
                        │
              ┌─────────┴─────────┐
              ▼                   ▼
           Alpine               React
```

Both implementations MUST conform to the same semantic contract.

The existing architecture already uses this deliberate separation rather than allowing Alpine and React to compete over the same DOM ownership.

---

# 28. Renderer Architecture

Renderers are compiler targets.

Initial targets:

```text
HTML
PHP / Plates
HTMX
React / TSX
Web Components
```

A renderer translates the normalized component model into target-specific code.

```text
YAML
 ↓
Parser
 ↓
Normalized Model
 ↓
Renderer
 ↓
Target
```

---

# 29. Renderer Rule

A renderer MAY change:

* syntax
* binding
* state mechanism
* template syntax
* framework conventions

A renderer MUST NOT change:

* component name
* semantic props
* token meaning
* variant vocabulary
* accessibility contract
* RTL semantics

---

# 30. Normalized Component Model

The compiler SHOULD normalize YAML before rendering.

Conceptually:

```text
Component
├── identity
├── metadata
├── props
├── variants
├── states
├── slots
├── tokens
├── behavior
├── accessibility
├── rtl
└── renderer hints
```

This normalized model becomes the compiler's internal API.

---

# 31. AI Metadata

Every component MUST be discoverable without reading its implementation.

Example:

```yaml
name: modal

category: overlay

purpose: >
  Display focused content while preserving the current page context.

use_when:
  - confirmation
  - focused form
  - blocking decision

avoid_when:
  - passive information
  - simple inline feedback

alternatives:
  - alert
  - toast

behavior:
  focus_trap: true
  escape_close: true
  click_outside: true

accessibility:
  role: dialog

rtl:
  supported: true
```

---

# 32. AI Decision Model

Qahera metadata should answer four questions:

```text
WHAT?
What is this?

WHEN?
When should I use it?

HOW?
How do I use it?

WHY NOT?
When should I avoid it?
```

This is a core differentiator.

A conventional component library documents implementation.

Qahera documents **implementation + decision-making**.

---

# 33. Progressive AI Context

AI consumption SHOULD use progressive disclosure.

### Level 0 — Index

```text
button
modal
card
input
```

### Level 1 — Metadata

```text
purpose
variants
states
use cases
```

### Level 2 — Recipe

```text
tokens
structure
behavior
```

### Level 3 — Renderer

```text
React
PHP
HTML
HTMX
```

### Level 4 — Example

Real project usage.

This prevents an AI agent from loading the entire repository when only one component is required.

---

# 34. AI Manifest

Qahera provides:

```text
ai/
├── qahera.yaml
├── components.yaml
├── tokens.yaml
├── patterns.yaml
├── rules.yaml
└── examples/
```

`qahera.yaml` identifies the system and its governing rules.

Example:

```yaml
name: qahera
version: 1.0

rules:
  use_tokens: true
  use_contracts: true
  invent_variants: false
  hardcode_design_values: false
  rtl_safe: true

sources:
  contracts: contracts/
  tokens: tokens/
  recipes: recipes/
```

---

# 35. AI Safety Rules

An AI agent consuming Qahera MUST prefer:

```text
existing component
      ↓
existing variant
      ↓
existing token
      ↓
existing pattern
```

before creating something new.

The preferred order is:

```text
Reuse
  ↓
Compose
  ↓
Extend
  ↓
Create
```

Creation should be the final option.

---

# 36. Component Discovery

Future tools SHOULD support queries such as:

```text
search_component("confirmation")
search_component("form")
search_component("navigation")
```

and return:

```text
component
purpose
variants
recommended usage
renderer availability
example
```

This is more useful to AI agents than a flat component list.

---

# 37. Developer Experience

A developer should be able to start with minimal knowledge.

Target workflow:

```text
Install / initialize
        ↓
Choose component
        ↓
Copy source
        ↓
Customize
        ↓
Build
```

Example:

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
qahera inspect button
```

```bash
qahera validate
```

---

# 38. Source Ownership

The preferred distribution model is source ownership.

A consuming project receives the component source.

```text
Qahera
  │
  ▼
Developer Project
  │
  └── owns component source
```

There is no mandatory runtime dependency.

This preserves the zero-build philosophy already established for the server-rendered ecosystem.

---

# 39. Package Model

Qahera MAY eventually provide:

```text
npm
Composer
CLI
Git distribution
```

but package installation MUST NOT be required for the basic source-consumption model.

Possible future distinction:

```text
qahera source
qahera compiler
qahera cli
qahera react
qahera mcp
```

These are implementation/distribution layers, not separate design systems.

---

# 40. CLI Boundary

Qahera CLI owns:

```text
init
add
remove
list
inspect
generate
validate
doctor
```

TidyFactor CLI owns broader orchestration:

```text
context
memory
skills
workflows
governance
agent environments
project orchestration
```

Qahera CLI MUST NOT become a second TidyFactor CLI.

---

# 41. MCP Boundary

A future Qahera MCP may expose:

```text
search_component
inspect_component
search_pattern
inspect_token
get_example
validate_component
```

It SHOULD be read-heavy and context-efficient.

The MCP should not duplicate the entire TidyFactor MCP architecture.

Its responsibility is:

> **Expose Qahera's design-system knowledge and capabilities to AI agents.**

---

# 42. TidyFactor Integration

Integration should initially be adapter-based.

```text
TidyFactor Skill
       │
       ▼
Qahera Adapter
       │
       ▼
Qahera specification
```

Potential integrations:

```text
tidyfactor-design
tidyfactor-styler
tidyfactor-html
tidyfactor-htmx
tidyfactor-php
tidyfactor-next
```

No hard dependency should be introduced without architectural justification.

---

# 43. TidyFactor Role

TidyFactor determines:

```text
What should happen?
Which skill?
Which context?
Which workflow?
Which quality gate?
```

Qahera determines:

```text
Which UI component?
Which design token?
Which variant?
Which renderer?
Which implementation?
```

Therefore:

```text
TidyFactor = Development Intelligence Layer

Qahera = UI Design & Implementation Layer
```

---

# 44. Accessibility

Accessibility is part of the contract.

Each interactive component MUST define, where applicable:

```text
semantic element
role
keyboard interaction
focus behavior
focus visibility
aria requirements
screen-reader behavior
disabled behavior
loading behavior
```

Accessibility cannot be an afterthought added to documentation.

---

# 45. Testing

Qahera requires multiple testing dimensions.

```text
Unit
Contract
Schema
Renderer
Accessibility
RTL
Visual
Integration
```

A component is not complete because one screenshot looks correct.

---

# 46. Visual Regression

Visual regression SHOULD test:

```text
LTR
RTL
mobile
desktop
light
dark
default
variants
states
```

For interactive components:

```text
closed
open
focused
loading
disabled
```

---

# 47. Contract Testing

Every renderer MUST be checked against the canonical contract.

Example:

```text
Contract:
button.variant = destructive

HTML:
✓ destructive

PHP:
✓ destructive

React:
✓ destructive

HTMX:
✓ destructive
```

A renderer introducing a different semantic vocabulary is a contract failure.

---

# 48. Definition of Done

A component is complete only when:

```text
[ ] Contract
[ ] YAML recipe
[ ] Tokens
[ ] Metadata
[ ] Accessibility
[ ] RTL
[ ] Behavior
[ ] HTML renderer
[ ] PHP renderer
[ ] HTMX renderer
[ ] React renderer
[ ] Example
[ ] Tests
[ ] AI metadata
[ ] Documentation
```

---

# 49. Component Lifecycle

```text
Proposal
   ↓
Use-case validation
   ↓
Contract
   ↓
Token mapping
   ↓
Recipe
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
Release
```

A component MUST NOT be added simply because another library has it.

Every component requires a justified use case.

---

# 50. Extension Policy

When a developer needs something not currently available:

```text
1. Search existing component
2. Search existing variant
3. Compose existing components
4. Extend an existing contract
5. Propose a new component
```

The default response to every missing UI requirement is not "create another component."

---

# 51. Anti-Slop Rules

Qahera prohibits:

```text
Random variants
Random component names
Hardcoded colors
Hardcoded spacing
Duplicate RTL components
Framework-specific semantic vocabulary
One-off AI components
Unnecessary dependencies
Unvalidated accessibility
Renderer-specific design systems
```

The governing rule:

> **Do not solve a local UI problem by weakening the global system.**

---

# 52. Versioning

Qahera follows SemVer.

### PATCH

Bug fixes.

```text
1.0.1
```

### MINOR

Backward-compatible additions.

```text
1.1.0
```

Examples:

* new component
* new token
* new renderer
* new compatible variant

### MAJOR

Breaking contract changes.

```text
2.0.0
```

Examples:

* rename component
* rename token
* remove variant
* change semantic behavior

The contract MUST be updated before implementation changes. This preserves the contract-first governance already defined for Qahera.

---

# 53. Governance

Every release MUST preserve:

```text
Contract Integrity
Token Integrity
Renderer Parity
Accessibility
RTL
AI Discoverability
Backward Compatibility
```

A release is rejected if:

```text
contract ≠ renderer
token ≠ implementation
metadata ≠ behavior
LTR ≠ RTL semantics
```

---

# 54. Architecture Invariants

The following are non-negotiable:

### Invariant 1

```text
YAML is authoritative.
```

### Invariant 2

```text
Generated files are never the source of truth.
```

### Invariant 3

```text
Tokens precede styling.
```

### Invariant 4

```text
Contracts precede implementations.
```

### Invariant 5

```text
RTL is first-class.
```

### Invariant 6

```text
AI metadata is part of the component.
```

### Invariant 7

```text
Renderer differences must not create semantic differences.
```

### Invariant 8

```text
The consuming developer owns copied source.
```

### Invariant 9

```text
Heritage does not contaminate the neutral technical core.
```

### Invariant 10

```text
Qahera and TidyFactor remain separate products.
```

---

# 55. Future Compiler

The long-term architecture permits:

```text
                QAHERA COMPILER

                    YAML
                      │
                      ▼
                Parser / Loader
                      │
                      ▼
             Normalized Component AST
                      │
          ┌───────────┼────────────┐
          ▼           ▼            ▼
       CSS/HTML      PHP          React
          │           │            │
          ▼           ▼            ▼
        HTMX     Web Components   Future
```

Potential future targets:

```text
Vue
Svelte
Astro
Blade
Twig
Solid
```

Adding a renderer MUST NOT require redefining the design system.

---

# 56. Future Pattern System

Components are not the final abstraction.

Qahera may eventually define:

```text
Components
   ↓
Patterns
   ↓
Sections
   ↓
Page Archetypes
```

Examples:

```text
Authentication Form
Checkout Form
Search Interface
Settings Form
Dashboard Header
Empty State
Confirmation Flow
```

Patterns SHOULD compose existing components.

They SHOULD NOT duplicate component definitions.

---

# 57. Future Theme System

Themes sit above the core.

```text
Qahera Core
      │
      ▼
Theme Tokens
      │
 ┌────┼─────┐
 ▼    ▼     ▼
Default Cairo Heritage Corporate
```

A theme MAY alter:

* colors
* typography
* radius
* shadows
* motion
* visual density

without changing component semantics.

---

# 58. Future Heritage Products

Examples:

```text
Qahera Cairo
Qahera Alexandria
Qahera Qena
Qahera Egyptian Heritage
Islamic Cairo Theme
Egyptian Education Theme
```

These are products/themes built **on** Qahera.

They are not part of Qahera Core.

---

# 59. Relationship Between Core and Family

```text
                 QAHERA CORE
                     │
       ┌─────────────┼─────────────┐
       │             │             │
     Tokens       Contracts      Recipes
       │             │             │
       └─────────────┼─────────────┘
                     │
                Renderers
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
        Qahera      Alex       Qena
          │          │          │
          └──────────┼──────────┘
                     ▼
             Templates / Apps
```

---

# 60. Strategic Position

Qahera should not position itself as:

> "Another Tailwind component library."

The stronger definition is:

> **Qahera is an AI-Native UI development system that gives developers and AI agents a shared design language.**

Its competitive advantage is the combination of:

```text
Design Tokens
+
Component Contracts
+
Recipes
+
AI Metadata
+
Context Efficiency
+
RTL
+
Accessibility
+
Multiple Renderers
+
Source Ownership
+
Deterministic Governance
```

---

# 61. North Star

The north-star statement is:

> **Build once. Understand once. Reuse everywhere.**

For AI-assisted development:

> **If a developer can understand the system quickly, an AI agent should be able to understand it even faster.**

---

# 62. Success Criteria

Qahera succeeds when a developer can:

```text
Find a component quickly
Understand it quickly
Copy it quickly
Customize it safely
Ship it confidently
```

And an AI agent can:

```text
Discover
Understand
Select
Compose
Implement
Validate
```

without loading the entire design system into context.

---

# 63. Final Architectural Model

```text
                         QAHERA

                 AI-NATIVE UI SYSTEM
                         │
             ┌───────────┼───────────┐
             │           │           │
           TOKENS     CONTRACTS    RECIPES
             │           │           │
             └───────────┼───────────┘
                         │
                  NORMALIZED MODEL
                         │
              ┌──────────┼──────────┐
              │          │          │
           BEHAVIOR   ACCESSIBILITY  RTL
              │          │          │
              └──────────┼──────────┘
                         │
                     RENDERERS
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
      HTML              PHP             React
        │               HTMX               │
        └────────────────┼─────────────────┘
                         │
                    AI METADATA
                         │
                     VALIDATION
                         │
                       CLI
                         │
                    Future MCP
                         │
                         ▼
                  DEVELOPER PROJECT
                         │
                         ▼
              TEMPLATES / PRODUCTS
```

---

# 64. Specification Status

This specification defines the foundational architecture.

The following documents SHOULD be created next:

```text
01. TOKEN-SPEC.md
02. COMPONENT-SPEC.md
03. RECIPE-SPEC.md
04. BEHAVIOR-SPEC.md
05. RENDERER-SPEC.md
06. AI-SPEC.md
07. ACCESSIBILITY-SPEC.md
08. RTL-SPEC.md
09. CLI-SPEC.md
10. MCP-SPEC.md
11. GOVERNANCE.md
12. CONTRIBUTING.md
```

These documents MUST derive from this specification and MUST NOT introduce contradictory architectural rules.

---

# 65. Canonical Principle

The final architectural rule of Qahera is:

> **Qahera is a shared language between Design, Code, Developer and AI.**

It is therefore not merely a library of visual components.

It is a **machine-readable, developer-owned, contract-driven UI development system**.
