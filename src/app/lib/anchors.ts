export function smoothScrollTo(id: string) {
  // CSS-first smooth scroll using #app-main scroll-behavior and scroll-padding-top
  const heading = document.getElementById(`${id}-title`)
  const target = heading || document.getElementById(id)
  if (!target) return
  // Omit behavior so CSS scroll-behavior controls animation and respects reduced motion
  target.scrollIntoView({ block: 'start' })
  target.focus?.()
}
