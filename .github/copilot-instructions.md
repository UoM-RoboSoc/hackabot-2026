# Hack-A-Bot 2026 Copilot Instructions
## Environment
- **Stack & tooling**: Vite + TypeScript React with Mantine UI (client/package.json).
- **Dev commands**: npm run dev (hot reload), npm run build (tsc -b + vite), npm run lint (ESLint 9).
- **Entry point**: MantineProvider wraps App in client/src/main.tsx:1; theme assumes forceColorScheme="light" so the coastal palette renders on a bright canvas.
## Architecture
- **Page scaffold**: client/src/app/layout/Page.tsx:5 drives Mantine AppShell with #app-main as the scroll container; keep IDs so BackToTop and nav observers continue to work.
- **Sections**: client/src/app/layout/Section.tsx:5 renders neutral shells (background var(--bg-2)) and optional centering; ids must match NavBar anchors and keep the overlay div for subtle shading.
- **Composition**: client/src/app/App.tsx:1 orders sections and their data dependencies; add new sections here and wire them to NavBar links.
- **Navigation**: client/src/app/components/Nav/NavBar.tsx:9 uses smoothScrollTo and IntersectionObserver; when adding sections ensure matching anchors (id-title) and update the links array.
- **Scroll helpers**: BackToTop (client/src/app/components/Nav/BackToTop.tsx:1) and Page effect rely on #app-main; avoid refactoring to window scrolling without adjusting these utilities.
## Data-first content
- **Event config**: client/src/app/data/event.json powers Hero, KeyInfo, Contact, CountdownBar; keep dates ISO-8601 so timers and toLocaleString are stable.
- **Schedule**: client/src/app/data/schedule.json feeds Schedule (client/src/app/components/Schedule/Schedule.tsx:1); empty array renders placeholder MediaFrame, so populate with {time,title,desc}.
- **Past years**: client/src/app/data/pastYears.json pairs with PastYears.tsx:1; supply gallery image paths under public/past and match the year strings expected by SegmentedControl.
- **Sponsors**: client/src/app/data/sponsors.json drives Sponsors.tsx:1; drop logo assets into public/sponsors/previous and reference relative paths.
- **Team & FAQ**: team.json and faq.json backfill cards and Accordions, with FAQ anchoring using ids faq-qN for deep links.
## UI patterns
- **MediaFrame & Pane**: use client/src/app/components/Common/MediaFrame.tsx:1 and Pane.tsx:1 for consistent cards and image placeholders instead of ad-hoc markup.
- **Hero & Countdown**: Hero.tsx:1 and CountdownBar.tsx:1 expect event data plus optional registerUrl; keep scroll fallback to #contact for empty URLs.
- **Styling**: client/src/index.css:1 defines the “Cool Coastal Vibes” light palette (soft grey backgrounds, white panels, red accents) plus scrollbar/utility styles; reuse these CSS vars instead of hardcoding colors.
- **Mantine theme**: client/src/app/theme.ts:1 aligns Mantine colors with CSS vars; when adding Mantine components, prefer theme tokens (color="crimson", radius="lg").
- **Accessibility**: Page.tsx:5 focuses hash targets and sets --app-vh; Section adds tabIndex. Preserve aria labelling when refactoring.
- **Circuit backdrop**: client/src/app/components/Hero/CircuitBackdrop.tsx:1 contains experimental canvas code currently commented out; if reactivating, mount via Section background prop and ensure performance is acceptable.
## Assets & content
- **Copy**: client/src/app/copy/about.md holds long-form text for ValueProps section; keep Markdown minimal and render through existing components.
- **Static files**: serve images from public/, e.g. public/brand/logo-mark.svg used across Hero and Nav; drop new assets there to avoid import churn.
- **Forms**: Contact.tsx:1 reads Google Form URLs from event.json; leave blank to show placeholder copy.
## Workflow tips
- **Linting**: run npm run lint before commits; ESLint is configured via eslint.config.js with React hooks plugin.
- **No tests**: current project lacks automated tests; validate visually in npm run dev and keep placeholders readable.
- **Deploy target**: build artifacts land in client/dist (Vite defaults); ensure asset paths remain root-based ("/…") because the site is served from the root path.
