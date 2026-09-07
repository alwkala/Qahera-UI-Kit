# Qahera UI Kit (قاهرة)

> **AI-Native, Contract-Driven Design System & Multi-Target Component Architecture.**  
> Built by **Alwkala** · Coordinated with the **TidyFactor** Ecosystem · Cairo, Egypt.

---

## 🏛️ The Core Equation

$$\mathbf{\text{Qahera UI Kit v1.0}} = \mathbf{\text{Design System}} + \mathbf{\text{Registry}} + \mathbf{\text{AI Decision Layer}}$$

> **Qahera is NOT merely a Component Library + Compiler.**  
> It is an integrated design infrastructure where visual tokens, component contracts, compositional patterns, a canonical machine-readable registry, and an AI decision layer empower developers and AI agents to build interfaces with zero vocabulary drift and zero visual hallucination.

### The 3 Core Pillars

1. **Design System:**
   - 3-Tier Design Tokens (`--qhr-*`), Arabic typography hierarchy (*Cairo* as primary, *El Messiri* / *Tajawal* as supported alternatives), RTL as core infrastructure, 30 reference components, 15 composite UX patterns, and 15 production template tracks.
2. **Canonical Registry:**
   - Deterministic single-source of truth (`generated/registry.json`, `components.json`) indexing IDs, contracts, recipes, behaviors, and accessibility trees with SHA-256 source hashing and zero runtime churn.
3. **AI Decision Layer:**
   - Context-aware intelligence matrix (WHAT, WHEN, HOW, WHY NOT), task-driven recipe use-cases (`save-form`, `delete-confirm`), explicit anti-patterns, and direct pattern recommendations eliminating AI guessing.

| Conventional UI Kit | Qahera UI Kit |
|---|---|
| Human-only documentation | Human + AI-readable metadata (WHAT, WHEN, HOW, WHY NOT) |
| Ad-hoc classes & arbitrary CSS | Strict Semantic Contracts + Controlled Prop Vocabulary |
| Hardcoded values & color hexes | 3-Tier Design Tokens (`--qhr-*`) as the sole visual source |
| Single-framework lock-in | One YAML Recipe → Multi-Target Renderers (HTML, PHP, HTMX, React, JS Web Components) |
| Runtime package bloat | Source Ownership (shadcn/ui style copy-paste, zero-runtime lock-in) |
| RTL as an afterthought | RTL/LTR Parity & Arabic Typography (*Cairo* primary / *El Messiri* display) in Core |

---

## 📊 تقرير الحالة الموجز · System Status & Health

> **الحالة الراهنة:** `v1.5.0 Production-Ready` · **فحص الجودة والـ CI:** `100% Passed (0 Errors, 0 Warnings)`  
> للمزيد من التفاصيل الكاملة، راجع: **[سجل التغييرات (CHANGELOG.md)](CHANGELOG.md)**

* **تزامن المكونات والأنماط (1:1 Parity):** 42 عقداً معمارياً (`contracts/components/`) = 42 وصفة (`recipes/`) = 20 نمطاً معماريّاً (`patterns/`) = 62 صفحة معاينة تفاعلية مستقلة (`examples/previews/`).
* **فهرس الأنماط المعياري والحزمة الإنتاجية:** يعمل `components.css` كـ `@import manifest` ذري بدون أي تكرار للكود، مع تصدير الحزمة الإنتاجية المجمعة في `dist/qahera.css` (بحجم 211.83 KB و 28.32 KB مضغوطة Gzip) وحزمة التضاريس الثيمية `dist/qahera-themes.css` (38.98 KB).
* **إمكانية الوصول والاتجاه (A11y & RTL):** 100% خصائص منطقية Logical CSS عبر كافة الملفات الـ 46 · تباين ألوان معايير WCAG 2.1 AA بنسبة 100% · تصفير تام وحظر قاطع للإيموجي (`QAHERA-VISUAL-001`).
* **بصمة سيرفرية 0kb RSC:** 29 مكون خادم نقي (Pure Server Components) بـ 0kb جافاسكريبت للعميل و 15 مكون عميل معتمد للمهام التفاعلية.
* **فهرس المعاينة التفاعلي الحي (Universal Living Showcase Generator v3.0):** مركز استعراض حي تفاعلي متقدم (`examples/previews/index.html`) مع تبديل فوري لـ 12 ثيماً ثقافياً مصرياً، وفلترة ثلاثية، وتوليد ديناميكي لـ 62 ساحة اختبار مع شفرات نقية بدون أي تسريب نصوص.

---

## Canonical Specifications, Manifesto & Roadmap (v1.0 Stack)

Qahera UI Kit is governed by its strategic manifesto, technical roadmap, and core specifications:

* **[System Status Report](docs/STATUS.md)**: Live system health metrics, component inventory, and audit status.
* **[Strategic Brand Manifesto](docs/00-BRAND-POSITIONING.md)**: The post-AI narrative, Human+AI symbiosis, brand voice, and anti-slop principles.
* **[Multi-Target Production Roadmap](ROADMAP.md)**: End-to-end integration roadmap for HTML, HTMX, Vanilla JS, and PHP Kernel.
* **[Token Specification v1.0](docs/01-TOKEN-SPEC.md)** (`tokens/`): 3-tier taxonomy, zero-dependency resolver, 225 resolved tokens.
* **[Component Specification v1.0](docs/02-COMPONENT-SPEC.md)** (`contracts/`): PascalCase naming, semantic anatomy, controlled slots, a11y maps, and AI decision matrix.
* **[Recipe Specification v1.0](docs/03-RECIPE-SPEC.md)** (`recipes/`): Deterministic styling logic connecting contracts to tokens.

---

## The 5 Architectural Layers

```text
Layer 1: Design Tokens       → tokens/ (YAML + CSS Custom Properties)
       ↓
Layer 2: Component Contracts → contracts/components/ (Prop vocabularies, slots, a11y)
       ↓
Layer 3: Component Recipes   → recipes/ (Structure, state maps, AI decision models)
       ↓
Layer 4: Behavior & Renderers → behavior/ (Alpine.js) & renderers/ (HTML, PHP, HTMX, React, JS Web Components)
       ↓
Layer 5: Developer Project    → Consuming app receives clean, editable, owned source code
```

---

## Controlled Vocabulary

Qahera strictly enforces standard component properties across all renderers:

* `variant`: `primary` | `secondary` | `outline` | `ghost` | `link` | `destructive`
* `size`: `xs` | `sm` | `md` | `lg` | `xl`
* `tone`: `neutral` | `info` | `success` | `warning` | `danger`
* `state`: `default` | `hover` | `focus` | `disabled` | `loading`

---

## The 42 Canonical Components (v1.5 Scope)

1. **Accordion** (`contracts/components/Accordion.yaml` · Disclosure)
2. **Alert** (`contracts/components/Alert.yaml` · Feedback)
3. **Avatar** (`contracts/components/Avatar.yaml` · Media / User Identity)
4. **BackToTop** (`contracts/components/BackToTop.yaml` · Scroll Action)
5. **Badge** (`contracts/components/Badge.yaml` · Status & Tags)
6. **Breadcrumb** (`contracts/components/Breadcrumb.yaml` · Navigation Trail)
7. **Button** (`contracts/components/Button.yaml` · Actions)
8. **Callout** (`contracts/components/Callout.yaml` · Editorial Insight Block)
9. **CanvasSparks** (`contracts/components/CanvasSparks.yaml` · Interactive VFX)
10. **Card** (`contracts/components/Card.yaml` · Containers)
11. **Carousel** (`contracts/components/Carousel.yaml` · Media Slider)
12. **Checkbox** (`contracts/components/Checkbox.yaml` · Selection)
13. **Chip** (`contracts/components/Chip.yaml` · Selection & Filter Tags)
14. **Divider** (`contracts/components/Divider.yaml` · Layout Separator)
15. **Dock** (`contracts/components/Dock.yaml` · Quick Access Application Dock)
16. **Drawer** (`contracts/components/Drawer.yaml` · Sliding Edge Panel)
17. **Dropdown** (`contracts/components/Dropdown.yaml` · Navigation & Action Menus)
18. **FileUpload** (`contracts/components/FileUpload.yaml` · Forms / File Ingestion)
19. **Input** (`contracts/components/Input.yaml` · Forms)
20. **Kbd** (`contracts/components/Kbd.yaml` · Data Display / Key Shortcut)
21. **Megamenu** (`contracts/components/Megamenu.yaml` · Rich Multi-Column Navigation)
22. **Menu** (`contracts/components/Menu.yaml` · Contextual & Action List)
23. **Modal** (`contracts/components/Modal.yaml` · Dialog Overlay)
24. **Navbar** (`contracts/components/Navbar.yaml` · Site Header & Navigation)
25. **Pagination** (`contracts/components/Pagination.yaml` · Multi-Page Data Navigation)
26. **Preloader** (`contracts/components/Preloader.yaml` · Application Boot Loader)
27. **Progress** (`contracts/components/Progress.yaml` · Metric Status Bar)
28. **Radio** (`contracts/components/Radio.yaml` · Selection)
29. **Rating** (`contracts/components/Rating.yaml` · Feedback / Reviews)
30. **Ribbon** (`contracts/components/Ribbon.yaml` · Corner Status Badge)
31. **Select** (`contracts/components/Select.yaml` · Forms / Dropdown)
32. **Skeleton** (`contracts/components/Skeleton.yaml` · Feedback / Loading Silhouette)
33. **Spinner** (`contracts/components/Spinner.yaml` · Indeterminate Micro-Loader)
34. **Stepper** (`contracts/components/Stepper.yaml` · Multi-Step Process)
35. **Switch** (`contracts/components/Switch.yaml` · Accessible Binary Toggle)
36. **Table** (`contracts/components/Table.yaml` · Data Display)
37. **Tabs** (`contracts/components/Tabs.yaml` · Content Navigation)
38. **Textarea** (`contracts/components/Textarea.yaml` · Forms)
39. **Timeline** (`contracts/components/Timeline.yaml` · Chronological Event Stream)
40. **Toast** (`contracts/components/Toast.yaml` · Notification Overlay)
41. **Tooltip** (`contracts/components/Tooltip.yaml` · Micro-feedback)
42. **Treeview** (`contracts/components/Treeview.yaml` · Navigation / Hierarchical Explorer)

---

## Quickstart

### 1. Using CSS Custom Properties
Include `tokens/tokens.css` in your HTML or application bundle:

```html
<link rel="stylesheet" href="tokens/tokens.css">
```

### 2. Rendering a Component (Native HTML)
```html
<button class="qhr-btn qhr-btn--primary qhr-btn--md" data-variant="primary" data-size="md">
  <span>حفظ التغييرات</span>
</button>
```

### 3. Rendering in PHP (Plates)
```php
<?= $this->fetch('qahera/button', [
    'label'   => 'تأكيد الحجز',
    'variant' => 'primary',
    'size'    => 'md'
]) ?>
```

### 4. Rendering in React (TSX)
```tsx
import { Button } from '@/components/qahera/Button';

export function Action() {
  return <Button variant="primary" size="md">Confirm</Button>;
}
```

---

## Project Structure

```text
qahera-ui-kit/
├── SPEC.md                  # Canonical Normative Specification
├── AGENTS.md                # AI Agent Instructions & Governance Rules
├── docs/                    # Subordinate Specifications (01-12) & Archive
├── contracts/               # Component & Prop Contracts (YAML)
│   └── components/          # 42 Canonical PascalCase Component Contracts
├── tokens/                  # Design Tokens (YAML + tokens.css + brand.json)
├── recipes/                 # 42 Component Recipes (YAML)
├── patterns/                # 20 Compositional UX Patterns (YAML)
├── templates/               # 18 Production Templates & Advanced Dashboards
├── behavior/                # Framework-Free Alpine.js Interactive Modules
├── renderers/               # Framework Implementations (HTML, PHP, HTMX, React)
├── schemas/                 # Validation Schemas (JSON/YAML Schema)
├── ai/                      # AI Progressive Context Manifests
├── cli/                     # Compiler & Verification Tooling
│   ├── token-resolver.js    # 3-Tier Recursive Token Reference Resolver
│   ├── recipe-compiler.js   # Normalized Style Model Compiler
│   └── compile.js           # Primary Build & Validation Orchestrator
└── examples/                # Interactive Kitchen Sink Demos
```

---

## Sovereignty & Licensing

* **Project Owner:** [Alwkala](https://alwkala.com)
* **License:** [MIT](LICENSE)
* **TidyFactor Compatibility:** Fully compatible with `tidyfactor-design`, `tidyfactor-html`, `tidyfactor-php`, `tidyfactor-htmx`, and `tidyfactor-nextjs-saas`.
