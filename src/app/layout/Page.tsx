import { type PropsWithChildren, useEffect } from 'react'
import { AppShell } from '@mantine/core'
import { NavBar } from '../components/Nav/NavBar'
import { BackToTop } from '../components/Nav/BackToTop'

export function Page({ children }: PropsWithChildren) {
  useEffect(() => {
    // Ensure hash navigation focuses target for a11y
    if (window.location.hash) {
      const id = window.location.hash.slice(1)
      const el = document.getElementById(id)
      el?.focus?.()
    }
    // Dynamic viewport height css var for robust centering across devices
    const setVh = () => {
      const vh = window.innerHeight
      document.documentElement.style.setProperty('--app-vh', `${vh}px`)
    }
    const setAtTopPadding = () => {
      document.documentElement.style.setProperty('--main-pt', '0px')
    }
    const onResize = () => { setVh(); setAtTopPadding() }
    const onOrientation = () => { setVh(); setAtTopPadding() }
    setVh()
    setAtTopPadding()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onOrientation)
    window.addEventListener('scroll', setAtTopPadding, { passive: true })
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onOrientation)
      window.removeEventListener('scroll', setAtTopPadding)
    }
  }, [])

  return (
    <AppShell
      header={{ height: 72 }}
      padding={0}
      withBorder={false}
      styles={{
        main: {
          background: 'var(--bg-1)',
          // Make main a scroll container so the scrollbar starts below the header
          height: 'calc(var(--app-vh, 100dvh) - var(--header-h, 72px))',
          overflowY: 'auto',
          width: '100%',
        },
      }}
      // Expose header and main padding as CSS vars for sections using 100dvh centering
      style={{ ['--header-h' as any]: '72px', ['--main-pt' as any]: '0px' }}
    >
      <AppShell.Header id="app-header">
        <NavBar />
      </AppShell.Header>
      <AppShell.Main id="app-main">
        {children}
        <BackToTop />
      </AppShell.Main>
    </AppShell>
  )
}

export default Page
