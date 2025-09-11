import { type PropsWithChildren } from 'react'
import { Container, Title, Text, Stack } from '@mantine/core'
import './Gradients.css'

type Divider = 'diagonal' | 'wave' | 'none'
type GradientName =
  | 'bg-gradient-crimson-mesh'
  | 'bg-gradient-rosewood-radial'
  | 'bg-gradient-falu-diagonal'
  | 'bg-gradient-auburn-wave'

type Props = PropsWithChildren<{
  id: string
  title?: string
  subtitle?: string
  gradient: GradientName
  divider?: Divider
  centered?: boolean
  offsetTop?: boolean
}>

export function Section({ id, title, subtitle, gradient, divider = 'none', centered = false, offsetTop = false, children }: Props) {
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
        minHeight: centered ? 'calc(var(--app-vh, 100dvh) - var(--header-h, 88px))' : undefined,
        height: centered ? 'calc(var(--app-vh, 100dvh) - var(--header-h, 88px))' : undefined,
        boxSizing: centered ? 'border-box' : undefined,
        width: '100%',
        scrollMarginTop: 'var(--header-h, 88px)',
      }}
      tabIndex={-1}
      className={`${gradient} g-animate`}>
      <div className="section-overlay" aria-hidden="true" />
      <Container size="lg" py={centered ? 0 : { base: 80, md: 120 }} style={{ position: 'relative', width: '100%' }}>
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
