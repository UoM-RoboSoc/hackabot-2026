import { SimpleGrid, Paper, Stack, Title, Text } from '@mantine/core'
import { MediaFrame } from '../Common/MediaFrame'

export function ValueProps(){
  const items = [
    { title: 'Who should attend', text: '[State who should attend — students, hobbyists, beginners welcome, etc.]' },
    { title: 'Why join', text: '[List 3 reasons to attend: learning, community, prizes]' },
    { title: 'What to expect', text: '[Describe format: team size, hardware theme, mentorship]'},
  ]
  return (
    <>
      <MediaFrame ratio="3 / 2" alt="About section image" caption="[Add a concise graphic or event photo]" />
      <div style={{ height: 16 }} />
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {items.map((i) => (
          <Paper key={i.title} p="lg" radius="md" withBorder>
            <Stack gap={6}>
              <Title order={4} ta="center">{i.title}</Title>
              <Text c="var(--text-dim)" ta="center">{i.text}</Text>
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
    </>
  )
}

export default ValueProps
