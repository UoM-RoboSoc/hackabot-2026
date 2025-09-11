import { Container, Title, Text, Button, Group, Stack, Grid, Badge, rem } from '@mantine/core'
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
        <Badge size="lg" variant="light" color="crimson">Hackathon</Badge>
        <Pane>
          <Grid align="center" gutter={{ base: 16, md: 24 }}>
            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap={6}>
                <Title order={1}>{event.name}</Title>
                <Text fz="lg" c="var(--text-dim)">{event.tagline || '[Add 1–2 sentence pitch for participants]'}</Text>
                <Group gap="lg">
                  <Text><strong>Date:</strong> {new Date(event.startsAt).toLocaleString()}</Text>
                  <Text><strong>Location:</strong> {event.location || '[Add venue + city]'}</Text>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Stack align="stretch" justify="center" style={{ minHeight: rem(220) }}>
                <Button size="lg" component="a" href={event.registerUrl || '#contact'} target={event.registerUrl ? '_blank' : undefined}
                  onClick={(e:any) => { if(!event.registerUrl){ e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) } }}>
                  Register
                </Button>
              </Stack>
            </Grid.Col>
          </Grid>
        </Pane>
      </Stack>
    </Container>
  )
}

export default Hero
