import { Box, Button, Card, Group, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { assetPath } from '../../lib/assets'

export type MerchProductId = 'tee' | 'hoodie' | 'crew'

export type MerchRoute =
  | { kind: 'list' }
  | { kind: 'product'; productId: MerchProductId }

type MerchFlowProps = {
  route: MerchRoute
  onBack: () => void
  onOpenProduct: (id: MerchProductId) => void
}

type MerchProductCard = {
  id: MerchProductId
  name: string
  image: string
  imageAlt: string
  subtitle: string
  details: string
  pageUrl: string
}

const merchProducts: MerchProductCard[] = [
  {
    id: 'tee',
    name: 'Tee',
    image: 'merch/slammer/Hoodie-2.png',
    imageAlt: 'Merch tee placeholder',
    subtitle: 'Lightweight cut',
    details: 'Placeholder product page for now.',
    pageUrl: '/merch/products/tee.html',
  },
  {
    id: 'hoodie',
    name: 'Hoodie',
    image: 'merch/slammer/Hoodie-1.png',
    imageAlt: 'Merch hoodie front view',
    subtitle: 'Heavyweight blank',
    details: 'Slammer 2.0 product details and gallery.',
    pageUrl: '/merch/products/hoodie.html',
  },
  {
    id: 'crew',
    name: 'Crew',
    image: 'merch/slammer/Hoodie-3.png',
    imageAlt: 'Merch crew placeholder',
    subtitle: 'Classic crewneck',
    details: 'Placeholder product page for now.',
    pageUrl: '/merch/products/crew.html',
  },
]

function getProductById(productId: MerchProductId) {
  return merchProducts.find((product) => product.id === productId) ?? merchProducts[1]
}

function MerchBackButton({ onBack }: { onBack: () => void }) {
  return (
    <Button
      variant="subtle"
      leftSection={<IconArrowLeft size={16} />}
      onClick={onBack}
      color="gray"
      styles={{
        root: {
          paddingInline: 10,
        },
      }}
    >
      Back
    </Button>
  )
}

function MerchListView({ onBack, onOpenProduct }: Pick<MerchFlowProps, 'onBack' | 'onOpenProduct'>) {
  return (
    <Stack gap={20}>
      <Group justify="space-between" align="center">
        <MerchBackButton onBack={onBack} />
        <Text c="var(--text-dim)" fw={700} tt="uppercase" style={{ letterSpacing: '0.08em' }}>
          Merch
        </Text>
      </Group>

      <Stack gap={6}>
        <Title order={2}>Buy the merch</Title>
        <Text c="var(--text-dim)">Choose a product to open its dedicated product page.</Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 1, md: 3 }} spacing={{ base: 16, md: 20 }}>
        {merchProducts.map((product) => (
          <Card
            key={product.id}
            withBorder
            radius="lg"
            p="md"
            style={{
              background: 'var(--panel)',
              borderColor: 'var(--border)',
              cursor: 'pointer',
              height: '100%',
            }}
            onClick={() => onOpenProduct(product.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onOpenProduct(product.id)
              }
            }}
            aria-label={`Open ${product.name} product page`}
          >
            <Stack gap={12} h="100%">
              <Box
                style={{
                  width: '100%',
                  aspectRatio: '2 / 3',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <Image
                  src={assetPath(product.image)}
                  alt={product.imageAlt}
                  fit="cover"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  decoding="async"
                />
              </Box>

              <Stack gap={4}>
                <Title order={4}>{product.name}</Title>
                <Text fz="sm" c="var(--text-dim)">
                  {product.subtitle}
                </Text>
                <Text fz="sm" c="var(--text-dim)">
                  {product.details}
                </Text>
              </Stack>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  )
}

function MerchProductView({
  route,
  onBack,
}: Pick<MerchFlowProps, 'route' | 'onBack'>) {
  const product = route.kind === 'product' ? getProductById(route.productId) : merchProducts[1]

  return (
    <Stack gap={16}>
      <Group justify="space-between" align="center">
        <MerchBackButton onBack={onBack} />
        <Text c="var(--text-dim)" fw={700} tt="uppercase" style={{ letterSpacing: '0.08em' }}>
          Merch
        </Text>
      </Group>

      <iframe
        src={product.pageUrl}
        title={`${product.name} product page`}
        style={{
          width: '100%',
          height: 'calc(var(--app-vh, 100dvh) - 210px)',
          border: 0,
          display: 'block',
          background: 'transparent',
        }}
      />
    </Stack>
  )
}

export function MerchFlow({ route, onBack, onOpenProduct }: MerchFlowProps) {
  if (route.kind === 'list') {
    return <MerchListView onBack={onBack} onOpenProduct={onOpenProduct} />
  }

  return <MerchProductView route={route} onBack={onBack} />
}

export default MerchFlow
