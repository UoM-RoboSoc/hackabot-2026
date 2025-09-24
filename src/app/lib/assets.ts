/**
 * Resolve a public asset URL that respects the configured Vite base path.
 * Accepts paths with or without a leading slash and always returns a path
 * that works both in dev (`/`) and on GitHub Pages (`./`).
 */
export function assetPath(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const normalizedPath = path.replace(/^\/+/, '')
  return `${normalizedBase}${normalizedPath}`
}

