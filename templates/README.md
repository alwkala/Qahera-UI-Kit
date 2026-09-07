# Qahera UI Kit — Template Layer v1.0

The Template Layer is the highest composition level in the **Qahera UI Kit** hierarchy:

```text
Design Tokens
     ↓
Components (18 Reference Implementations)
     ↓
Patterns (8 Core UX Units)
     ↓
Templates (Ready-to-Use Production Screens)
```

---

## Non-Negotiable Invariants for Templates

1. **Zero Raw CSS / Slop:** Templates compose components and patterns exclusively. No arbitrary inline hex codes, ad-hoc physical margins (`margin-left`), or unvetted CSS.
2. **Strict RTL First:** Every template renders with 100% logical layout integrity in both RTL (`dir="rtl"`) and LTR (`dir="ltr"`).
3. **Typography Discipline:** Primary headings and body use **Cairo** (`--qhr-font-heading`, `--qhr-font-body`). Supported secondary alternatives include **El Messiri** (for luxury/heritage display) and **Tajawal** (alternative clean body). Latin text uses **Plus Jakarta Sans** or **Inter**. Amiri is strictly prohibited.
4. **Accessible Landmarks:** Templates include semantic HTML5 landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<search>`).

---

## Canonical Template Tracks

| Track | Directory | Composed Patterns | Target Experience |
|---|---|---|---|
| **Authentication** | [`templates/auth/`](file:///templates/auth/) | `form-actions`, `empty-state` | Login, Register, Forgot Password, 2FA |
| **Dashboard** | [`templates/dashboard/`](file:///templates/dashboard/) | `dashboard-stat`, `data-table-toolbar`, `pagination` | Executive KPI analytics & operational telemetry |
| **Admin CRUD** | [`templates/admin/`](file:///templates/admin/) | `data-table-toolbar`, `filter-bar`, `pagination`, `confirmation` | Resource management, batch actions, data grid |
| **Landing** | [`templates/landing/`](file:///templates/landing/) | `form-actions`, `empty-state` | Luxury marketing hero, value propositions, CTA |
| **E-Commerce** | [`templates/ecommerce/`](file:///templates/ecommerce/) | `search-toolbar`, `filter-bar`, `pagination` | Product grid, category facets, checkout summary |
| **Shop & Sidebar Filters** | [`templates/shop/`](file:///templates/shop/) | `sidebar-filters`, `search-toolbar`, `active-filter-chips`, `pagination` | Faceted catalog with Category, Price, Color, Size, and Brand filters |
| **Education** | [`templates/education/`](file:///templates/education/) | `dashboard-stat`, `filter-bar` | Course dashboard, lesson syllabus, progress tracker |
| **Documentation** | [`templates/documentation/`](file:///templates/documentation/) | `search-toolbar`, `pagination` | Technical reference, sidebar navigation, code samples |
| **Error & Status Suite** | [`templates/errors/`](file:///templates/errors/) | `empty-state`, `form-actions` | Resilient 404 (Not Found), 500 (Server Error), and Maintenance Downtime |
| **Charts & Telemetry** | [`templates/charts/`](file:///templates/charts/) | `dashboard-stat`, `data-table-toolbar` | Chart.js Canvas, Morris smooth curves/donuts, Flot streaming telemetry, Inline sparklines, and Peity micro-charts |
| **Layouts & Structures** | [`templates/layouts/`](file:///templates/layouts/) | `dashboard-stat`, `search-toolbar`, `pagination` | Boxed Layout (1380px), Fixed Layout (Header & Sidebar), and Collapsed Mini-Sidebar Rail |
| **Box Cards & Containers** | [`templates/box-cards/`](file:///templates/box-cards/) | `dashboard-stat`, `form-actions` | Basic Box (outline, elevated, flat), Advanced Box (collapse, fullscreen, reload, dismiss), Box Color (semantic tones), and Group Box (connected clusters) |
| **Tables & Data Grids** | [`templates/tables/`](file:///templates/tables/) | `data-table-toolbar`, `pagination`, `filter-bar` | Basic Tables (striped, bordered, density modes), Interactive Data Tables (search, sort, multi-select, pagination), and Editable Tables (inline & row edit) |
| **Transactional Emails** | [`templates/emails/`](file:///templates/emails/) | `form-actions`, `empty-state` | Welcome Email, Verify Email (OTP), Change Password (Security Alert), User Update, Expired Card Notice, and Closed Account |
| **Widgets & Modular Cards** | [`templates/widgets/`](file:///templates/widgets/) | `dashboard-stat`, `editorial-story` | Statistic KPI Tiles, Chart Widgets (Sparklines, Bars, Ring), Social Counters, Weather Telemetry (4-day forecast), Blog Editorial Cards, and List Widgets (To-Do, Timeline, Leaderboard) |
| **Helpdesk & AI Kanban** | [`templates/helpdesk-kanban/`](file:///templates/helpdesk-kanban/) | `kanban-board`, `chat-stream`, `search-toolbar`, `confirmation` | Operations console, 3-column ticket triage, and conversational AI copilot |




