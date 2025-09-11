import { Container, Group, Anchor, Text } from '@mantine/core'

export function Footer(){
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-2)' }}>
      <Container size="lg" py="md">
        <Group justify="space-between">
          <Text c="var(--text-dim)">© {new Date().getFullYear()} Hack‑A‑Bot</Text>
          <Group gap="md">
            <Anchor href="#" onClick={(e) => e.preventDefault()}>Code of Conduct</Anchor>
            <Anchor href="#" onClick={(e) => e.preventDefault()}>Privacy</Anchor>
          </Group>
        </Group>
      </Container>
    </footer>
  )
}

export default Footer

