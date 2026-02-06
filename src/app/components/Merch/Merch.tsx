import { Grid, Card, Stack, Text, Title, Box, Button, SimpleGrid, Image } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import type { ReactNode } from 'react'
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'
import merch from '../../data/merch.json'
import { assetPath } from '../../lib/assets'
import './Merch.css'

type MerchNote = {
  label: string
  body: string
  tone?: 'accent' | 'neutral'
}

type MerchBlock = {
  title: string
  description: string
  image: string
  alt: string
  imagePosition?: string
  imageFit?: 'cover' | 'contain'
  imageAspectRatio?: string
  tone?: 'accent' | 'neutral'
  formUrl?: string
  items?: string[]
  notes?: MerchNote[]
}

type MerchData = {
  free: MerchBlock
  paid: MerchBlock
}

export function Merch(){
  const data = merch as MerchData
  const isDesktop = useMediaQuery('(min-width: 48em)')

  const renderBlock = (block: MerchBlock, extra?: ReactNode) => {
    const isPaid = block.tone === 'accent' || block.title.toLowerCase().includes('paid')
    const chipStyle = {
      padding: '6px 10px',
      borderRadius: 10,
      background: isPaid ? 'rgba(239,35,60,0.18)' : 'rgba(255,255,255,0.04)',
      border: isPaid ? '1px solid rgba(239,35,60,0.35)' : '1px solid rgba(255,255,255,0.08)',
    } as const

    const noteStyle = (tone: MerchNote['tone']) => ({
      background: tone === 'accent' ? 'rgba(239,35,60,0.24)' : 'rgba(255,255,255,0.04)',
      borderColor: tone === 'accent' ? 'rgba(239,35,60,0.7)' : 'rgba(255,255,255,0.12)',
    })

    const paneStyle = isPaid
      ? {
          background: 'linear-gradient(140deg, rgba(239,35,60,0.16), rgba(22,24,35,0.94))',
          borderColor: 'rgba(239,35,60,0.35)',
        }
      : { background: 'var(--panel)' }

    const lineup = block.items?.length ? (
      <Stack gap={8}>
        <Text fz="xs" fw={700} tt="uppercase" style={{ letterSpacing: '0.08em' }}>
          Lineup
        </Text>
        <SimpleGrid cols={{ base: 2, sm: 2, md: 3 }} spacing={6}>
          {block.items.map((item) => (
            <Box key={item} style={chipStyle}>
              <Text fz="sm" fw={600} c="var(--text)">
                {item}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    ) : null

    const firstNote = block.notes?.[0]
    const remainingNotes = block.notes?.slice(1) ?? []

    return (
      <Card withBorder radius="lg" p={{ base: 'md', md: 'lg' }} style={{ height: '100%', ...paneStyle }}>
      <Stack gap={12} style={{ height: '100%' }}>
        <Stack gap={6}>
          <Title order={3}>{block.title}</Title>
          <Text c="var(--text-dim)">{block.description}</Text>
        </Stack>
        <Box
          style={{
            width: '100%',
            aspectRatio: block.imageAspectRatio ?? '16 / 9',
            borderRadius: 14,
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: 'rgba(255,255,255,0.02)',
            ['--merch-object-position' as any]: block.imagePosition ?? 'center center',
            ['--merch-object-fit' as any]: block.imageFit ?? 'cover',
          }}
        >
          {isPaid ? (
            isDesktop ? (
              <InnerImageZoom
                className="merch-zoom"
                src={assetPath(block.image)}
                zoomSrc={assetPath(block.image)}
                zoomType="hover"
                zoomScale={1.05}
                hideHint
                hideCloseButton
                imgAttributes={{
                  alt: block.alt,
                  style: { width: '100%', height: '100%', objectFit: block.imageFit ?? 'cover', objectPosition: block.imagePosition ?? 'center' },
                  loading: 'lazy',
                  decoding: 'async',
                }}
              />
            ) : (
              <Image
                src={assetPath(block.image)}
                alt={block.alt}
                fit={block.imageFit ?? 'cover'}
                width="100%"
                height="100%"
                loading="lazy"
                decoding="async"
                style={{ objectPosition: 'var(--merch-object-position)' }}
              />
            )
          ) : (
            <Image
              src={assetPath(block.image)}
              alt={block.alt}
              fit={block.imageFit ?? 'cover'}
              width="100%"
              height="100%"
              loading="lazy"
              decoding="async"
              style={{ objectPosition: 'var(--merch-object-position)' }}
            />
          )}
        </Box>
        <Text fz="xs" c="var(--text-dim)">
          Concept design — subject to change.
        </Text>
        {firstNote ? (
          <Stack gap={8}>
            <Card
              withBorder
              radius="md"
              p="sm"
              style={noteStyle(firstNote.tone)}
            >
              <Text fz="xs" fw={700} tt="uppercase" style={{ letterSpacing: '0.08em', marginBottom: 4 }}>
                {firstNote.label}
              </Text>
              <Text fz="sm" fw={600} c="var(--text)">
                {firstNote.body}
              </Text>
            </Card>
            {lineup}
          </Stack>
        ) : (
          lineup
        )}
        {remainingNotes.length ? (
          <Stack gap={8}>
            {remainingNotes.map((note) => (
              <Card
                key={note.label}
                withBorder
                radius="md"
                p="sm"
                style={noteStyle(note.tone)}
              >
                <Text fz="xs" fw={700} tt="uppercase" style={{ letterSpacing: '0.08em', marginBottom: 4 }}>
                  {note.label}
                </Text>
                <Text fz="sm" fw={600} c="var(--text)">
                  {note.body}
                </Text>
              </Card>
            ))}
          </Stack>
        ) : null}
        {extra}
      </Stack>
      </Card>
    )
  }

  return (
    <Grid gutter={{ base: 24, md: 32 }} align="start">
      <Grid.Col span={{ base: 12, md: 6 }}>
        {renderBlock(data.free)}
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 6 }}>
        {renderBlock(
          data.paid,
          <Button
            component={data.paid.formUrl ? 'a' : 'button'}
            href={data.paid.formUrl || undefined}
            target={data.paid.formUrl ? '_blank' : undefined}
            rel={data.paid.formUrl ? 'noopener noreferrer' : undefined}
            color="crimson"
            radius="md"
            disabled={!data.paid.formUrl}
            fullWidth
            style={isDesktop ? { alignSelf: 'stretch' } : undefined}
          >
            Fill in the merch feedback form
          </Button>
        )}
      </Grid.Col>
    </Grid>
  )
}

export default Merch
