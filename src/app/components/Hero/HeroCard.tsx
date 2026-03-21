import { Paper, Stack, Image, Text, Group, Badge, Anchor, Button, rem } from '@mantine/core'
import event from '../../data/event.json'
import { assetPath } from '../../lib/assets'
import { smoothScrollTo } from '../../lib/anchors'

export function HeroCard(){
  const eventDate = new Date(event.startsAt)
  const day = eventDate.getDate()
  const month = eventDate.toLocaleString(undefined, { month: 'long' })
  const year = eventDate.getFullYear()
  const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th'
  const formattedDate = `${day}${suffix} ${month} ${year}`

  return (
    <Paper withBorder p="xl" radius="lg" style={{ background: 'var(--panel)' }}>
      <Stack gap={24}>
        <Group justify="center">
          <Button
            component="a"
            href="/live/"
            size="lg"
            radius="xl"
            className="btn-gradient g-animate"
            styles={{
              root: {
                width: 'min(100%, 520px)',
                minHeight: rem(56),
                boxShadow: '0 16px 32px rgba(217,4,41,0.22)',
              },
              label: {
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 700,
                fontSize: rem(18),
              },
            }}
          >
            Open Hack-A-Bot Live
          </Button>
        </Group>
        <Image src={assetPath('brand/Title_Date_Logo.png')} alt="Hack-A-Bot 2026" maw={rem(420)} mx="auto" />
        <Stack gap={8} ta="center">
          <Text fz={{ base: 'lg', md: 'xl' }} fw={500} c="var(--text)">{event.tagline}</Text>
          <Text fz={{ base: 'sm', md: 'md' }} c="var(--text-dim)" maw={rem(440)} mx="auto">
            Hack-A-Bot Live is the student hub for the event-day schedule, floorplan, project guides, and setup notes.
          </Text>
          <Group justify="center" gap="sm">
            <Badge
              size="lg"
              radius="xl"
              variant="light"
              styles={{ root: { alignSelf: 'center', fontSize: rem(18), paddingInline: rem(22), background: 'rgba(239,35,60,0.18)', color: '#ff8594', border: '1px solid rgba(239,35,60,0.4)', letterSpacing: '0.02em' } }}
            >
              {formattedDate}
            </Badge>
          </Group>
          <Text fz={{ base: 'md', md: 'lg' }} fw={600} c="var(--text)" ta="center">
            {event.location}
          </Text>
        </Stack>
        <Group justify="center">
          <Anchor
            href="#venue"
            underline="never"
            onClick={(e) => { e.preventDefault(); smoothScrollTo('venue') }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-dim)' }}
          >
            <Text fz="sm" fw={600} c="var(--text-dim)">
              Scroll down to find out more ↓
            </Text>
          </Anchor>
        </Group>
      </Stack>
    </Paper>
  )
}

export default HeroCard
