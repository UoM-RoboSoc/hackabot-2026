import { Card, SimpleGrid, Stack, Text, Anchor, Box, Button, Image } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import forms from '../../data/forms.json'
import { assetPath } from '../../lib/assets'
import { smoothScrollTo } from '../../lib/anchors'

type FormLink = {
  id: string
  label: string
  description: string
  url: string
}

export function FormsPanel(){
  const items = forms as FormLink[]
  const isDesktop = useMediaQuery('(min-width: 48em)')

  const iconSrcForId = (id: string) => {
    switch (id) {
      case 'express':
        return assetPath('icons/interest.svg')
      case 'volunteer':
        return assetPath('icons/volunteer.svg')
      case 'sponsor':
        return assetPath('icons/sponsor.svg')
      default:
        return undefined
    }
  }
  return (
    <Stack gap={20}>
      <Card withBorder radius="lg" p={{ base: 'md', md: 'lg' }} style={{ background: 'var(--panel)' }}>
        {isDesktop ? (
          <Box style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 12 }}>
            <Image src={assetPath('icons/ticket.svg')} alt="Tickets icon" w={56} h={56} loading="lazy" decoding="async" />
            <Stack gap={6}>
              <Text fw={700} fz={{ base: 'md', md: 'lg' }} c="var(--text)">Tickets</Text>
              <Text fz="sm" c="var(--text-dim)">Tickets are live now — follow the steps to claim yours.</Text>
            </Stack>
            <Button
              variant="light"
              color="crimson"
              radius="md"
              style={{ width: 170 }}
              onClick={() => smoothScrollTo('tickets')}
            >
              Get Tickets
            </Button>
          </Box>
        ) : (
          <Stack gap={10}>
            <Box style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', gap: 10 }}>
              <Image src={assetPath('icons/ticket.svg')} alt="Tickets icon" w={40} h={40} loading="lazy" decoding="async" />
              <Stack gap={4}>
                <Text fw={700} c="var(--text)">Tickets</Text>
                <Text fz="sm" c="var(--text-dim)">Tickets are live now — follow the steps to claim yours.</Text>
              </Stack>
            </Box>
            <Button
              variant="light"
              color="crimson"
              radius="md"
              style={{ width: '100%' }}
              onClick={() => smoothScrollTo('tickets')}
            >
              Get Tickets
            </Button>
          </Stack>
        )}
      </Card>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={{ base: 12, md: 16 }}>
        {items.map((item) => {
          const isExpress = item.id === 'express'
          const isVolunteer = item.id === 'volunteer'
          const label = isExpress ? 'Express Interest' : item.label
          const description = isExpress
            ? 'Thanks for expressing interest — tickets are live now.'
            : item.description
          const linkColor = isExpress || isVolunteer ? 'gray' : 'crimson'
          const isDisabled = isExpress || isVolunteer
          const linkLabel = isExpress ? 'Thanks for your interest' : isVolunteer ? '(not currently available)' : 'Open ↗'
          return (
            <Card key={item.id} withBorder shadow="sm" radius="lg" p={{ base: 'md', md: 'lg' }} style={{ background: 'var(--panel)' }}>
              {isDesktop ? (
                <Stack align="center" gap={12} style={{ textAlign: 'center' }}>
                  <Image src={iconSrcForId(item.id)} alt="" w={56} h={56} />
                  <Stack gap={6}>
                    <Text fw={600} fz={{ base: 'md', md: 'lg' }}>{label}</Text>
                    <Text fz="sm" c="var(--text-dim)">{description}</Text>
                  </Stack>
                  <Anchor
                    href={isDisabled ? undefined : item.url}
                    target={isDisabled ? undefined : '_blank'}
                    rel={isDisabled ? undefined : 'noopener noreferrer'}
                    color={linkColor}
                    fw={600}
                    style={isDisabled ? { pointerEvents: 'none', opacity: 0.6 } : undefined}
                  >
                    {linkLabel}
                  </Anchor>
                </Stack>
              ) : (
                <Box style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 12 }}>
                  <Image src={iconSrcForId(item.id)} alt="" w={40} h={40} />
                  <Stack gap={6}>
                    <Text fw={600}>{label}</Text>
                    <Text fz="sm" c="var(--text-dim)">{description}</Text>
                  </Stack>
                  <Anchor
                    href={isDisabled ? undefined : item.url}
                    target={isDisabled ? undefined : '_blank'}
                    rel={isDisabled ? undefined : 'noopener noreferrer'}
                    color={linkColor}
                    fw={600}
                    style={isDisabled ? { pointerEvents: 'none', opacity: 0.6 } : undefined}
                  >
                    {isVolunteer ? '(not currently available)' : isExpress ? 'Thanks' : 'Open ↗'}
                  </Anchor>
                </Box>
              )}
            </Card>
          )
        })}
      </SimpleGrid>
    </Stack>
  )
}

export default FormsPanel
