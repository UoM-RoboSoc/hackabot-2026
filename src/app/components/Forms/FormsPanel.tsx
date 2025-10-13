import { Card, SimpleGrid, Stack, Text, Anchor, Box, Button, Image } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import forms from '../../data/forms.json'
import { assetPath } from '../../lib/assets'

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
              <Text fz="sm" c="var(--text-dim)">Tickets will be released early in Semester 2.</Text>
            </Stack>
            <Button disabled variant="light" color="gray" radius="md" style={{ width: 170 }}>Coming Soon</Button>
          </Box>
        ) : (
          <Stack gap={10}>
            <Box style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', gap: 10 }}>
              <Image src={assetPath('icons/ticket.svg')} alt="Tickets icon" w={40} h={40} loading="lazy" decoding="async" />
              <Stack gap={4}>
                <Text fw={700} c="var(--text)">Tickets</Text>
                <Text fz="sm" c="var(--text-dim)">Tickets will be released early in Semester 2.</Text>
              </Stack>
            </Box>
            <Button disabled variant="light" color="gray" radius="md" style={{ width: '100%' }}>Coming Soon</Button>
          </Stack>
        )}
      </Card>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={{ base: 12, md: 16 }}>
        {items.map((item) => (
          <Card key={item.id} withBorder shadow="sm" radius="lg" p={{ base: 'md', md: 'lg' }} style={{ background: 'var(--panel)' }}>
            {isDesktop ? (
              <Stack align="center" gap={12} style={{ textAlign: 'center' }}>
                <Image src={iconSrcForId(item.id)} alt="" w={56} h={56} />
                <Stack gap={6}>
                  <Text fw={600} fz={{ base: 'md', md: 'lg' }}>{item.label}</Text>
                  <Text fz="sm" c="var(--text-dim)">{item.description}</Text>
                </Stack>
                <Anchor
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="crimson"
                  fw={600}
                >
                  Open ↗
                </Anchor>
              </Stack>
            ) : (
              <Box style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 12 }}>
                <Image src={iconSrcForId(item.id)} alt="" w={40} h={40} />
                <Stack gap={6}>
                  <Text fw={600}>{item.label}</Text>
                  <Text fz="sm" c="var(--text-dim)">{item.description}</Text>
                </Stack>
                <Anchor
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="crimson"
                  fw={600}
                >
                  Open ↗
                </Anchor>
              </Box>
            )}
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default FormsPanel
