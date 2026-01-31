import { Grid, Card, Stack, Text, Title, Image, Box, Button, SimpleGrid } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import type { ReactNode } from 'react'
import merch from '../../data/merch.json'
import { assetPath } from '../../lib/assets'

type MerchBlock = {
  title: string
  description: string
  image: string
  alt: string
  formUrl?: string
  items?: string[]
}

type MerchData = {
  free: MerchBlock
  paid: MerchBlock
}

export function Merch(){
  const data = merch as MerchData
  const isDesktop = useMediaQuery('(min-width: 48em)')

  const renderBlock = (block: MerchBlock, extra?: ReactNode) => (
    <Card withBorder radius="lg" p={{ base: 'md', md: 'lg' }} style={{ background: 'var(--panel)', height: '100%' }}>
      <Stack gap={12} style={{ height: '100%' }}>
        <Stack gap={6}>
          <Title order={3}>{block.title}</Title>
          <Text c="var(--text-dim)">{block.description}</Text>
        </Stack>
        {block.items?.length ? (
          <SimpleGrid cols={{ base: 2, sm: 2, md: 3 }} spacing={6}>
            {block.items.map((item) => (
              <Text key={item} fz="sm" c="var(--text)">
                • {item}
              </Text>
            ))}
          </SimpleGrid>
        ) : null}
        <Box
          style={{
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: 14,
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: 'rgba(255,255,255,0.02)'
          }}
        >
          <Image
            src={assetPath(block.image)}
            alt={block.alt}
            fit="cover"
            width="100%"
            height="100%"
            loading="lazy"
            decoding="async"
          />
        </Box>
        {extra}
      </Stack>
    </Card>
  )

  return (
    <Grid gutter={{ base: 24, md: 32 }} align="stretch">
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
