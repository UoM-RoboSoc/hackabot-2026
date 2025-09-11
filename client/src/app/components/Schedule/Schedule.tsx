import { Group, Stack, Text, Space } from '@mantine/core'
import { MediaFrame } from '../Common/MediaFrame'
import schedule from '../../data/schedule.json'

export function Schedule(){
  const items: { time?: string, title?: string, desc?: string }[] = schedule as any
  const empty = !items || items.length === 0
  if (empty){
    return (
      <Stack>
        <MediaFrame ratio="21 / 9" alt="Timeline graphic" caption="[Schedule to be announced]" />
      </Stack>
    )
  }
  return (
    <Stack align="stretch">
      <MediaFrame ratio="21 / 9" alt="Timeline graphic" caption="[Mini timeline graphic or hero]" />
      <Space h="sm" />
      {items.map((it, idx) => (
        <Group key={idx} gap="md" wrap="nowrap">
          <Text w={80} c="var(--text-dim)">{it.time}</Text>
          <Stack gap={2}>
            <Text fw={600}>{it.title}</Text>
            {it.desc && <Text c="var(--text-dim)">{it.desc}</Text>}
          </Stack>
        </Group>
      ))}
    </Stack>
  )
}

export default Schedule
