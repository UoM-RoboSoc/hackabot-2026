# Live Microsite Contract

This repo publishes the event-day microsite at `/live/` by copying a prebuilt static artifact into `public/live/`.

## Publish target

- Build the microsite in `../hackabot-2026-live`.
- Copy the built output contents into `public/live/`.
- GitHub Pages will publish those files at `https://hackabot-2026.com/live/` through the existing deploy workflow.

## Current launch mode

- `/live/` is direct-URL only for now.
- The main site does not expose `/live/` in nav, hero, or ticket UI in this pass.
- Browser visits to bad `/live/...` paths should return users to `/live/`.

## Required output shape

The copied artifact must be static files rooted for the `/live/` subpath, for example:

```text
public/live/
  index.html
  assets/...
  schedule/index.html
  project-1/index.html
```

## Constraints

- Use paths rooted at `/live/` or equivalent subpath-safe links.
- Do not assume assets are served from `/`.
- Each live page must exist as a real file or directory with its own `index.html`.
- Avoid SPA history routing for the live microsite.
- Do not register a service worker scoped to `/`.

## Verification

- Build `hackabot-2026-live` and confirm source-only files such as `mise.toml` are excluded.
- Copy the artifact into `public/live/`.
- Run a production build of this repo and confirm `dist/live/...` is present.
- Check `/`, `/merch/...`, `/live/`, and a bad browser URL such as `/live/typo`.
