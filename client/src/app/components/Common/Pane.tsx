import { type PropsWithChildren } from 'react'
import { Paper, Stack, Title, Text } from '@mantine/core'

type Props = PropsWithChildren<{
  title?: string
  subtitle?: string
  p?: any
}>

export function Pane({ title, subtitle, p = 'xl', children }: Props){
  return (
    <Paper withBorder radius="xl" p={p} style={{ marginInline: 'auto', maxWidth: 1120, background: 'var(--panel)' }}>
      {(title || subtitle) && (
        <Stack gap={6} mb="sm">
          {title && <Title order={3}>{title}</Title>}
          {subtitle && <Text c="var(--text-dim)">{subtitle}</Text>}
        </Stack>
      )}
      {children}
    </Paper>
  )
}

export default Pane
