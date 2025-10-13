import { Paper, Text, SimpleGrid } from '@mantine/core'
import keyInfo from '../../data/keyInfo.json'

export function KeyInfoList(){
  const items = keyInfo as string[]
  return (
    <Paper withBorder radius="lg" p={{ base: 'lg', md: 'xl' }} style={{ background: 'var(--panel)' }}>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 10, md: 14 }}>
        {items.map((item, index) => (
          <Text key={index} fz={{ base: 'xs', md: 'sm' }} c="var(--text)" style={{ lineHeight: 1.45 }}>
            • {item}
          </Text>
        ))}
      </SimpleGrid>
    </Paper>
  )
}

export default KeyInfoList
