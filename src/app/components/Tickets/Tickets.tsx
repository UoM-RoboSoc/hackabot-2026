import { Grid, Card, Stack, Text, Title, Button, Box, Image } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import tickets from '../../data/tickets.json'
import { assetPath } from '../../lib/assets'

type TicketsData = {
  ctaUrl: string
  ctaLabel: string
  steps: string[]
  emailNote: string
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
        <Card withBorder radius="lg" p={{ base: 'md', md: 'lg' }} style={{ background: 'var(--panel)', height: '100%' }}>
          <Stack gap={12} style={{ height: '100%' }}>
            <Stack gap={6}>
              <Title order={3}>Get your ticket</Title>
              <Text c="var(--text-dim)">Follow the steps to claim your free Hack-A-Bot 2026 ticket.</Text>
            </Stack>
            <Stack gap={8}>
              <Text fw={600}>Tickets are free.</Text>
              <Text fz="sm" c="var(--text-dim)">The Students' Union link opens in a new tab.</Text>
            </Stack>
            {isDesktop && (
              <Box
                style={{
                  flex: 1,
                  minHeight: 140,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 16,
                  border: '1px solid rgba(255,255,255,0.06)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <Image
                  src={assetPath('icons/ticket.svg')}
                  alt=""
                  w={160}
                  h={160}
                  style={{ opacity: 0.7 }}
                  loading="lazy"
                  decoding="async"
                />
              </Box>
            )}
            <Button
              component="a"
              href={data.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              color="crimson"
              radius="md"
              fullWidth
              style={isDesktop ? { alignSelf: 'stretch' } : undefined}
            >
              {data.ctaLabel}
            </Button>
          </Stack>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Card withBorder radius="lg" p={{ base: 'md', md: 'lg' }} style={{ background: 'var(--panel)', height: '100%' }}>
          <Stack gap={12}>
            <Title order={3}>How to buy tickets</Title>
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
              {data.steps.map((step, idx) => (
                <Text component="li" key={idx} fz="sm" c="var(--text)">
                  {renderStep(step)}
                </Text>
              ))}
            </Box>
            <Card
              withBorder
              radius="md"
              p="sm"
              style={{ background: 'rgba(239,35,60,0.2)', borderColor: 'rgba(239,35,60,0.55)' }}
            >
              <Text fz="md" fw={600} c="var(--text)">
                {data.emailNote}
              </Text>
            </Card>
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  )
}

export default Tickets
