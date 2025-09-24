import { Card, Image, Stack, Text, SimpleGrid, Box } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import venue from '../../data/venue.json'

type Callout = { title: string; body: string }

type VenueData = {
  image: string
  mobileImage?: string
  callouts: Callout[]
}

export function VenueFocus(){
  const data = venue as VenueData
  const isMobile = useMediaQuery('(max-width: 48em)')

  if (isMobile){
    return (
      <Stack gap={24}>
        <Image src={data.mobileImage || data.image} alt="Venue exterior" radius="lg" withPlaceholder />
        <Stack gap={16}>
          {data.callouts.map((callout, idx) => (
            <Card key={idx} shadow="sm" padding="lg" radius="lg" withBorder>
              <Stack gap={6}>
                <Text fw={600}>{callout.title}</Text>
                <Text c="var(--text-dim)" fz="sm">{callout.body}</Text>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    )
  }

  const mid = Math.ceil(data.callouts.length / 2)
  const left = data.callouts.slice(0, mid)
  const right = data.callouts.slice(mid)

  return (
    <Box style={{ position: 'relative', paddingInline: 'min(5vw, 64px)' }}>
      <Image src={data.image} alt="Venue exterior" radius="lg" withPlaceholder />
      <Box
        style={{
          position: 'absolute',
          inset: '12% 0 12% 0',
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          pointerEvents: 'none',
          gap: 'min(3vw, 48px)',
        }}
      >
        <Stack gap={16} style={{ width: 'min(260px, 22%)' }}>
          {left.map((callout, idx) => (
            <Card
              key={`left-${idx}`}
              withBorder
              radius="lg"
              shadow="lg"
              padding="lg"
              style={{
                background: 'rgba(22,24,35,0.92)',
                borderColor: 'var(--border)',
                pointerEvents: 'auto',
                color: 'var(--text)'
              }}
            >
              <Stack gap={6}>
                <Text fw={600}>{callout.title}</Text>
                <Text c="var(--text-dim)" fz="sm">{callout.body}</Text>
              </Stack>
            </Card>
          ))}
        </Stack>
        <Stack gap={16} style={{ width: 'min(260px, 22%)' }}>
          {right.map((callout, idx) => (
            <Card
              key={`right-${idx}`}
              withBorder
              radius="lg"
              shadow="lg"
              padding="lg"
              style={{
                background: 'rgba(22,24,35,0.92)',
                borderColor: 'var(--border)',
                pointerEvents: 'auto',
                color: 'var(--text)'
              }}
            >
              <Stack gap={6}>
                <Text fw={600}>{callout.title}</Text>
                <Text c="var(--text-dim)" fz="sm">{callout.body}</Text>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default VenueFocus
