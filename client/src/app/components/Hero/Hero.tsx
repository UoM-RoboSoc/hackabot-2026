import { Container, Title, Text, Button, Group, Stack, Grid, rem, Box } from '@mantine/core'
import { Pane } from '../Common/Pane'

type EventData = {
  name: string
  tagline: string
  startsAt: string
  location: string
  registerUrl?: string
}

export function Hero({ event }: { event: EventData }){
  return (
    <Container size="lg" py={{ base: 56, md: 96 }}>
      <Stack gap="md" align="center">
        {/* Mobile: full width pane */}
        <Box hiddenFrom="md" w="100%">
          <Pane maxWidth={820} width="100%">
            <Grid align="center" gutter={{ base: 16, md: 24 }}>
              {/* Logo column (1/3 on md+, stacks on mobile) */}
              <Grid.Col span={{ base: 12, md: 4 }}>
                <div style={{ minHeight: 'var(--hero-min, 240px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/brand/logo-mark.svg" alt="Hack‑A‑Bot mark" style={{ height: '100%', maxHeight: rem(240), width: 'auto', display: 'block' }} />
                </div>
              </Grid.Col>
              {/* Text + CTA column (2/3 on md+) */}
              <Grid.Col span={{ base: 12, md: 8 }}>
                <div style={{ minHeight: 'var(--hero-min, 240px)', display: 'flex', flexDirection: 'column' }}>
                  <Stack gap={6} style={{ flex: 1, minWidth: 260 }}>
                    <Title order={1}>{event.name}</Title>
                    <Text fz="lg" c="var(--text-dim)">{event.tagline || '[Add 1–2 sentence pitch for participants]'}</Text>
                    <Group gap="lg">
                      <Text><strong>Date:</strong> {new Date(event.startsAt).toLocaleString()}</Text>
                      <Text><strong>Location:</strong> {event.location || '[Add venue + city]'}</Text>
                    </Group>
                  </Stack>
                  <Button fullWidth size="lg" mt="md" color="crimson" variant="filled" component="a" href={event.registerUrl || '#contact'} target={event.registerUrl ? '_blank' : undefined}
                    onClick={(e:any) => { if(!event.registerUrl){ e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) } }}>
                    Register
                  </Button>
                </div>
              </Grid.Col>
            </Grid>
          </Pane>
        </Box>

        {/* Desktop: 2/3 width pane */}
        <Box visibleFrom="md" w="100%">
          <Pane maxWidth={1400} width="66.6667%">
            <Grid align="center" gutter={{ base: 16, md: 24 }}>
              {/* Logo 1/3 */}
              <Grid.Col span={{ base: 12, md: 4 }}>
                <div style={{ minHeight: 'var(--hero-min, 300px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/brand/logo-mark.svg" alt="Hack‑A‑Bot mark" style={{ height: '100%', maxHeight: rem(280), width: 'auto', display: 'block' }} />
                </div>
              </Grid.Col>
              {/* Text 2/3 with button at bottom */}
              <Grid.Col span={{ base: 12, md: 8 }}>
                <div style={{ minHeight: 'var(--hero-min, 300px)', display: 'flex', flexDirection: 'column' }}>
                  <Stack gap={6} style={{ flex: 1, minWidth: 260 }}>
                    <Title order={1}>{event.name}</Title>
                    <Text fz="lg" c="var(--text-dim)">{event.tagline || '[Add 1–2 sentence pitch for participants]'}</Text>
                    <Group gap="lg">
                      <Text><strong>Date:</strong> {new Date(event.startsAt).toLocaleString()}</Text>
                      <Text><strong>Location:</strong> {event.location || '[Add venue + city]'}</Text>
                    </Group>
                  </Stack>
                  <Button fullWidth size="lg" mt="md" color="crimson" variant="filled" component="a" href={event.registerUrl || '#contact'} target={event.registerUrl ? '_blank' : undefined}
                    onClick={(e:any) => { if(!event.registerUrl){ e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) } }}>
                    Register
                  </Button>
                </div>
              </Grid.Col>
            </Grid>
          </Pane>
        </Box>
      </Stack>
    </Container>
  )
}

export default Hero
