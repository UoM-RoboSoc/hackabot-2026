import { Grid, Card, Stack, Text, Title, Button, Box } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import tickets from '../../data/tickets.json'
import { assetPath } from '../../lib/assets'
import { liveMicrosite } from '../../lib/liveMicrosite'

type TicketsData = {
  ctaUrl: string
  ctaLabel: string
  steps: string[]
  ticketNote: string
  formNote: string
}

export function Tickets(){
  const data = tickets as TicketsData
  const isDesktop = useMediaQuery('(min-width: 48em)')
  const highlightStyle = {
    background: 'rgba(239,35,60,0.1)',
    border: '1px solid rgba(239,35,60,0.25)',
    color: 'var(--text)',
    padding: '0 6px',
    borderRadius: 6,
    fontWeight: 500,
  } as const

  const renderStep = (step: string) => {
    const parts = step.split(/"([^"]+)"/g)
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <Text key={`q-${index}`} component="span" style={highlightStyle}>
            {part}
          </Text>
        )
      }
      const segments = part.split(/(free)/gi)
      return segments.map((segment, segIndex) => {
        if (segment.toLowerCase() === 'free') {
          return (
            <Text key={`f-${index}-${segIndex}`} component="span" style={highlightStyle}>
              {segment}
            </Text>
          )
        }
        return <Text key={`t-${index}-${segIndex}`} component="span">{segment}</Text>
      })
    })
  }

  return (
    <Grid gutter={{ base: 24, md: 32 }} align="stretch">
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Card
          withBorder
          radius="lg"
          p={{ base: 'md', md: 'lg' }}
          style={{ background: 'var(--panel)', height: '100%' }}
        >
          <Stack gap={12}>
            {data.steps.length ? (
              <>
                <Text fz={{ base: '1.6rem', md: '2.2rem' }} fw={700}>
                  {data.steps[0]}
                </Text>
                <Box
                  component="ol"
                  style={{
                    margin: 0,
                    paddingLeft: 20,
                    display: 'grid',
                    gap: 10,
                    color: 'var(--text)'
                  }}
                >
                  {data.steps.slice(1).map((step, idx) => (
                    <Text component="li" key={idx} fz="sm" c="var(--text)">
                      {renderStep(step)}
                    </Text>
                  ))}
                </Box>
              </>
            ) : null}
            <Card
              withBorder
              radius="md"
              p="sm"
              style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.12)' }}
            >
              <Text fz="sm" fw={700} tt="uppercase" style={{ letterSpacing: '0.08em', marginBottom: 6 }}>
                Ticket email
              </Text>
              <Text fz="sm" fw={600} c="var(--text)">
                {data.ticketNote}
              </Text>
            </Card>
            <Card
              withBorder
              radius="md"
              p="sm"
              style={{ background: 'rgba(239,35,60,0.2)', borderColor: 'rgba(239,35,60,0.6)' }}
            >
              <Text fz="sm" fw={700} tt="uppercase" style={{ letterSpacing: '0.08em', marginBottom: 6 }}>
                Participant form required
              </Text>
              <Text fz="md" fw={700} c="var(--text)">
                {data.formNote}
              </Text>
            </Card>
            {liveMicrosite.enabled ? (
              <Card
                withBorder
                radius="md"
                p="sm"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(239,35,60,0.28)' }}
              >
                <Stack gap={8}>
                  <Text fz="sm" fw={700} tt="uppercase" style={{ letterSpacing: '0.08em' }}>
                    {liveMicrosite.ticketsNoteTitle}
                  </Text>
                  <Text fz="sm" c="var(--text)">
                    {liveMicrosite.ticketsNoteBody}
                  </Text>
                  <Button
                    component="a"
                    href={liveMicrosite.path}
                    color="crimson"
                    radius="md"
                    variant="light"
                    w="fit-content"
                  >
                    {liveMicrosite.bannerCtaLabel}
                  </Button>
                </Stack>
              </Card>
            ) : null}
          </Stack>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
        <Card withBorder radius="lg" p={{ base: 'md', md: 'lg' }} style={{ background: 'var(--panel)', height: '100%' }}>
          <Stack gap={12} style={{ height: '100%' }}>
            <Box
              style={{
                width: '100%',
                aspectRatio: '4 / 3',
                minHeight: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 16,
                overflow: 'hidden',
                touchAction: 'none',
              }}
            >
              <model-viewer
                src={assetPath('model/hack-trophy-recoloured.glb')}
                poster={assetPath('model/hack-trophy.png')}
                alt="Hack-A-Bot trophy 3D logo"
                camera-controls
                auto-rotate
                rotation-per-second="20deg"
                environment-image="neutral"
                tone-mapping="neutral"
                interaction-prompt="none"
                shadow-intensity="0.7"
                shadow-softness="0.7"
                exposure="1.15"
                style={{ width: '100%', height: '100%', background: 'transparent', touchAction: 'none' }}
              />
            </Box>
            <Stack gap={8} style={isDesktop ? { marginTop: 'auto' } : undefined}>
              <Stack gap={6}>
                <Title order={3}>Join the waitlist</Title>
                <Text c="var(--text-dim)">Tickets are sold out. Join the waitlist for a chance to attend if places open up.</Text>
              </Stack>
              <Button
                component="a"
                href="https://forms.gle/fpxyHErvXNcJJPzn6"
                target="_blank"
                rel="noopener noreferrer"
                color="crimson"
                radius="md"
                fullWidth
                style={!isDesktop ? { whiteSpace: 'normal', height: 'auto', paddingBlock: 14, lineHeight: 1.2 } : undefined}
              >
                {isDesktop ? 'Join the waitlist' : 'Join waitlist'}
              </Button>
              <Button
                component="a"
                href={data.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="subtle"
                color="gray"
                radius="md"
                fullWidth
                style={!isDesktop ? { whiteSpace: 'normal', height: 'auto', paddingBlock: 12, lineHeight: 1.2 } : undefined}
              >
                Check ticket availability
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  )
}

export default Tickets
