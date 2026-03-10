import siteState from '../data/siteState.json'

type LiveMicrositeConfig = {
  enabled: boolean
  path: string
  navLabel: string
  heroBadgeLabel: string
  heroCtaLabel: string
  heroCtaBody: string
  bannerTitle: string
  bannerBody: string
  bannerCtaLabel: string
  ticketsNoteTitle: string
  ticketsNoteBody: string
  ticketsSectionSubtitleWhenEnabled: string
}

function normalizePath(path: string): string {
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`
}

const config = siteState.liveMicrosite as LiveMicrositeConfig

export const liveMicrosite: LiveMicrositeConfig = {
  ...config,
  path: normalizePath(config.path),
}
