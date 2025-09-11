Hack‑A‑Bot 2026 — Single Page Site (Vite + React + Mantine)
================================================================

Development
-----------

- Install deps: `npm i`
- Run dev server: `npm run dev`

Project structure
-----------------

- `src/app/` — App code (theme, layout, components)
- `src/app/data/` — JSON stubs for content (edit these to add real copy)
- `public/` — Static assets (sponsors and past years images)

How to add content
------------------

- Edit `src/app/data/event.json` for name, startsAt, location, and form URLs.
- Add schedule items to `src/app/data/schedule.json` (leave empty to show placeholder).
- Drop sponsor logos into `public/sponsors/previous/` and reference in `src/app/data/sponsors.json`.
- Populate past year photos under `public/past/2024` and `public/past/2025`, and list them in `src/app/data/pastYears.json`.
- Update `src/app/data/faq.json` and `src/app/data/team.json` with real content.

Accessibility & performance
---------------------------

- Dark-only theme with high contrast.
- Gradients animate subtly and respect `prefers-reduced-motion`.
- Images should include meaningful `alt` text where used.
