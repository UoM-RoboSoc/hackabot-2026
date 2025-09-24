import { SimpleGrid, Card, Stack, Text, Avatar, Anchor, Image, Box } from '@mantine/core'
import team from '../../data/team.json'

type Member = { name: string; role: string; email: string; img?: string }

export function Team(){
  const people: Member[] = team as any
  const list = people.length ? people : [{ name: 'TBC', role: 'Role', email: 'placeholder@student.example' }]

  return (
    <Stack align="center" gap={{ base: 24, md: 32 }}>
      <SimpleGrid
        cols={{ base: 2, sm: 3, md: 3 }}
        spacing={{ base: 16, md: 24 }}
        style={{ width: '100%', maxWidth: 720, justifyItems: 'center' }}
      >
        {list.map((member, idx) => (
          <Card key={idx} withBorder radius="lg" padding="lg" style={{ background: 'var(--panel)' }}>
            <Stack align="center" gap={12}>
              {member.img ? (
                <Box style={{ width: '100%', aspectRatio: '3 / 4', overflow: 'hidden', borderRadius: 16, border: '1px solid var(--border)' }}>
                  <Image src={member.img} alt={member.name} fit="cover" width="100%" height="100%" />
                </Box>
              ) : (
                <Avatar name={member.name} size={96} radius={999} color="crimson" />
              )}
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
    </Stack>
  )
}

export default Team
