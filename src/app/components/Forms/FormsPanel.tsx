import { Card, SimpleGrid, Stack, Text, Anchor, Box } from '@mantine/core'
import forms from '../../data/forms.json'

type FormLink = {
  id: string
  label: string
  description: string
  url: string
}

export function FormsPanel(){
  const items = forms as FormLink[]
  return (
    <Stack gap={20}>
      <Card withBorder radius="lg" p="lg" style={{ background: 'var(--panel)' }}>
        <Text fw={600} c="var(--text)">Ticket sales: coming soon.</Text>
      </Card>
      <SimpleGrid cols={{ base: 1, sm: 3 }} spacing={16}>
        {items.map((item) => (
          <Card key={item.id} withBorder shadow="sm" radius="lg" p="lg" style={{ background: 'var(--panel)' }}>
            <Stack gap={8}>
              <Text fw={600}>{item.label}</Text>
              <Text fz="sm" c="var(--text-dim)">{item.description}</Text>
              <Box>
                <Anchor
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="crimson"
                  fw={600}
                >
                  Open Google Form ↗
                </Anchor>
              </Box>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  )
}

export default FormsPanel
