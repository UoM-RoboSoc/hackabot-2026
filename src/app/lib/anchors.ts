export function smoothScrollTo(id: string, duration = 500) {
  const heading = document.getElementById(`${id}-title`)
  const target = heading || document.getElementById(id)
  if (!target) return

  const scroller = document.getElementById('app-main') || window
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Compute offset using CSS var --header-h and a small breathing room
  let headerH = 72
  const root = document.documentElement
  const varVal = getComputedStyle(root).getPropertyValue('--header-h')
  const parsed = parseInt(varVal || '72', 10)
  if (!Number.isNaN(parsed)) headerH = parsed
  const offset = headerH + 24

  const rect = target.getBoundingClientRect()
  const current = (scroller as any).scrollTop ?? window.scrollY
  const targetTop = current + rect.top - offset

  if (prefersReduced || duration <= 0) {
    ;(scroller as any).scrollTo?.({ top: targetTop, behavior: 'auto' })
    target.focus?.({ preventScroll: true } as any)
    return
  }

  const start = performance.now()
  const startY = current
  const delta = targetTop - startY
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
  let cancelled = false

  const cancel = () => { cancelled = true }
  window.addEventListener('wheel', cancel, { passive: true, once: true })
  window.addEventListener('touchstart', cancel, { passive: true, once: true })

  const tick = (now: number) => {
    if (cancelled) return
    const t = Math.min(1, (now - start) / duration)
    const eased = easeOutCubic(t)
    const y = startY + delta * eased
    ;(scroller as any).scrollTo?.(0, y)
    if (t < 1) requestAnimationFrame(tick)
    else target.focus?.({ preventScroll: true } as any)
  }
  requestAnimationFrame(tick)
}
