import { Stack, Card, Text, Title, Box, Image, Grid } from '@mantine/core'
import prizes from '../../data/prizes.json'
import { assetPath } from '../../lib/assets'

export function Prizes(){
  const data = prizes as {
    headline: string
    intro: string
    sponsorNote: string
    suspenseNote: string
    pastLabel: string
    past: string[]
  }

  return (
    <Grid gutter={{ base: 20, md: 28 }} align="stretch">
      <Grid.Col span={{ base: 12, md: 5 }}>
        <Box
          style={{
            width: '100%',
            aspectRatio: '4 / 3',
          }}
        >
          <Image
            src={assetPath('prizes/trophies.png')}
            alt="Hack-A-Bot trophies"
            fit="contain"
            width="100%"
            height="100%"
            loading="lazy"
            decoding="async"
          />
        </Box>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 7 }}>
        <Card withBorder radius="lg" p={{ base: 'md', md: 'lg' }} style={{ background: 'var(--panel)', height: '100%' }}>
          <Stack gap={12}>
            <Stack gap={6}>
              <Title order={3}>{data.headline}</Title>
              <Text c="var(--text-dim)">{data.intro}</Text>
            </Stack>

            <Title order={3}>Sponsor prize</Title>
            <Text fz="sm" fw={600} c="var(--text)">
              {data.sponsorNote} {data.suspenseNote}
            </Text>

            <Stack gap={8}>
              <Text fz="xs" fw={700} tt="uppercase" style={{ letterSpacing: '0.08em' }}>
                {data.pastLabel}
              </Text>
              <Box
                component="ul"
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  display: 'grid',
                  gap: 6,
                  color: 'var(--text)',
                }}
              >
                {data.past.map((item) => (
                  <Text key={item} component="li" fz="sm" fw={600} c="var(--text)">
                    {item}
                  </Text>
                ))}
              </Box>
            </Stack>
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  )
}

export default Prizes
