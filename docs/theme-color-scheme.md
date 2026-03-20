# Hack-A-Bot 2026 Theme and Color Scheme

This site uses a dark, high-contrast theme with cool gray neutrals and a red accent system.

## Core Palette Tokens

Defined in `src/index.css`:

| Token | Value | Usage |
|---|---|---|
| `--bg-1` | `#101113` | Main page background, app canvas |
| `--bg-2` | `#161922` | Section and elevated dark surfaces |
| `--panel` | `rgba(255,255,255,0.05)` | Card/panel backgrounds |
| `--border` | `rgba(255,255,255,0.08)` | Default borders and dividers |
| `--text` | `#f1f3f5` | Primary text |
| `--text-dim` | `#c1c2c5` | Secondary/supporting text |
| `--accent-strong` | `#ef233c` | Primary accent (links, active states) |
| `--accent-stronger` | `#d90429` | Hover/stronger accent |
| `--accent-soft` | `rgba(239,35,60,0.24)` | Subtle accent fills |

## Brand/Legacy Palette

Also defined in `src/index.css`:

| Token | Value |
|---|---|
| `--space-cadet` | `#2b2d42` |
| `--cool-gray` | `#8d99ae` |
| `--antiflash-white` | `#edf2f4` |
| `--red-pantone` | `#ef233c` |
| `--fire-engine-red` | `#d90429` |
| `--rosewood` | `var(--cool-gray)` |
| `--falu-red` | `var(--red-pantone)` |
| `--auburn` | `var(--fire-engine-red)` |

## Element-Level Color Mapping

| Element | Colors |
|---|---|
| Page background | `var(--bg-1)` |
| Section backgrounds | `var(--bg-1)` / `var(--bg-2)` with layered gradients |
| Cards/Papers | `var(--panel)` + `1px solid var(--border)` |
| Primary text | `var(--text)` |
| Secondary text | `var(--text-dim)` |
| Links | `var(--accent-strong)` -> hover `var(--accent-stronger)` |
| Header/Nav bar | `var(--bg-1)` with `rgba(255,255,255,0.08)` border |
| Nav link default | `rgba(241,243,245,0.82)` |
| Nav link active/underline | `var(--accent-strong)` |
| Mobile nav panel | `var(--bg-2)` with dark shadow |
| CTA gradient button (`.btn-gradient`) | `linear-gradient(90deg, rgba(43,45,66,0.8), #ef233c, #d90429)` |
| Secondary utility button (`.btn-soft`) | `linear-gradient(180deg, rgba(38,40,54,0.85), rgba(23,24,32,0.9))` |
| Accent chips/badges | Red translucent fills: `rgba(239,35,60,0.18-0.24)` + red borders |
| Countdown panel | Deep dark base + red glows (`rgba(239,35,60,...)`) |
| Footer | `var(--bg-2)` with top border `var(--border)` |
| Focus outline | `2px solid var(--auburn)` |

## Additional Explicit Surface Colors

Used for QR/modal and certain overlays:

- `rgb(24, 24, 32)` (QR card, nav modal surfaces)
- `#08090E` (modal overlay)
- `rgba(22,24,35,0.92)` (venue callout bubbles)
- `rgba(255,255,255,0.04-0.12)` (subtle dark UI elevation and borders)

## Merch Page-Specific Colors

From `public/merch/products/*.html`:

- Browser theme color: `#0b0b0d`
- Media slide dark surface: `#0f1318`
- Size/control dark chip: `#212730`
- Accent pill text: `#ffacb7`
- Muted light text variant: `#d9dde4`
- Light neutral surface/text references: `#edf2f4`, `#ffffff`
- Modal backdrop tone: `rgba(5, 7, 10, 0.93)`
- Modal control surface: `rgba(15, 19, 24, 0.82)`

## Gradient Theme Direction

From `src/app/layout/Gradients.css` and global styles:

- Crimson mesh: red + cool gray + light neutral haze over dark canvas
- Rosewood radial: cool-gray glow with faint red hotspot
- Falu diagonal: cool-gray diagonal wash over dark gradient
- Auburn wave: red/auburn radial glows over dark gradient

Overall visual direction: dark technical backdrop, cool-neutral structure, red accent emphasis for interactions and hierarchy.
