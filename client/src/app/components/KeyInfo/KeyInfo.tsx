import { SimpleGrid, Paper, Stack, Title, Text, Grid } from '@mantine/core'
import event from '../../data/event.json'
import { MediaFrame } from '../Common/MediaFrame'

export function KeyInfo(){
  const fields = [
    { label: 'When', value: new Date(event.startsAt).toLocaleString() },
    { label: 'Where', value: event.location || '[Add venue + city]' },
    { label: 'Who', value: '[Eligibility: e.g., students 18+, beginners welcome]' },
    { label: 'Prizes', value: '[If any — outline categories or TBD]' },
    { label: 'Rules', value: '[Link or brief summary incl. IP & CoC]' },
  ]
  return (
    <Grid gutter="xl" align="stretch">
      <Grid.Col span={{ base: 12, md: 7 }}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          {fields.map((f) => (
            <Paper key={f.label} p="lg" radius="md" withBorder>
              <Stack gap={6}>
                <Title order={5} ta="center">{f.label}</Title>
                <Text c="var(--text-dim)" ta="center">{f.value}</Text>
              </Stack>
            </Paper>
          ))}
        </SimpleGrid>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 5 }}>
        <MediaFrame ratio="4 / 5" alt="Venue map or detail" caption="[Drop a venue map or relevant graphic]" />
      </Grid.Col>
    </Grid>
  )
}

export default KeyInfo
