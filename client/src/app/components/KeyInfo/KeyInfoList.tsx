import { Paper, Stack, Text } from '@mantine/core'
import keyInfo from '../../data/keyInfo.json'

export function KeyInfoList(){
  const items = keyInfo as string[]
  return (
    <Paper withBorder radius="lg" p={{ base: 'lg', md: 'xl' }} style={{ background: 'var(--panel)' }}>
      <Stack gap={12}>
        {items.map((item, index) => (
          <Text key={index} fz={{ base: 'sm', md: 'md' }} c="var(--text)">
            • {item}
          </Text>
        ))}
      </Stack>
    </Paper>
  )
}

export default KeyInfoList
