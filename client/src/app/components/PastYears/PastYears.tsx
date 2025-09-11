import { useState } from 'react'
import { SimpleGrid, Image, Paper, Stack, Title, Text, Group, SegmentedControl } from '@mantine/core'
import data from '../../data/pastYears.json'
import { Lightbox } from './Lightbox'

type Past = { year: number, summary: string, highlights: string[], gallery: string[] }

export function PastYears(){
  const list: Past[] = data as any
  const years = list.map((p) => String(p.year))
  const [year, setYear] = useState(years[0] || '2024')
  const current = list.find((p) => String(p.year) === String(year))
  const imgs = current?.gallery || []

  const [src, setSrc] = useState<string | null>(null)

  return (
    <Stack>
      <Group justify="space-between" align="center">
        <Title order={3}>Past Years</Title>
        <SegmentedControl value={year} onChange={setYear} data={years} />
      </Group>
      <Text c="var(--text-dim)" ta="center">{current?.summary || '[Add stats]'}</Text>
      {current?.highlights?.length ? (
        <ul>
          {current.highlights.map((h, i) => (<li key={i}><Text c="var(--text-dim)">{h}</Text></li>))}
        </ul>
      ) : (
        <Text c="var(--text-dim)">[Add 2–4 highlight bullets]</Text>
      )}

      {imgs.length ? (
        <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="sm">
          {imgs.map((src, idx) => (
            <Image key={idx} src={src} alt={`Past ${year} photo ${idx+1}`} radius="sm" onClick={() => setSrc(src)} style={{ cursor: 'pointer' }} />
          ))}
        </SimpleGrid>
      ) : (
        <Paper withBorder p="lg" radius="md" style={{ textAlign: 'center' }}>
          <Text>[Drop 6–12 photos here]</Text>
        </Paper>
      )}
      <Lightbox src={src} opened={!!src} onClose={() => setSrc(null)} />
    </Stack>
  )
}

export default PastYears
