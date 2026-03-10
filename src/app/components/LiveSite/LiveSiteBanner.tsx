import { Button, Card, Group, Stack, Text } from '@mantine/core'
import { liveMicrosite } from '../../lib/liveMicrosite'

export function LiveSiteBanner() {
  if (!liveMicrosite.enabled) {
    return null
  }

  return (
    <Card
      withBorder
      radius="lg"
      p={{ base: 'md', md: 'lg' }}
      style={{
        background: 'linear-gradient(135deg, rgba(239,35,60,0.18), rgba(22,25,34,0.96))',
        borderColor: 'rgba(239,35,60,0.38)',
      }}
    >
      <Group justify="space-between" align="center" gap="md">
        <Stack gap={6} maw={720}>
          <Text fz={{ base: 'lg', md: 'xl' }} fw={700} c="var(--text)">
            {liveMicrosite.bannerTitle}
          </Text>
          <Text c="var(--text-dim)">
            {liveMicrosite.bannerBody}
          </Text>
        </Stack>
        <Button
          component="a"
          href={liveMicrosite.path}
          color="crimson"
          radius="md"
        >
          {liveMicrosite.bannerCtaLabel}
        </Button>
      </Group>
    </Card>
  )
}

export default LiveSiteBanner
