import { Container, Group, Anchor, Text } from '@mantine/core'

export function Footer(){
  return (
    <footer id="site-footer" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-2)' }}>
      <Container size="lg" py="md">
        <Group justify="space-between" align="center" style={{ rowGap: 8 }}>
          <Text fz="sm" c="var(--text-dim)">
            Hack‑A‑Bot is a non-profit event run by the University of Manchester Robotics Society.
          </Text>
          <Group gap="md">
            <Anchor
              href="#"
              onClick={(e) => e.preventDefault()}
              aria-disabled
              style={{ color: 'var(--text-dim)', cursor: 'not-allowed' }}
            >
              Code of Conduct
            </Anchor>
          </Group>
        </Group>
      </Container>
    </footer>
  )
}

export default Footer
