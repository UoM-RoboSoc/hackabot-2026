import { Container, Grid, Stack, Text, Flex, Paper } from '@mantine/core'
import event from '../../data/event.json'
import HeroCard from './HeroCard'
import { CountdownBar } from './CountdownBar'
import PastPhotosMosaic from './PastPhotosMosaic'
import KeyInfoList from '../KeyInfo/KeyInfoList'

export function Hero(){
  return (
    <Container size="lg" py={0} style={{ paddingInline: 0 }}>
      <Paper
        withBorder={false}
        radius="lg"
        shadow="none"
        p={0}
        style={{
          background: 'transparent',
          border: 'none',
          minHeight: 'calc(var(--app-vh, 100vh) - var(--header-h, 72px))',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(60px, 6vh, 56px) clamp(20px, 6vw, 64px)',
          boxSizing: 'border-box',
        }}
      >
        <Grid gutter={{ base: 32, md: 52 }} align="stretch">
          <Grid.Col span={{ base: 12, md: 5 }}>
            <HeroCard />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 7 }}>
            <Stack gap={{ base: 28, md: 36 }} justify="space-between" style={{ height: '100%' }}>
              <CountdownBar startsAt={event.startsAt} />
              <Flex gap={{ base: 20, md: 32 }} direction={{ base: 'column', md: 'row' }} align="stretch">
                <Stack gap={12} style={{ flex: 1, minWidth: 0 }}>
                  <Text fw={600} fz={{ base: 'md', md: 'lg' }} c="var(--text)">
                    Past highlights
                  </Text>
                  <PastPhotosMosaic />
                </Stack>
                <Stack gap={12} style={{ flex: 1, minWidth: 0 }}>
                  <Text fw={600} fz={{ base: 'md', md: 'lg' }} c="var(--text)">
                    Key information
                  </Text>
                  <KeyInfoList />
                </Stack>
              </Flex>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Hero
