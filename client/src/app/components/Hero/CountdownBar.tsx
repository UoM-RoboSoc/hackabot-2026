import { useEffect, useState } from 'react'
import { Paper, Group, Stack, Text, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import './CountdownBar.css'

function part(n: number){ return n.toString().padStart(2,'0') }

export function CountdownBar({ startsAt }: { startsAt: string }){
  const [remaining, setRemaining] = useState<number>(() => Math.max(0, new Date(startsAt).getTime() - Date.now()))
  const theme = useMantineTheme()
  const isSmall = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`)

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
    <Paper withBorder radius="lg" p="md" className="countdown-pane" style={{ overflow: 'hidden' }}>
      <Group gap="md" justify="center" wrap="wrap">
        {items.map((it, idx) => {
          const daysSeg = idx === 0
          const style = daysSeg
            ? (isSmall
                ? { flex: '1 0 100%', minWidth: '100%', order: 0 as const }
                : { flex: '2 1 200px', minWidth: 180, maxWidth: 280, order: 0 as const })
            : (isSmall
                ? { flex: '1 1 0', minWidth: 0, maxWidth: 200, order: 1 as const }
                : { flex: '1 1 140px', minWidth: 120, maxWidth: 200, order: 1 as const })
          return (
            <Stack key={it.label} gap={4} align="center" className="count-seg" style={style}>
              <Text className="count-val" fw={800} fz={{ base: 24, sm: 36, md: 56 }}>{it.value}</Text>
              <Text className="count-label" fz="xs" tt="uppercase" c="var(--text-dim)">{it.label}</Text>
            </Stack>
          )
        })}
      </Group>
    </Paper>
  )
}

export default CountdownBar
