import { Container, Text, Button, Stack, rem, Box, Badge } from '@mantine/core'
import { Pane } from '../Common/Pane'

type EventData = {
  name: string
  tagline: string
  startsAt: string
  location: string
  registerUrl?: string
}

export function Hero({ event }: { event: EventData }){
  const formattedDate = new Date(event.startsAt).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const tagline = event.tagline || 'Manchester’s Premier Student Hackathon.'
  const location = event.location || 'Nancy Rothwell Building'
  const badgeStyles = {
    root: {
      background: 'rgba(239,35,60,0.15)',
      border: '1px solid rgba(239,35,60,0.45)',
      color: 'var(--antiflash-white)',
      fontSize: rem(22),
      fontWeight: 700,
      paddingInline: rem(20),
      paddingBlock: rem(10),
      height: 'auto',
      lineHeight: 1.2,
    },
  }

  return (
    <Container size="lg" py={{ base: 64, md: 120 }}>
      <Pane maxWidth={720} width="100%">
        <Stack gap={{ base: 24, md: 32 }} align="center" data-safezone>
          <Box style={{ width: '100%', maxWidth: rem(560) }}>
            <img
              src="/brand/Red_Logo.png"
              alt="Hack‑A‑Bot title lockup"
              style={{ width: '100%', height: 'auto', display: 'block', margin: '0 auto' }}
            />
          </Box>
          <Text fz={{ base: 'lg', md: 'xl' }} c="var(--text)" ta="center" fw={500}>
            {tagline}
          </Text>
          <Badge size="lg" radius="xl" variant="filled" styles={badgeStyles}>
            {formattedDate}
          </Badge>
          <Text fz={{ base: 'lg', md: 'xl' }} c="var(--text-dim)" ta="center" fw={600}>
            {location}
          </Text>
          <Button
            fullWidth
            size="lg"
            mt="md"
            variant="filled"
            component="a"
            href={event.registerUrl || '#contact'}
            target={event.registerUrl ? '_blank' : undefined}
            styles={{ root: { background: 'var(--accent-strong)', '&:hover': { background: 'var(--accent-stronger)' }, maxWidth: rem(320) } }}
            onClick={(e:any) => { if(!event.registerUrl){ e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) } }}>
            Register
          </Button>
        </Stack>
      </Pane>
    </Container>
  )
}

export default Hero
