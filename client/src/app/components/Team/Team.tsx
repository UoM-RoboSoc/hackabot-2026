import { SimpleGrid, Paper, Stack, Title, Text, Avatar, Anchor, Group, Space } from '@mantine/core'
import team from '../../data/team.json'
import { MediaFrame } from '../Common/MediaFrame'

type Member = { name: string; role: string; img?: string; link?: string }

export function Team(){
  const people: Member[] = team as any
  return (
    <>
      <MediaFrame ratio="16 / 9" alt="Team group photo" caption="[Add a team photo or abstract graphic]" />
      <Space h="md" />
      <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
        {(people.length ? people : [{ name: '[Full Name]', role: '[Role]' }]).map((m, i) => (
          <Paper key={i} withBorder p="md" radius="md">
            <Group>
              <Avatar src={m.img} name={m.name} radius="xl" />
              <Stack gap={0}>
                {m.link ? (
                  <Anchor href={m.link} target="_blank">{m.name}</Anchor>
                ) : (
                  <Title order={5}>{m.name}</Title>
                )}
                <Text c="var(--text-dim)" fz="sm">{m.role}</Text>
              </Stack>
            </Group>
          </Paper>
        ))}
      </SimpleGrid>
    </>
  )
}

export default Team
