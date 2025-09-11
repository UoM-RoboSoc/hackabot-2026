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
  }, [])

  return (
    <AppShell
      header={{ height: 88 }}
      padding={0}
      withBorder={false}
      styles={{ main: { background: 'var(--bg-1)', paddingTop: 88 } }}
    >
      <AppShell.Header>
        <NavBar />
      </AppShell.Header>
      <AppShell.Main>
        {children}
        <BackToTop />
      </AppShell.Main>
    </AppShell>
  )
}

export default Page
