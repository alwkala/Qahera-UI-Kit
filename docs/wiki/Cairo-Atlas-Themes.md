# Cairo Atlas — The 13 Neighborhood Themes

Qahera UI Kit features **13 authentic Cairo neighborhood themes** that synthesize recognized global design movements with genuine Egyptian urban and cultural contexts.

Themes operate strictly as semantic token overrides via `[data-theme="..."]`, maintaining 100% component contract purity and 100% logical layout.

---

## The Thematic Topography Matrix

| Theme Identifier | Urban / Cultural Context | Design Movement | Primary Color | Accent Color | Border Radius | Visual Signature |
|---|---|---|---|---|---|---|
| `zamalek` | Zamalek Island | Art Deco & Mediterranean Neo-Classical | `#0F3A40` | `#D4AF37` | `10px` | Deep Nile teal, Egyptian gold accents, balanced proportions |
| `downtown` | Downtown Khedivial Cairo | Belle Époque Parisian Grandeur | `#4A1525` | `#C5A059` | `6px` | Rich burgundy, brass borders, structured symmetry |
| `heliopolis` | Heliopolis Oasis | Baron Empain Neo-Mamluk & Hindu-Gothic | `#7C3F1D` | `#E0A96D` | `8px` | Terracotta warm stone, desert amber, sculpted geometry |
| `garden-city` | Garden City | Curvilinear Serpentine Art Nouveau | `#1C3B2B` | `#A3B899` | `14px` | Forest foliage green, sage accents, organic rounded corners |
| `maadi` | Maadi Suburb | British Garden Suburb Greenery | `#2D4739` | `#8FBC8F` | `12px` | Earthy tree bark, soft eucalyptus greens, quiet composure |
| `roxy` | Roxy & Korba | Mid-Century Modern 1950s Chic | `#D97706` | `#F59E0B` | `4px` | Warm tangerine ochre, dynamic contrast, clean modernist lines |
| `sakakini` | Sakakini Palace | Rococo & High Baroque Extravagance | `#581C87` | `#F472B6` | `16px` | Deep royal amethyst, jewel-toned rose quartz, ornate curves |
| `hussein` | Historic Islamic Cairo | Fatimid & Mamluk Stucco Geometry | `#1E3A5F` | `#EAB308` | `8px` | Cobalt lapis lazuli, polished brass, arabesque rhythm |
| `shubra` | Shubra Neighborhood | Vernacular Pop Vibrancy & Community | `#B91C1C` | `#F97316` | `4px` | Vibrant carmine crimson, bright coral amber, high kinetic energy |
| `zaytoun` | El Zaytoun Olive Groves | Mediterranean Olive & Vernacular Terracotta | `#365314` | `#A3E635` | `10px` | Rich olive grove greens, warm limestone, grounded serenity |
| `marg` | El Marg & Nile Oasis | Palm Grove Heritage & Nile Delta Earth | `#047857` | `#10B981` | `14px` | Verdant date palm greens, golden border rims, fresh contrast |
| `new-cairo` | New Cairo Administrative Capital | Hyper-Modernist Glassmorphism | `#06B6D4` | `#22D3EE` | `22px` | Frosted glass blur (22px), cyber cyan halos, deep dark backgrounds |
| `alwkala` | Alwkala Studio Flagship | Egyptian Sovereign Amber & Obsidian | `#B45309` | `#F59E0B` | `8px` | Obsidian dark canvas, sculpted gold typography, bronze telemetry |

---

## Dynamic Switching

Activate any theme globally across your application via the `data-theme` attribute on the root `<html>` element:

```html
<!-- Instant dynamic theme activation -->
<html lang="ar" dir="rtl" data-theme="heliopolis" data-mode="dark">
```

Or switch programmatically in JavaScript:
```javascript
document.documentElement.setAttribute('data-theme', 'zamalek');
document.documentElement.setAttribute('data-mode', 'light');
```
