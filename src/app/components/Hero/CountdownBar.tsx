import { useEffect, useState } from 'react'
import { Paper, Text, SimpleGrid } from '@mantine/core'
import './CountdownBar.css'

function part(n: number){ return n.toString().padStart(2,'0') }

export function CountdownBar({ startsAt }: { startsAt: string }){
  const [remaining, setRemaining] = useState<number>(() => Math.max(0, new Date(startsAt).getTime() - Date.now()))

  useEffect(() => {
    const id = setInterval(() => setRemaining(Math.max(0, new Date(startsAt).getTime() - Date.now())), 1000)
    return () => clearInterval(id)
  }, [startsAt])

  if (remaining <= 0){
    return (
      <Paper withBorder radius="lg" p="md" className="countdown-pane" style={{ textAlign: 'center' }}>
        <Text fw={700} c="var(--auburn)">We’re live!</Text>
      </Paper>
    )
  }

  const seconds = Math.floor(remaining / 1000)
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  const items = [
    { label: 'Days', value: part(days) },
    { label: 'Hours', value: part(hours) },
    { label: 'Minutes', value: part(minutes) },
    { label: 'Seconds', value: part(secs) },
  ]

  return (
    <Paper withBorder radius="lg" p="lg" className="countdown-pane">
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md" className="count-grid">
        {items.map((it) => (
          <div key={it.label} className="count-seg">
            <Text className="count-val" fw={800} fz={{ base: 26, sm: 32, md: 48 }}>{it.value}</Text>
            <Text className="count-label" fz="xs" tt="uppercase" c="var(--text-dim)">{it.label}</Text>
          </div>
        ))}
      </SimpleGrid>
    </Paper>
  )
}

export default CountdownBar
