import { useEffect, useState } from 'react'
import { Group, Container, Anchor, Button, Drawer, Burger, Stack, Divider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { smoothScrollTo } from '../../lib/anchors'
import './Nav.css'

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#key-info', label: 'Key Info' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#past-years', label: 'Past Years' },
  { href: '#sponsors', label: 'Sponsors' },
  { href: '#faq', label: 'FAQ' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

export function NavBar() {
  const [active, setActive] = useState('#hero')
  const [opened, { toggle, close }] = useDisclosure(false)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    links.forEach(({ href }) => {
      const id = href.slice(1)
      const el = document.getElementById(id)
      if (!el) return
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(`#${id}`)
          })
        },
        { rootMargin: '-50% 0px -50% 0px', threshold: [0, 1] }
      )
      io.observe(el)
      observers.push(io)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="nav-glass">
      <Container size="lg" h={88} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <Group gap={8} align="center">
          <Anchor href="#hero" underline="never" onClick={(e) => { e.preventDefault(); smoothScrollTo('hero') }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src="/brand/logo-mark.svg" alt="Hack‑A‑Bot" height={32} style={{ display: 'block' }} />
            <span className="brand" style={{ color: 'var(--text)' }}>Hack‑A‑Bot 2026</span>
          </Anchor>
        </Group>
        <Group gap={24} visibleFrom="md" align="center">
          {links.map((l) => (
            <Anchor
              key={l.href}
              href={l.href}
              underline="never"
              className={`nav-link${active === l.href ? ' active' : ''}`}
              onClick={(e) => { e.preventDefault(); smoothScrollTo(l.href.slice(1)) }}
            >
              {l.label}
            </Anchor>
          ))}
          <Button size="lg" component="a" href="#contact" className="btn-gradient g-animate"
            onClick={(e: any) => { e.preventDefault(); smoothScrollTo('contact') }}>
            Register
          </Button>
        </Group>

        {/* Mobile: burger + CTA */}
        <Group gap={12} hiddenFrom="md">
          <Button size="md" component="a" href="#contact" className="btn-gradient g-animate"
            onClick={(e:any) => { e.preventDefault(); smoothScrollTo('contact') }}>Register</Button>
          <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" color="var(--text)" />
        </Group>
      </Container>

      <Drawer opened={opened} onClose={close} padding="md" title="Menu" size="md" overlayProps={{ opacity: 0.35 }}>
        <Stack gap="xs">
          {links.map((l) => (
            <Anchor
              key={l.href}
              href={l.href}
              className={`nav-link${active === l.href ? ' active' : ''}`}
              onClick={(e) => { e.preventDefault(); smoothScrollTo(l.href.slice(1)); close() }}
            >
              {l.label}
            </Anchor>
          ))}
          <Divider my="sm" />
          <Button component="a" href="#contact" onClick={(e:any) => { e.preventDefault(); smoothScrollTo('contact'); close() }}>Register</Button>
        </Stack>
      </Drawer>
    </div>
  )
}

export default NavBar
