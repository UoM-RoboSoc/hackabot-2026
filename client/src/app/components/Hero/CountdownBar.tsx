import { useEffect, useState } from 'react'
import { Paper, Group, Stack, Text } from '@mantine/core'
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
    <Paper withBorder radius="lg" p="md" className="countdown-pane">
      <Group gap="md" justify="space-between" wrap="nowrap">
        {items.map((it) => (
          <Stack key={it.label} gap={4} align="center" className="count-seg" style={{ flex: 1 }}>
            <Text className="count-val" fw={800} fz={{ base: 28, sm: 40, md: 56 }}>{it.value}</Text>
            <Text className="count-label" fz="xs" tt="uppercase" c="var(--text-dim)">{it.label}</Text>
          </Stack>
        ))}
      </Group>
    </Paper>
  )
}

export default CountdownBar
