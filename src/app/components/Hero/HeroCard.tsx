import { Paper, Stack, Image, Text, Button, Group, Badge, rem } from '@mantine/core'
import event from '../../data/event.json'
import { assetPath } from '../../lib/assets'

type Props = {
  onPrimaryClick?: () => void
}

export function HeroCard({ onPrimaryClick }: Props){
  const eventDate = new Date(event.startsAt)
  const day = eventDate.getDate()
  const month = eventDate.toLocaleString(undefined, { month: 'long' })
  const year = eventDate.getFullYear()
  const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th'
  const formattedDate = `${day}${suffix} ${month} ${year}`

  return (
    <Paper withBorder p="xl" radius="lg" style={{ background: 'var(--panel)' }}>
      <Stack gap={24}>
        <Image src={assetPath('brand/Title_Date_Logo.png')} alt="Hack-A-Bot 2026" maw={rem(420)} mx="auto" />
        <Stack gap={8} ta="center">
          <Text fz={{ base: 'lg', md: 'xl' }} fw={500} c="var(--text)">{event.tagline}</Text>
          <Badge
            size="lg"
            radius="xl"
            variant="light"
            styles={{ root: { alignSelf: 'center', fontSize: rem(18), paddingInline: rem(22), background: 'rgba(239,35,60,0.18)', color: '#ff8594', border: '1px solid rgba(239,35,60,0.4)', letterSpacing: '0.02em' } }}
          >
            {formattedDate}
          </Badge>
          <Text fz={{ base: 'md', md: 'lg' }} fw={600} c="var(--text)" ta="center">
            {event.location}
          </Text>
        </Stack>
        <Group justify="center">
          <Button
            size="lg"
            component="a"
            href={event.registerUrl || '#contact'}
            target={event.registerUrl ? '_blank' : undefined}
            rel={event.registerUrl ? 'noopener noreferrer' : undefined}
            color="crimson"
            radius="xl"
            onClick={onPrimaryClick}
          >
            Express Interest
          </Button>
        </Group>
      </Stack>
    </Paper>
  )
}

export default HeroCard
