import { SimpleGrid, Image, Paper, Stack, Title, Text, Anchor, Button } from '@mantine/core'
import sponsors from '../../data/sponsors.json'

type Logo = { name: string; src: string; url?: string }

export function Sponsors(){
  const data = sponsors as { logos: Logo[] }
  const logos = data.logos || []

  return (
    <Stack gap={24}>
      <Title order={3}>Sponsors</Title>
      {logos.length ? (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={16}>
          {logos.map((logo, idx) => (
            <Paper key={idx} withBorder radius="lg" padding="md" style={{ display: 'grid', placeItems: 'center', background: 'var(--panel)' }}>
              <Anchor
                href={logo.url || '#contact'}
                target={logo.url ? '_blank' : undefined}
                rel={logo.url ? 'noopener noreferrer' : undefined}
                onClick={(e) => { if (!logo.url) { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) } }}
                style={{ display: 'grid', placeItems: 'center' }}
              >
                <Image src={logo.src} alt={logo.name} fit="contain" h={48} />
              </Anchor>
            </Paper>
          ))}
        </SimpleGrid>
      ) : (
        <Paper withBorder radius="lg" padding="xl" style={{ background: 'var(--panel)' }}>
          <Text c="var(--text-dim)" ta="center">Sponsor logos to be confirmed.</Text>
        </Paper>
      )}
      <Button
        variant="subtle"
        color="crimson"
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        style={{ alignSelf: 'flex-start' }}
      >
        Want to sponsor?
      </Button>
    </Stack>
  )
}

export default Sponsors
