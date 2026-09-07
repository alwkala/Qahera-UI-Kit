# 08. RTL-SPEC: Bidirectional Engineering & Arabic Typography

**Status:** Canonical Subordinate Specification  
**Authority:** QAHERA-SPEC §7, §17, §23, §24  

---

## 1. Logical CSS Properties (The First-Class Law)

Qahera strictly enforces CSS Logical Properties across all tokens, native classes, and Tailwind utility strings.

| Prohibited Physical Property | Mandatory Logical Property |
|---|---|
| `margin-left` / `margin-right` | `margin-inline-start` / `margin-inline-end` |
| `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end` |
| `left` / `right` | `inset-inline-start` / `inset-inline-end` |
| `border-left` / `border-right` | `border-inline-start` / `border-inline-end` |
| `text-align: left` / `text-align: right` | `text-align: start` / `text-align: end` |

This guarantees that toggling `<html dir="rtl">` or `<html dir="ltr">` seamlessly mirrors layouts without adding clumsy `.rtl` overrides.

---

## 2. Arabic Typography Standard

- **Headings & Hero Display:** **El Messiri** (`--qhr-font-heading`) — clean, geometric, contemporary Cairo elegance.
- **Body & Paragraphs:** **Tajawal** (`--qhr-font-body`) — modern, open letterforms, exceptional readability on high-DPI screens.
- **Amiri is strictly prohibited** for UI controls and headings.
- **Latin Fallback:** **Plus Jakarta Sans** / **Inter** (`sans-serif`).
