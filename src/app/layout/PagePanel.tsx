import type { CSSProperties, PropsWithChildren } from 'react'
import { Box } from '@mantine/core'

type Props = PropsWithChildren<{
  px?: CSSProperties['padding']
  py?: CSSProperties['padding']
  minHeightOffset?: string
  align?: 'top' | 'center' | 'bottom'
}>

const alignMap = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
} as const

export function PagePanel({
  children,
  px = 'clamp(24px, 6vw, 64px)',
  py = 'clamp(32px, 6vh, 72px)',
  minHeightOffset = '0px',
  align = 'center',
}: Props) {
  return (
    <Box
      style={{
        minHeight: `calc(var(--app-vh, 100vh) - var(--header-h, 72px) - ${minHeightOffset})`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: alignMap[align],
        padding: `${py} ${px}`,
        boxSizing: 'border-box',
        gap: 0,
      }}
    >
      {children}
    </Box>
  )
}

export default PagePanel
