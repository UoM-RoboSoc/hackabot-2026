# Hack-A-Bot 2026 Copilot Instructions
## Environment
- **Stack & tooling**: Vite + TypeScript React with Mantine UI (client/package.json).
- **Dev commands**: npm run dev (hot reload), npm run build (tsc -b + vite), npm run lint (ESLint 9).
- **Entry point**: MantineProvider wraps App in client/src/main.tsx:1; theme runs in Mantine dark mode with the red accent.
## Architecture
- **Page scaffold**: client/src/app/layout/Page.tsx:5 hosts the Mantine AppShell with `#app-main` as the scroll container. Keep this wrapper so sticky navigation and BackToTop keep working.
- **Sections**: client/src/app/layout/Section.tsx:5 controls surface tone and spacing via `tone` (`surface|canvas`) and `padding` (`default|compact|none`). Every nav anchor must match a `Section` id or an explicit sentinel element.
- **Composition**: client/src/app/App.tsx:1 implements the four stacked “pages”: Page 1 Hero, Page 2 Venue, Page 3 Team + Sponsors, Page 4 FAQ + Forms. Edit this file when reordering or inserting major sections.
- **Navigation**: client/src/app/components/Nav/NavBar.tsx:9 lists anchors for Home, Venue, Team, Sponsors, FAQ, Contact and wires smooth scrolling via client/src/app/lib/anchors.ts:1. Update the array when ids change.
- **Scroll helpers**: BackToTop (client/src/app/components/Nav/BackToTop.tsx:1) and the hash-focus effect in Page.tsx:5 rely on `#app-main`; avoid swapping to `window` scrolling without reworking these utilities.
## Data-first content
- **event.json**: hero card, countdown, and CTA URLs read from here. Keep ISO-8601 `startsAt`, and ensure location already includes the city.
- **keyInfo.json**: ordered bullet list rendered on Page 1. Maintain concise statements.
- **venue.json**: primary and mobile images plus five floating callouts. Edit copy here rather than in the component.
- **gallery.json**: array of photos for the mosaic. Empty `src` values render placeholders until real assets live under `public/past/`.
- **team.json**: organisers must include `email`; the grid renders mailto links automatically.
- **sponsors.json**: flat `logos` array. Place real art under `public/sponsors/` and update `src` paths relative to `/`.
- **forms.json**: metadata for Express Interest, Volunteer, Sponsor tiles. Update Google Form URLs and the one-line descriptions.
- **faq.json**: 8–12 entries feed the accordion. Order matters because anchors are generated sequentially.
## UI patterns
- **Hero page**: client/src/app/components/Hero/Hero.tsx:1 combines HeroCard.tsx:1, CountdownBar.tsx:1, PastPhotosMosaic.tsx:1, and KeyInfoList.tsx:1. Preserve the two-column desktop grid and the mobile stacking order.
- **Venue focus**: client/src/app/components/Venue/VenueFocus.tsx:1 overlays callout cards on the venue photo (desktop) and stacks them below the image (mobile).
- **People & sponsors**: Team.tsx:1 renders organiser cards with avatars + mailto links; Sponsors.tsx:1 shows a single responsive grid and a “Want to sponsor?” jump to `#contact`.
- **FAQ & forms**: FAQ.tsx:1 drives the accordion. The forms column is provided by FormsPanel.tsx:1 and includes the `#contact` sentinel used by navigation.
- **Styling**: client/src/index.css:1 defines the dark palette wrappers (backgrounds, panels, overlays). Reuse these CSS vars and Mantine spacing instead of hardcoding colors.
- **Mantine theme**: client/src/app/theme.ts:1 keeps the default dark theme with `primaryColor: 'red'`. Use Mantine color tokens (e.g., `theme.colors.red`) when you need variations.
- **Accessibility**: Section.tsx:1 emits anchor sentinels, Page.tsx:5 focuses hash targets, BackToTop uses smooth scroll but respects reduced motion. Keep alt text on all images; placeholders should set informative text.
## Assets & content
- **Hero assets**: `/public/brand/Logo.png` feeds the header; `/public/brand/Title_Date_Logo.png` is used inside the hero card.
- **Venue photos**: place portrait/landscape shots under `/public/venue/` and reference them in venue.json. Ensure alt text describes the scene.
- **Past photos**: add curated imagery under `/public/past/`; update gallery.json with the final paths.
- **Sponsor logos**: drop SVG/PNG art under `/public/sponsors/` and update sponsors.json accordingly.
- **Forms**: Maintain Google Form URLs in forms.json. The forms panel automatically labels them as external links.
## Workflow tips
- **Linting**: run npm run lint before commits; ESLint is configured via eslint.config.js with React hooks plugin.
- **No tests**: current project lacks automated tests; validate visually in npm run dev and keep placeholders readable.
- **Deploy target**: build artifacts land in client/dist (Vite defaults); ensure asset paths remain root-based ("/…") because the site is served from the root path.
