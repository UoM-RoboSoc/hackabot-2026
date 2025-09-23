import { Container, Grid, Stack, Text, SimpleGrid } from '@mantine/core'
import event from '../../data/event.json'
import HeroCard from './HeroCard'
import { CountdownBar } from './CountdownBar'
import PastPhotosMosaic from './PastPhotosMosaic'
import KeyInfoList from '../KeyInfo/KeyInfoList'
import PagePanel from '../../layout/PagePanel'

export function Hero(){
  return (
    <Container size="lg" py={0} style={{ paddingInline: 0 }}>
      <PagePanel>
        <Grid
          gutter={{ base: 32, md: 52 }}
          align="stretch"
          style={{ margin: 0, ['--mantine-grid-offset' as any]: '0px' }}
        >
          <Grid.Col
            span={{ base: 12, md: 5 }}
            style={{ paddingLeft: 0, paddingRight: 24, boxSizing: 'border-box' }}
          >
            <HeroCard />
          </Grid.Col>
          <Grid.Col
            span={{ base: 12, md: 7 }}
            style={{ paddingLeft: 24, paddingRight: 0, boxSizing: 'border-box' }}
          >
            <Stack gap={{ base: 28, md: 36 }} justify="space-between" style={{ height: '100%' }}>
              <CountdownBar startsAt={event.startsAt} />
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing={{ base: 20, md: 32 }}>
                <Stack gap={12}>
                  <Text fw={600} fz={{ base: 'md', md: 'lg' }} c="var(--text)">
                    Past highlights
                  </Text>
                  <PastPhotosMosaic />
                </Stack>
                <Stack gap={12}>
                  <Text fw={600} fz={{ base: 'md', md: 'lg' }} c="var(--text)">
                    Key information
                  </Text>
                  <KeyInfoList />
                </Stack>
              </SimpleGrid>
            </Stack>
          </Grid.Col>
        </Grid>
      </PagePanel>
    </Container>
  )
}

export default Hero
