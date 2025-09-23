import { Page } from './layout/Page'
import Section from './layout/Section'
import Hero from './components/Hero/Hero'
import VenueFocus from './components/Venue/VenueFocus'
import Team from './components/Team/Team'
import Sponsors from './components/Sponsors/Sponsors'
import FAQ from './components/FAQ/FAQ'
import FormsPanel from './components/Forms/FormsPanel'
import Footer from './components/Footer/Footer'
import { Grid, Stack, Text } from '@mantine/core'

export default function App(){
  return (
    <Page>
      <Section id="hero" tone="canvas" padding="none" centered>
        <Hero />
      </Section>

      <Section id="venue" title="Venue" subtitle="Nancy Rothwell Building access overview" padding="compact">
        <VenueFocus />
      </Section>

      <Section id="team" title="Organisers" subtitle="Meet the student team behind Hack-A-Bot" padding="compact">
        <Team />
      </Section>

      <Section id="sponsors" title="Sponsors" subtitle="Thank you to our partners" padding="compact">
        <Sponsors />
      </Section>

      <Section id="faq" title="FAQs & Forms" subtitle="Essential answers and next steps" padding="compact">
        <Grid gutter={{ base: 32, md: 48 }} align="stretch">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={20}>
              <Text id="faq-title" fw={600} fz={{ base: 'lg', md: 'xl' }}>Frequently asked questions</Text>
              <FAQ />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={20} style={{ position: 'relative' }}>
              <div id="contact" tabIndex={-1} style={{ position: 'absolute', top: '-80px', left: 0, width: '1px', height: '1px' }} aria-hidden="true" />
              <Text fw={600} fz={{ base: 'lg', md: 'xl' }}>Forms</Text>
              <FormsPanel />
            </Stack>
          </Grid.Col>
        </Grid>
      </Section>

      <Footer />
    </Page>
  )
}
