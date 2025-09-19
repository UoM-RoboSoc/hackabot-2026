import { type PropsWithChildren, type ReactNode } from 'react'
import { Container, Title, Text, Stack } from '@mantine/core'
import './Gradients.css'

type Divider = 'diagonal' | 'wave' | 'none'

type Props = PropsWithChildren<{
  id: string
  title?: string
  subtitle?: string
  divider?: Divider
  centered?: boolean
  offsetTop?: boolean
  background?: ReactNode
}>

export function Section({ id, title, subtitle, divider = 'none', centered = false, offsetTop = false, background, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      style={{
        position: 'relative',
        display: centered ? 'flex' : undefined,
        alignItems: centered ? 'center' : undefined,
        justifyContent: centered ? 'center' : undefined,
        marginTop: offsetTop ? 'var(--header-h, 88px)' : undefined,
        minHeight: centered ? 'var(--section-h, calc(var(--app-vh, 100dvh) - var(--header-h, 88px)))' : undefined,
        boxSizing: centered ? 'border-box' : undefined,
        backgroundColor: 'var(--bg-2)',
        width: '100%',
      }}
      tabIndex={-1}
    >
      {background && (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {background}
        </div>
      )}
      <div className="section-overlay" aria-hidden="true" />
      <Container size="lg" py={centered ? 0 : { base: 80, md: 120 }} style={{ position: 'relative', width: '100%', zIndex: 1 }}>
        {/* Anchor sentinel when no explicit title is provided */}
        {!title && (
          <div id={`${id}-title`} aria-hidden="true" style={{ position: 'absolute', insetInline: 0, top: 0, height: 0 }} />
        )}
        {(title || subtitle) && (
          <Stack gap={8} mb={{ base: 20, md: 28 }} className="section-header">
            {title && (
              <Title id={`${id}-title`} order={2} c="var(--text)">
                {title}
              </Title>
            )}
            {subtitle && (
              <Text className="lede">{subtitle}</Text>
            )}
          </Stack>
        )}
        {children}
      </Container>
      {divider !== 'none' && (
        <div aria-hidden="true" style={{ height: 24, opacity: 0.5 }} />
      )}
    </section>
  )
}

export default Section
