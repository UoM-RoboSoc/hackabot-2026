import { SimpleGrid, Card, Stack, Text, Avatar, Anchor } from '@mantine/core'
import team from '../../data/team.json'

type Member = { name: string; role: string; email: string; img?: string }

export function Team(){
  const people: Member[] = team as any
  const list = people.length ? people : [{ name: 'TBC', role: 'Role', email: 'placeholder@student.example' }]

  return (
    <SimpleGrid cols={{ base: 2, md: 3, lg: 4 }} spacing={{ base: 16, md: 24 }}>
      {list.map((member, idx) => (
        <Card key={idx} withBorder radius="lg" padding="lg" style={{ background: 'var(--panel)' }}>
          <Stack align="center" gap={12}>
            <Avatar src={member.img} name={member.name} size={72} radius={999} color="crimson" />
            <Stack align="center" gap={4}>
              <Text fw={600}>{member.name}</Text>
              <Text fz="sm" c="var(--text-dim)">{member.role}</Text>
              <Anchor href={`mailto:${member.email}`} fz="sm" color="crimson">
                {member.email}
              </Anchor>
            </Stack>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  )
}

export default Team
