import { Box, Button, Card, Group, Image, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconArrowLeft } from '@tabler/icons-react'
import { assetPath } from '../../lib/assets'
import './MerchFlow.css'

export type MerchProductId = 'tee' | 'hoodie' | 'crew' | 'robo-hoodie'

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
  price: string
  image: string
  imageAlt: string
  subtitle: string
  details: string
  pageUrl: string
}

const merchProducts: MerchProductCard[] = [
  {
    id: 'tee',
    name: 'Hack-A-Bot Tee',
    price: '£18',
    image: 'merch/product-images/tee 2.png',
    imageAlt: 'Merch tee product image',
    subtitle: 'Creator 2.0 (STTU169)',
    details: 'Unisex iconic t-shirt, medium fit, 180 GSM.',
    pageUrl: '/merch/products/tee.html',
  },
  {
    id: 'robo-hoodie',
    name: 'RoboSoc Hoodie',
    price: '£30',
    image: 'merch/product-images/robo 2.png',
    imageAlt: 'RoboSoc hoodie product image',
    subtitle: 'Drummer 2.0 (STSU168)',
    details: 'Unisex hoodie, medium fit, 280 GSM.',
    pageUrl: '/merch/products/robo-hoodie.html',
  },
  {
    id: 'crew',
    name: 'Hack-A-Bot Crew',
    price: '£32',
    image: 'merch/product-images/crew 2.jpg',
    imageAlt: 'Merch crew product image',
    subtitle: 'Thinker (STSU269)',
    details: 'Unisex recycled cotton crewneck, medium fit, 350 GSM.',
    pageUrl: '/merch/products/crew.html',
  },
  {
    id: 'hoodie',
    name: 'Hack-A-Bot Hoodie',
    price: '£40',
    image: 'merch/product-images/hoodie 2.png',
    imageAlt: 'Merch hoodie front view',
    subtitle: 'Slammer 2.0 (STSU209)',
    details: 'Unisex organic cotton hoodie, oversized fit, 350 GSM.',
    pageUrl: '/merch/products/hoodie.html',
  },
]

function getProductById(productId: MerchProductId) {
  return merchProducts.find((product) => product.id === productId) ?? merchProducts[1]
}

function MerchBackButton({ onBack, compact = false }: { onBack: () => void; compact?: boolean }) {
  return (
    <Button
      className="merch-flow-back"
      variant="subtle"
      leftSection={<IconArrowLeft size={compact ? 14 : 16} />}
      onClick={onBack}
      color="gray"
      size={compact ? 'xs' : 'sm'}
      styles={{
        root: {
          paddingInline: compact ? 8 : 10,
          minHeight: compact ? 30 : 36,
          height: compact ? 30 : 36,
        },
      }}
    >
      Back
    </Button>
  )
}

function MerchListView({ onBack, onOpenProduct }: Pick<MerchFlowProps, 'onBack' | 'onOpenProduct'>) {
  const isMobile = useMediaQuery('(max-width: 48em)')

  return (
    <Stack gap={isMobile ? 12 : 20} style={{ width: '100%' }}>
      <Group justify="space-between" align="center" className="merch-flow-header">
        <MerchBackButton onBack={onBack} compact={isMobile} />
        <Text c="var(--text-dim)" fw={700} tt="uppercase" style={{ letterSpacing: '0.08em' }}>
          Merch
        </Text>
      </Group>

      <Stack gap={6}>
        <Title order={2}>Choose your Hack-A-Bot merch</Title>
        <Text c="var(--text-dim)">Ready for collection at Hack-A-Bot 2026</Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={{ base: 16, md: 20 }}>
        {merchProducts.map((product) => (
          <Card
            key={product.id}
            withBorder
            radius="lg"
            p="md"
            className="merch-choice-card"
            style={{ height: '100%' }}
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
                className="merch-choice-media"
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                }}
              >
                <Image
                  className="merch-choice-image"
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
                <Group justify="space-between" align="center" gap={8}>
                  <Title order={4} className="merch-choice-title">{product.name}</Title>
                  <Text fz="sm" className="merch-choice-price">
                    {product.price}
                  </Text>
                </Group>
                <Text fz="sm" className="merch-choice-meta">
                  {product.subtitle}
                </Text>
                <Text fz="sm" className="merch-choice-meta">
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
  const isMobile = useMediaQuery('(max-width: 48em)')
  const product = route.kind === 'product' ? getProductById(route.productId) : merchProducts[1]

  return (
    <Stack gap={isMobile ? 8 : 16} style={{ width: '100%', minHeight: 0, height: '100%', flex: 1 }}>
      <Group justify="space-between" align="center" className="merch-flow-header">
        <MerchBackButton onBack={onBack} compact={isMobile} />
        <Text c="var(--text-dim)" fw={700} tt="uppercase" style={{ letterSpacing: '0.08em' }}>
          Merch
        </Text>
      </Group>

      <iframe
        src={product.pageUrl}
        title={`${product.name} product page`}
        style={{
          width: '100%',
          minHeight: 0,
          height: '100%',
          flex: 1,
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
