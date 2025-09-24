import { useEffect, useState } from 'react'
import { Group, Container, Anchor, Button, Burger, Stack, ScrollArea, Collapse, Modal, Text, Paper } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { smoothScrollTo } from '../../lib/anchors'
import { assetPath } from '../../lib/assets'
import event from '../../data/event.json'
import QRCode from 'react-qr-code'
import { QR_CARD_TITLE, QR_TARGET_URL } from '../QR/constants'
import './Nav.css'

const links = [
  { href: '#hero', label: 'Home' },
  { href: '#venue', label: 'Venue' },
  { href: '#team', label: 'Team' },
  { href: '#sponsors', label: 'Sponsors' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export function NavBar() {
  const [active, setActive] = useState('#hero')
  const [opened, { toggle, close }] = useDisclosure(false)
  const [qrModalOpen, setQrModalOpen] = useState(false)

  const openQrModal = () => {
    close()
    requestAnimationFrame(() => setQrModalOpen(true))
  }

  const closeQrModal = () => setQrModalOpen(false)

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    const rootEl = document.getElementById('app-main') || undefined
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
        { root: rootEl as any, rootMargin: '-50% 0px -50% 0px', threshold: [0, 1] }
      )
      io.observe(el)
      observers.push(io)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <>
      <Modal
        opened={qrModalOpen}
        onClose={closeQrModal}
        title={`Scan to open ${event.name}`}
        centered
        radius="lg"
        padding="lg"
        overlayProps={{ opacity: 0.75, color: 'rgba(8, 9, 14, 0.85)', blur: 6 }}
        data-testid="qr-modal"
      >
        <Stack align="center" gap="md">
          <Paper
            withBorder
            radius="md"
            p="lg"
            shadow="lg"
            style={{
              backgroundColor: 'var(--bg-2)',
              borderColor: 'rgba(255, 255, 255, 0.12)',
            }}
          >
            <QRCode value={QR_TARGET_URL} size={196} bgColor="var(--bg-2)" fgColor="var(--text)" />
          </Paper>
          <Stack gap={2} align="center">
            <Text ta="center" fz="sm" fw={600} c="var(--text)">
              {event.tagline}
            </Text>
            <Text ta="center" fz="xs" c="var(--text-dim)">
              {QR_CARD_TITLE}
            </Text>
          </Stack>
        </Stack>
      </Modal>

      <div className="nav-glass">
        <Container size="lg" h={72} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Group gap={0} align="center">
            <Anchor
              href="#hero"
              underline="never"
              onClick={(e) => { e.preventDefault(); smoothScrollTo('hero') }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img src={assetPath('brand/Header_Logo.png')} alt="Hack-A-Bot" height={44} style={{ display: 'block', height: '44px', width: 'auto' }} />
            </Anchor>
          </Group>
          <Group gap={24} visibleFrom="md" align="center">
            {links.map((l) => (
              <Anchor
                key={l.href}
                href={l.href}
                underline="never"
                className={`nav-link${active === l.href ? ' active' : ''}`}
                aria-current={active === l.href ? 'page' : undefined}
                onClick={(e) => { e.preventDefault(); smoothScrollTo(l.href.slice(1)) }}
              >
                {l.label}
              </Anchor>
            ))}
          </Group>

          {/* Mobile: burger only; Register moves into menu */}
          <Group gap={12} hiddenFrom="md">
            <Burger opened={opened} onClick={toggle} aria-label="Toggle navigation" color="var(--text)" />
          </Group>
        </Container>

        <Collapse in={opened} transitionDuration={180}>
          <div className="nav-mobile-panel">
            <ScrollArea style={{ maxHeight: 'calc(100dvh - 72px)' }} offsetScrollbars>
              <Stack gap="xs" p="md">
                {links.map((l) => (
                  <Button
                    key={l.href}
                    variant="subtle"
                    size="lg"
                    fullWidth
                    aria-current={active === l.href ? 'page' : undefined}
                    styles={{ root: { justifyContent: 'flex-start' } }}
                    onClick={(e) => { e.preventDefault(); close(); requestAnimationFrame(() => smoothScrollTo(l.href.slice(1))) }}
                  >
                    {l.label}
                  </Button>
                ))}
                <Button
                  variant="gradient"
                  gradient={{ from: 'red', to: 'pink', deg: 135 }}
                  size="lg"
                  fullWidth
                  styles={{ root: { justifyContent: 'flex-start' } }}
                  onClick={openQrModal}
                >
                  Show event QR code
                </Button>
              </Stack>
            </ScrollArea>
          </div>
        </Collapse>
      </div>
    </>
  )
}

export default NavBar
