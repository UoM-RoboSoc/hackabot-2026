import { SimpleGrid, Card, Stack, Text, Avatar, Anchor, Image, Box } from '@mantine/core'
import team from '../../data/team.json'
import { assetPath } from '../../lib/assets'

type Member = { name: string; role: string; email: string; img?: string }

export function Team(){
  const people: Member[] = team as any
  const list = people.length ? people : [{ name: 'TBC', role: 'Role', email: 'placeholder@student.example' }]

  return (
    <Stack align="center" gap={28}>
      <SimpleGrid
        w="100%"
        cols={{ base: 3, sm: 3, md: 3 }}
        spacing={{ base: 10, sm: 12, md: 8 }}
        style={{ width: '100%', justifyContent: 'center', justifyItems: 'center' }}
      >
        {list.map((member, idx) => (
          <Card
            key={idx}
            withBorder
            radius="lg"
            p={{ base: 'sm', sm: 'md' }}
            style={{ background: 'var(--panel)', width: '100%', maxWidth: 200, marginInline: 'auto' }}
          >
            <Stack align="center" gap={12}>
              {member.img ? (
                <Box style={{ width: '100%', aspectRatio: '3 / 4', overflow: 'hidden', borderRadius: 12, border: '1px solid var(--border)' }}>
                  <Image src={assetPath(member.img)} alt={member.name} fit="cover" width="100%" height="100%" loading="lazy" decoding="async" />
                </Box>
              ) : (
                <Avatar name={member.name} size={72} radius={999} color="crimson" />
              )}
              <Stack align="center" gap={4}>
                <Text fw={600} fz={{ base: 'sm', sm: 'md' }}>{member.name}</Text>
                <Text fz={{ base: 'sm', sm: 'sm' }} c="var(--text-dim)" style={{ overflowWrap: 'anywhere' }}>{member.role}</Text>
                <Anchor href={`mailto:${member.email}`} fz={{ base: 'sm', sm: 'sm' }} color="crimson" style={{ overflowWrap: 'anywhere' }}>
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
