import { Container, Grid, Stack, Text, Box } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import event from '../../data/event.json'
import HeroCard from './HeroCard'
import { CountdownBar } from './CountdownBar'
import PastPhotosMosaic from './PastPhotosMosaic'
import KeyInfoList from '../KeyInfo/KeyInfoList'
import PagePanel from '../../layout/PagePanel'

export function Hero(){
  const isMobile = useMediaQuery('(max-width: 48em)')
  const columnPadding = isMobile ? 0 : 24

  return (
    <Container size="lg" py={0} style={{ paddingInline: 0 }}>
      <PagePanel
        align={isMobile ? 'top' : 'center'}
        px={isMobile ? '16px' : undefined}
        py={isMobile ? '32px' : undefined}
      >
        <Stack gap={{ base: 32, md: 40 }} style={{ height: isMobile ? 'auto' : '100%' }}>
          <Grid
            gutter={{ base: 32, md: 52 }}
            align="stretch"
            style={{ margin: 0, ['--mantine-grid-offset' as any]: '0px' }}
          >
            <Grid.Col
              span={{ base: 12, md: 5 }}
              style={{ paddingLeft: 0, paddingRight: columnPadding, boxSizing: 'border-box' }}
            >
              <HeroCard />
            </Grid.Col>
            <Grid.Col
              span={{ base: 12, md: 7 }}
              style={{ paddingLeft: columnPadding, paddingRight: 0, boxSizing: 'border-box' }}
            >
              <Stack gap={{ base: 24, md: 32 }} style={{ height: isMobile ? 'auto' : '100%' }}>
                <Box style={{ width: '100%' }}>
                  <CountdownBar startsAt={event.startsAt} />
                </Box>
                <Stack gap={{ base: 16, md: 24 }} style={{ flex: isMobile ? undefined : 1, minHeight: 0 }}>
                  <Text fw={600} fz={{ base: 'md', md: 'lg' }} c="var(--text)">
                    Past highlights
                  </Text>
                  <Box style={{ flex: 1, minHeight: 0, width: '100%', display: 'flex' }}>
                    <PastPhotosMosaic />
                  </Box>
                </Stack>
              </Stack>
            </Grid.Col>
          </Grid>

          <Stack gap={{ base: 16, md: 24 }}>
            <Text fw={600} fz={{ base: 'md', md: 'lg' }} c="var(--text)">
              Key information
            </Text>
            <KeyInfoList />
          </Stack>
        </Stack>
      </PagePanel>
    </Container>
  )
}

export default Hero
