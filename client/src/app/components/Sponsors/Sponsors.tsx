import { SimpleGrid, Image, Paper, Stack, Title, Text, Button, Anchor, Space } from '@mantine/core'
import sponsors from '../../data/sponsors.json'
import { MediaFrame } from '../Common/MediaFrame'

type Logo = { name: string; src: string; url?: string }

export function Sponsors(){
  const data = sponsors as any as { previous: Logo[] }
  return (
    <Stack align="stretch">
      <Title order={3}>Previous year sponsors</Title>
      <MediaFrame ratio="3 / 1" alt="Sponsor collage" caption="[Add sponsor collage or hero strip]" />
      <Space h="sm" />
      {data.previous?.length ? (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 6 }} spacing="md">
          {data.previous.map((l, i) => (
            <Anchor key={i} href={l.url || '#'} target={l.url ? '_blank' : undefined} onClick={(e) => { if(!l.url){ e.preventDefault() }}}>
              <Paper withBorder p="md" radius="md" style={{ display: 'grid', placeItems: 'center', background: 'var(--bg-2)'}}>
                <Image src={l.src} alt={l.name} fit="contain" h={48} />
              </Paper>
            </Anchor>
          ))}
        </SimpleGrid>
      ) : (
        <Text c="var(--text-dim)">[Add sponsor logos under /public/sponsors/previous]</Text>
      )}
      <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth'})}>Want to sponsor?</Button>
    </Stack>
  )
}

export default Sponsors
