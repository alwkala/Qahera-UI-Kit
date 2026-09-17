# Qahera UI Kit — Template Layer (20 Production Templates)

The Template Layer is the highest composition level in the **Qahera UI Kit** hierarchy:

```text
Design Tokens (12 Cairo Themes)
     ↓
Components (46 Canonical Primitives)
     ↓
Patterns (20 Higher-Order UX Units)
     ↓
Templates (20 Ready-to-Use Production Screens)
```

---

## Non-Negotiable Invariants for Templates

1. **Zero Raw CSS / Slop:** Templates compose components and patterns exclusively. No arbitrary inline hex codes, ad-hoc physical margins (`margin-left`), or unvetted CSS.
2. **Strict RTL First:** Every template renders with 100% logical layout integrity in both RTL (`dir="rtl"`) and LTR (`dir="ltr"`).
3. **Typography Discipline:** Primary display and headings use **Alexandria** (`--qhr-font-heading`), body copy uses **Cairo** (`--qhr-font-body`), and code uses **JetBrains Mono** (`--qhr-font-mono`). Supported secondary alternatives include **El Messiri** (for luxury/heritage display) and **Tajawal**. The font **Amiri** is strictly prohibited in UI components.
4. **Accessible Landmarks:** Templates include semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<search>`).

---

## Canonical 20 Template Catalog

| Track | Directory | Composed Patterns | Target Experience |
|---|---|---|---|
| **Flagship Portal** | [`templates/flagship-portal/`](./flagship-portal/) | `dashboard-stat`, `filter-bar`, `search-toolbar` | Flagship platform portal, Cairo skyline panorama, live theme atlas, and multi-target code engine |
| **Academic & Executive** | [`templates/academic-executive/`](./academic-executive/) | `dashboard-stat`, `filter-bar`, `search-toolbar` | Luxury academic chair showcase, publications archive with book elevation shadows, and research dossiers |
| **Authentication** | [`templates/auth/`](./auth/) | `form-actions`, `empty-state` | Login, Register, Forgot Password, Biometric 2FA |
| **Dashboard** | [`templates/dashboard/`](./dashboard/) | `dashboard-stat`, `data-table-toolbar`, `pagination` | Executive KPI analytics & operational telemetry |
| **Admin CRUD** | [`templates/admin/`](./admin/) | `data-table-toolbar`, `filter-bar`, `pagination`, `confirmation` | Resource management, batch actions, data grid, RBAC |
| **Fintech & Wealth** | [`templates/fintech-wealth/`](./fintech-wealth/) | `dashboard-stat`, `metric-comparison-grid` | Multi-currency liquidity, portfolio allocation, and compliance |
| **Landing** | [`templates/landing/`](./landing/) | `editorial-story`, `vip-membership`, `form-actions` | Cinematic luxury marketing hero, value propositions, CTA |
| **E-Commerce** | [`templates/ecommerce/`](./ecommerce/) | `search-toolbar`, `filter-bar`, `pagination`, `luxury-product-card` | Luxury product grid, category facets, slide cart, and checkout summary |
| **Shop & Sidebar Filters** | [`templates/shop/`](./shop/) | `sidebar-filters`, `search-toolbar`, `active-filter-chips`, `pagination` | Faceted catalog with Category, Price, Color, Size, and Brand filters |
| **Education & LMS** | [`templates/education/`](./education/) | `dashboard-stat`, `filter-bar`, `questionnaire` | Digital academy landing, student LMS portal, 12-week marathon syllabus |
| **File Manager** | [`templates/file-manager/`](./file-manager/) | `file-manager-grid`, `search-toolbar` | Cloud storage meters, folder tree, grid/list asset views, and upload zone |
| **Helpdesk & AI Kanban** | [`templates/helpdesk-kanban/`](./helpdesk-kanban/) | `kanban-board`, `chat-stream`, `search-toolbar`, `confirmation` | Operations triage console, 3-column ticket kanban, and AI copilot |
| **Documentation** | [`templates/documentation/`](./documentation/) | `search-toolbar`, `pagination` | Technical reference, sidebar navigation, code samples, TOC |
| **Error & Status Suite** | [`templates/errors/`](./errors/) | `empty-state`, `form-actions` | Resilient 404 (Not Found), 500 (Server Error), and Maintenance Downtime |
| **Charts & Telemetry** | [`templates/charts/`](./charts/) | `dashboard-stat`, `data-table-toolbar` | Chart.js canvas, smooth curves/donuts, real-time sparklines, and telemetry tiles |
| **Layouts & Structures** | [`templates/layouts/`](./layouts/) | `dashboard-stat`, `search-toolbar`, `pagination` | Boxed Layout (1380px), Fixed Layout (Header & Sidebar), and Collapsed Mini-Sidebar Rail |
| **Box Cards & Containers** | [`templates/box-cards/`](./box-cards/) | `dashboard-stat`, `form-actions` | Basic Box, Advanced Box (collapse, fullscreen, reload), Box Color, and Group Box |
| **Tables & Data Grids** | [`templates/tables/`](./tables/) | `data-table-toolbar`, `pagination`, `filter-bar` | Multi-sort tables, bulk selection, inline cell editing, and density modes |
| **Transactional Emails** | [`templates/emails/`](./emails/) | `form-actions`, `empty-state` | Welcome Email, Verify Email (OTP), Change Password (Security Alert), and Invoice Receipt |
| **Widgets & Modular Cards** | [`templates/widgets/`](./widgets/) | `dashboard-stat`, `editorial-story` | Statistic KPI Tiles, Chart Widgets, Social Counters, Weather Telemetry, and Task Feeds |
