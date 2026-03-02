import { Card, Image, Stack, Text, Box, Grid } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import venue from '../../data/venue.json'
import { assetPath } from '../../lib/assets'

type Callout = { title: string; body: string }

type VenueData = {
  image: string
  mobileImage?: string
  summary?: string
  dates?: string[]
  timeline?: { day: 'Saturday' | 'Sunday'; time: string; label: string }[]
  callouts: Callout[]
}

export function VenueFocus(){
  const data = venue as VenueData
  const isMobile = useMediaQuery('(max-width: 48em)')
  const desktopImage = assetPath(data.image)
  const mobileImage = data.mobileImage ? assetPath(data.mobileImage) : desktopImage
  const dates = data.dates ?? []
  const timeline = data.timeline ?? []

  const saturday = timeline.filter((item) => item.day === 'Saturday')
  const sunday = timeline.filter((item) => item.day === 'Sunday')

  const infoBlock = (
    <Stack gap={10} align="center" ta="center">
      {data.summary && (
        <Text fw={600} fz={{ base: 'md', md: 'lg' }}>{data.summary}</Text>
      )}
      {dates.length === 2 ? (
        <Text fz="sm" c="var(--text-dim)">
          {dates[0]} → {dates[1]}
        </Text>
      ) : dates.length ? (
        <Text fz="sm" c="var(--text-dim)">{dates.join(' • ')}</Text>
      ) : null}
    </Stack>
  )

  const timelineBlock = timeline.length ? (
    <Card withBorder radius="lg" p={{ base: 'md', md: 'lg' }} style={{ background: 'var(--panel)' }}>
      <Stack gap={12}>
        <Text fw={700} fz={{ base: 'sm', md: 'md' }}>Event timeline (updated)</Text>
        <Grid gutter={{ base: 16, md: 24 }}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={8}>
              <Text fw={700} fz="sm">Saturday</Text>
              {saturday.map((item) => (
                <Box
                  key={`${item.time}-${item.label}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(90px, 120px) 1fr',
                    gap: 10,
                    alignItems: 'baseline',
                  }}
                >
                  <Text fw={700} fz="sm" c="var(--text)">{item.time}</Text>
                  <Text fz="sm" c="var(--text-dim)">{item.label}</Text>
                </Box>
              ))}
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={8}>
              <Text fw={700} fz="sm">Sunday</Text>
              {sunday.map((item) => (
                <Box
                  key={`${item.time}-${item.label}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(90px, 120px) 1fr',
                    gap: 10,
                    alignItems: 'baseline',
                  }}
                >
                  <Text fw={700} fz="sm" c="var(--text)">{item.time}</Text>
                  <Text fz="sm" c="var(--text-dim)">{item.label}</Text>
                </Box>
              ))}
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Card>
  ) : null

  if (isMobile){
    return (
      <Stack gap={24}>
        {infoBlock}
        <Image src={mobileImage} alt="Venue exterior" radius="lg" loading="lazy" decoding="async" />
        <Stack gap={16}>
          {data.callouts.map((callout, idx) => (
            <Card key={idx} shadow="sm" p="lg" radius="lg" withBorder>
              <Stack gap={6}>
                <Text fw={600}>{callout.title}</Text>
                <Text c="var(--text-dim)" fz="sm">{callout.body}</Text>
              </Stack>
            </Card>
          ))}
        </Stack>
        {timelineBlock}
      </Stack>
    )
  }

  const mid = Math.ceil(data.callouts.length / 2)
  const left = data.callouts.slice(0, mid)
  const right = data.callouts.slice(mid)

  return (
    <Stack gap={24}>
      {infoBlock}
      <Box style={{ position: 'relative', paddingInline: 'min(5vw, 64px)' }}>
        <Image src={desktopImage} alt="Venue exterior" radius="lg" loading="lazy" decoding="async" />
        <Box
          style={{
            position: 'absolute',
            inset: '12% 0 12% 0',
            display: 'flex',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            pointerEvents: 'none',
            gap: 'min(3vw, 48px)',
            overflow: 'visible',
            zIndex: 2,
          }}
        >
          <Stack gap={16} style={{ width: 'min(280px, 24%)', overflow: 'visible' }}>
            {left.map((callout, idx) => (
              <Card
                key={`left-${idx}`}
                withBorder
                radius="lg"
                shadow="lg"
                p="lg"
                style={{
                  background: 'rgba(22,24,35,0.92)',
                  borderColor: 'var(--border)',
                  pointerEvents: 'auto',
                  color: 'var(--text)',
                  overflow: 'visible'
                }}
              >
                <Stack gap={6}>
                  <Text fw={600} fz="sm">{callout.title}</Text>
                  <Text c="var(--text-dim)" fz="xs">{callout.body}</Text>
                </Stack>
              </Card>
            ))}
          </Stack>
          <Stack gap={16} style={{ width: 'min(280px, 24%)', overflow: 'visible' }}>
            {right.map((callout, idx) => (
              <Card
                key={`right-${idx}`}
                withBorder
                radius="lg"
                shadow="lg"
                p="lg"
                style={{
                  background: 'rgba(22,24,35,0.92)',
                  borderColor: 'var(--border)',
                  pointerEvents: 'auto',
                  color: 'var(--text)',
                  overflow: 'visible'
                }}
              >
                <Stack gap={6}>
                  <Text fw={600} fz="sm">{callout.title}</Text>
                  <Text c="var(--text-dim)" fz="xs">{callout.body}</Text>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Box>
      </Box>
      {timelineBlock}
    </Stack>
  )
}

export default VenueFocus
