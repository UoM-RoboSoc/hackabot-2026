import { SimpleGrid, Image, Paper, Stack, Title, Text, Anchor, Box } from '@mantine/core'
import sponsors from '../../data/sponsors.json'
import { assetPath } from '../../lib/assets'

type Logo = { name: string; src: string; url?: string; invert?: boolean }

const LOGO_BASE_SCALE = 1.5

export function Sponsors(){
  const data = sponsors as { current: Logo[] }
  const logos = data.current || []

  return (
    <Stack gap={24}>
      <Stack gap={4}>
        <Title order={3}>Current Sponsors</Title>
        <Text fz="sm" c="var(--text-dim)">Thank you to our 2026 partners.</Text>
      </Stack>
      {logos.length ? (
        <SimpleGrid cols={{ base: 2, sm: 2, md: 4, lg: 4 }} spacing={{ base: 12, md: 16 }} style={{ justifyItems: 'center' }}>
          {logos.map((logo, idx) => (
            <Paper
              key={idx}
              withBorder
              radius="lg"
              p="md"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--panel)',
                width: '100%',
                aspectRatio: '2 / 1',
                overflow: 'hidden',
              }}
            >
              {logo.url ? (
                <Anchor
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', cursor: 'pointer' }}
                >
                  <Image
                    src={assetPath(logo.src)}
                    alt={logo.name}
                    fit="contain"
                    height="100%"
                    width="100%"
                    radius="md"
                    loading="lazy"
                    decoding="async"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectPosition: 'center', transition: 'transform 160ms ease', transformOrigin: 'center', transform: `scale(${LOGO_BASE_SCALE})`, filter: logo.invert ? 'invert(1)' : undefined }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = `scale(${LOGO_BASE_SCALE * 1.06})` }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = `scale(${LOGO_BASE_SCALE})` }}
                  />
                </Anchor>
              ) : (
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                  <Image
                    src={assetPath(logo.src)}
                    alt={logo.name}
                    fit="contain"
                    height="100%"
                    width="100%"
                    radius="md"
                    loading="lazy"
                    decoding="async"
                    style={{ maxWidth: '100%', maxHeight: '100%', objectPosition: 'center', transition: 'transform 160ms ease', transformOrigin: 'center', transform: `scale(${LOGO_BASE_SCALE})`, filter: logo.invert ? 'invert(1)' : undefined }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = `scale(${LOGO_BASE_SCALE * 1.06})` }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = `scale(${LOGO_BASE_SCALE})` }}
                  />
                </Box>
              )}
            </Paper>
          ))}
        </SimpleGrid>
      ) : (
        <Paper withBorder radius="lg" p="xl" style={{ background: 'var(--panel)' }}>
          <Text c="var(--text-dim)" ta="center">Current sponsor logos to be confirmed.</Text>
        </Paper>
      )}
    </Stack>
  )
}

export default Sponsors
