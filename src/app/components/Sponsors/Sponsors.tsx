import { SimpleGrid, Image, Paper, Stack, Title, Text, Anchor, Button } from '@mantine/core'
import sponsors from '../../data/sponsors.json'
import { assetPath } from '../../lib/assets'

type Logo = { name: string; src: string; url?: string }

export function Sponsors(){
  const data = sponsors as { logos: Logo[] }
  const logos = data.logos || []

  return (
    <Stack gap={24}>
      <Stack gap={4}>
        <Title order={3}>Previous Sponsors</Title>
        <Text fz="sm" c="var(--text-dim)">Representative partners from past years — sponsorship lineup changes annually.</Text>
      </Stack>
      {logos.length ? (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={16}>
          {logos.map((logo, idx) => (
            <Paper
              key={idx}
              withBorder
              radius="lg"
              p="md"
              style={{
                display: 'grid',
                placeItems: 'center',
                background: 'var(--panel)',
                height: 140,
                overflow: 'hidden',
              }}
            >
              <Anchor
                href={logo.url || '#contact'}
                target={logo.url ? '_blank' : undefined}
                rel={logo.url ? 'noopener noreferrer' : undefined}
                onClick={(e) => { if (!logo.url) { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) } }}
                style={{ display: 'grid', placeItems: 'center', width: '100%', height: '100%' }}
              >
                <Image
                  src={assetPath(logo.src)}
                  alt={logo.name}
                  fit="cover"
                  height="100%"
                  width="100%"
                  radius="md"
                  style={{ objectPosition: 'center' }}
                />
              </Anchor>
            </Paper>
          ))}
        </SimpleGrid>
      ) : (
        <Paper withBorder radius="lg" p="xl" style={{ background: 'var(--panel)' }}>
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
