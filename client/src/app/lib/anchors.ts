export function smoothScrollTo(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' })
  // Focus for a11y after scroll
  setTimeout(() => target.tabIndex !== undefined && target.focus?.(), prefersReduced ? 0 : 300)
}

