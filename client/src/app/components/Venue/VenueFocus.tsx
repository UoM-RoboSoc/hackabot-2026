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

  return (
    <Box style={{ position: 'relative', paddingBottom: '160px' }}>
      <Image src={data.image} alt="Venue exterior" radius="lg" withPlaceholder />
      <Box
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(90%, 880px)',
        }}
      >
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={16}>
          {data.callouts.map((callout, idx) => (
            <Card key={idx} shadow="md" padding="lg" radius="lg" withBorder style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px)' }}>
              <Stack gap={6}>
                <Text fw={600}>{callout.title}</Text>
                <Text c="var(--text-dim)" fz="sm">{callout.body}</Text>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  )
}

export default VenueFocus
