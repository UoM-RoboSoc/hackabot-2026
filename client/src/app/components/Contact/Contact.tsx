import { SimpleGrid, Paper, Stack, Title, Text, Button } from '@mantine/core'
import event from '../../data/event.json'

export function Contact(){
  const items = [
    { label: 'Register', url: event.registerUrl },
    { label: 'Volunteer', url: event.volunteerUrl },
    { label: 'Judge', url: (event as any).judgeUrl },
    { label: 'Sponsor', url: (event as any).sponsorUrl },
  ]
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
      {items.map((it) => (
        <Paper key={it.label} withBorder p="lg" radius="md">
          <Stack>
            <Title order={4}>{it.label}</Title>
            {it.url ? (
              <Button component="a" href={it.url} target="_blank">Open form</Button>
            ) : (
              <Text c="var(--text-dim)">[Link a Google Form URL here]</Text>
            )}
          </Stack>
        </Paper>
      ))}
    </SimpleGrid>
  )
}

export default Contact

