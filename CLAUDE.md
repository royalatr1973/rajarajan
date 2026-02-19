# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repo contains multiple independent web projects. The primary project is **`tamil-temples/`** — a static temple encyclopedia portal covering 20+ sacred temple circuits across India. Other directories (`ajis-bakes/`, `mayuravalli-silks/`, etc.) are unrelated standalone sites. The root `index.html` is a WhatsApp Chat AI Search tool, also unrelated.

## Architecture (tamil-temples/)

**Zero-build, vanilla HTML/CSS/JS.** No bundler, no framework, no package.json. Open any HTML file directly in a browser.

### Data Flow & Global Window Objects

Scripts must load in this order (all pages follow it):

1. `temple-photos.js` — Section theme colors + SVG fallback image generator
2. `divyadesam-data.js` — 108 Divya Desam temple records
3. `paadal-petra-data.js` — 276 Paadal Petra Sthalam records
4. `site-data.js` — **Orchestrator**: defines `window.sectionMeta`, `window.extraSections`, `window.getSectionData(type)`
5. Page script (`home.js` | `section.js` | `detail.js`)
6. `tour-packages.js` — Tour operator data + auto-renderer
7. Map scripts (conditional): `divyadesam-map.js`, `jyotirlinga-map.js`, or `temple-map-engine.js`

### The Section Type System

Every section page sets `<body data-section-type="TYPE">`. The type string keys into three registries:

- **`window.sectionMeta[type]`** — title, description, page link (used by breadcrumbs, home search)
- **`window.extraSections[type]`** — array of temple objects (for most sections)
- **`window.getSectionData(type)`** — universal getter that normalizes data from any source:
  - `'dd'` → transforms `divyaDesams[]` from divyadesam-data.js
  - `'pps'` → transforms `paadalPetraSthalams[]` from paadal-petra-data.js
  - All others → returns `window.extraSections[type]`

### URL Routing

```
index.html                        → Home (global search across 9 sections)
[section].html                    → Section list page (search + cards + optional map)
temple.html?type=TYPE&id=ID       → Temple detail page
```

### Canonical Temple Object Shape

All sections normalize to:
```js
{ id, name, location, district, deity, summary, image, raw, n? }
```
The `raw` field preserves source-specific extended data (timings, lat/lng, festivals, sthalaVaralaru, etc.).

### Section Type Codes

| Type | Section | Data Source |
|------|---------|-------------|
| `dd` | 108 Divya Desam | divyadesam-data.js |
| `pps` | 276 Paadal Petra | paadal-petra-data.js |
| `featured`, `navagraha`, `panchabhootha`, `kumbakonam`, `kanchipuram`, `vinayagar`, `murugan`, `amman`, `jyotirlinga`, `chardham`, `shaktipeethas`, `navatirupathi`, `sapthavidanga`, `sapthasthanam`, `ashtaveerattanam`, `panchasabhai`, `panchaaranya` | Various circuits | site-data.js `extraSections` |

### Adding a New Temple Section

1. Add entry to `window.sectionMeta` in `site-data.js`
2. Add temple array to `window.extraSections` in `site-data.js` (include `lat`/`lng` per temple if map desired)
3. Create `[section].html` — copy any existing section page, change `data-section-type`
4. Add images to `images/[type]/` (SVG fallbacks auto-generate if missing)
5. Optionally add tour packages to `window.tourPackages` in `tour-packages.js`
6. For interactive map: `TempleMapEngine.init(type)` works automatically if temples have coordinates

### Map System

Two implementations:
- **`divyadesam-map.js`** and **`jyotirlinga-map.js`** — Dedicated maps with hardcoded coordinates and pilgrimage sequences
- **`temple-map-engine.js`** — Generic reusable engine (`TempleMapEngine.init(sectionType)`) that reads coordinates from `extraSections`. Generates orthodox (sequential) and practical (nearest-neighbor) routes.

All maps use Leaflet.js 1.9.4 via CDN (OpenStreetMap tiles, no API key needed).

### Image Fallback Chain

`temple-photos.js` defines per-section color themes. When an `<img>` fails to load, the `onerror` handler falls back to `window.getSectionFallback(type, name)` which generates a themed SVG data URI with the temple name.

### Tour Packages

`tour-packages.js` contains `window.tourPackages` keyed by section type. The self-executing renderer at the bottom inserts a card grid after `#templeList` on any section page that has matching package data.

## External Dependencies

- **Leaflet.js 1.9.4** (CDN) — Maps
- **Google Fonts** — Playfair Display, Inter
- No npm packages or build tools

## CSS Design Tokens

Defined as CSS custom properties in `:root` of `styles.css`:
- `--saffron: #E65100` / `--saffron-light: #FF6F00` — Primary accent
- `--bg: #FFF8E1` / `--bg-soft: #FFF3CC` — Background
- `--card: #FFFDE7` — Card background
- `--text: #3E2723` / `--muted: #6D4C41` — Typography
- `--border: #FFCC80` — Borders
