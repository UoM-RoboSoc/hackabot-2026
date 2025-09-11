import { useEffect, useState } from 'react'
import { Group, Paper, Text } from '@mantine/core'

function formatPart(n: number){
  return n.toString().padStart(2,'0')
}

export function Countdown({ startsAt }: { startsAt: string }){
  const [remaining, setRemaining] = useState<number>(() => {
    const start = new Date(startsAt).getTime()
    return Math.max(0, start - Date.now())
  })

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(Math.max(0, new Date(startsAt).getTime() - Date.now()))
    }, 1000)
    return () => clearInterval(id)
  }, [startsAt])

  if (remaining <= 0){
    return (
      <Paper p="md" radius="md" withBorder>
        <Text fw={700} c="var(--auburn)">We’re live!</Text>
      </Paper>
    )
  }

  const seconds = Math.floor(remaining / 1000)
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  return (
    <Group gap="xs" wrap="nowrap">
      <TimeBox label="Days" value={days} />
      <TimeBox label="Hours" value={hours} />
      <TimeBox label="Minutes" value={minutes} />
      <TimeBox label="Seconds" value={secs} />
    </Group>
  )
}

function TimeBox({ label, value }: { label: string, value: number }){
  return (
    <Paper p="sm" withBorder radius="md" style={{ minWidth: 72, textAlign: 'center' }}>
      <Text fw={700} fz="lg">{formatPart(value)}</Text>
      <Text c="var(--text-dim)" fz="xs">{label}</Text>
    </Paper>
  )
}

export default Countdown
