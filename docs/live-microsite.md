# Live Microsite Contract

This repo is prepared to publish a private standalone microsite at `/live/` without storing the microsite source here before launch.

## Publish target

- Drop the built microsite into `public/live/`.
- Vite will copy that folder into the production build unchanged.
- The published URL will be `https://hackabot-2026.com/live/`.

## Required output shape

The private microsite should build to static files, not source code. The output should look like this:

```text
live/
  index.html
  assets/...
  schedule/index.html
  judging/index.html
```

## Important constraints

- Use relative asset paths where possible, or paths rooted at `/live/`.
- Do not assume assets are served from `/`.
- If the microsite has more than one page, each page should exist as a real file or folder with its own `index.html`.
- Avoid SPA history routing unless every route has a matching static file.
- Do not register a service worker scoped to `/`.

## Main-site switch

The main site reads `src/app/data/siteState.json` for live-mode UI:

- `enabled: false` keeps all `/live` CTAs hidden.
- `enabled: true` shows the nav CTA, hero CTA, live banner, and ticketing note.

## Suggested release flow

1. Build the microsite in the private repo.
2. Copy the built output into `public/live/`.
3. Set `src/app/data/siteState.json` to `enabled: true`.
4. Review locally with `npm run build`.
5. Commit and merge to `main`.

## Rollback

If you need to back the launch out quickly:

1. Set `enabled: false`.
2. Remove the files from `public/live/`.
3. Deploy again.
