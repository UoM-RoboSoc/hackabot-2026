import { Page } from './layout/Page'
import Section from './layout/Section'
import Hero from './components/Hero/Hero'
import VenueFocus from './components/Venue/VenueFocus'
import Team from './components/Team/Team'
import Sponsors from './components/Sponsors/Sponsors'
import Merch from './components/Merch/Merch'
import Tickets from './components/Tickets/Tickets'
import FAQ from './components/FAQ/FAQ'
import FormsPanel from './components/Forms/FormsPanel'
import Footer from './components/Footer/Footer'
import { Grid, Stack, Text, Card, Box, Button, Image } from '@mantine/core'
import { assetPath } from './lib/assets'
import { useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'

export default function App(){
  const [copiedEmail, setCopiedEmail] = useState(false)
  const emailAddress = 'hackabot@uom-robosoc.com'
  const isDesktop = useMediaQuery('(min-width: 48em)')

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress)
      setCopiedEmail(true)
      window.setTimeout(() => setCopiedEmail(false), 2000)
    } catch {
      window.location.href = `mailto:${emailAddress}`
    }
  }
  return (
    <Page>
      <Section id="hero" tone="canvas" padding="none" centered>
        <Hero />
      </Section>

      <Section id="venue" title="Venue" subtitle="Nancy Rothwell Building overview" padding="compact">
        <VenueFocus />
      </Section>

      <Section id="team" title="Organisers" subtitle="Meet the student team behind Hack-A-Bot" padding="compact">
        <Team />
      </Section>

      <Section id="sponsors" title="Sponsors" subtitle="Thank you to our partners" padding="compact">
        <Sponsors />
      </Section>

      <Section id="merch" title="Merch" subtitle="Free merch for every participant + paid lineup coming soon" padding="compact">
        <Merch />
      </Section>

      <Section id="tickets" title="Tickets" subtitle="Follow the steps below to claim your free ticket" padding="compact">
        <Tickets />
      </Section>

      <Section id="faq" title="FAQs, Forms & Contact" subtitle="Essential answers and next steps" padding="compact">
        <Grid gutter={{ base: 32, md: 48 }} align="stretch">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={20}>
              <Text id="faq-title" fw={600} fz={{ base: 'lg', md: 'xl' }}>Frequently asked questions</Text>
              <FAQ />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap={20} style={{ position: 'relative' }}>
              <div id="forms" tabIndex={-1} style={{ position: 'absolute', top: '-80px', left: 0, width: '1px', height: '1px' }} aria-hidden="true" />
              <Text fw={600} fz={{ base: 'lg', md: 'xl' }}>Forms</Text>
              <FormsPanel />
              <div id="contact" tabIndex={-1} style={{ position: 'absolute', top: '-80px', left: 0, width: '1px', height: '1px' }} aria-hidden="true" />
              <Text fw={600} fz={{ base: 'lg', md: 'xl' }}>Contact</Text>
              <Card withBorder radius="lg" p={{ base: 'md', md: 'lg' }} style={{ background: 'var(--panel)' }}>
                {isDesktop ? (
                  <Box style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center', gap: 12 }}>
                    <Image src={assetPath('icons/email.svg')} alt="Email icon" w={56} h={56} loading="lazy" decoding="async" />
                    <Stack gap={6}>
                      <Text fw={700} fz={{ base: 'md', md: 'lg' }} c="var(--text)">Send us an email</Text>
                      <Text fz="sm" c="var(--text-dim)">We’re happy to help with any questions about the event.</Text>
                    </Stack>
                    <Stack gap={4} align="center" style={{ width: 170 }}>
                      <Button
                        variant="light"
                        color={copiedEmail ? 'teal' : 'crimson'}
                        radius="md"
                        style={{ width: '100%' }}
                        onClick={copyEmailToClipboard}
                      >
                        {copiedEmail ? 'Copied!' : 'Copy Email'}
                      </Button>
                    </Stack>
                  </Box>
                ) : (
                  <Stack gap={10}>
                    <Box style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', gap: 10 }}>
                      <Image src={assetPath('icons/email.svg')} alt="Email icon" w={40} h={40} loading="lazy" decoding="async" />
                      <Stack gap={4}>
                        <Text fw={700} c="var(--text)">Send us an email</Text>
                        <Text fz="sm" c="var(--text-dim)">We’re happy to help with any questions about the event.</Text>
                      </Stack>
                    </Box>
                    <Stack gap={4} align="center" style={{ width: '100%' }}>
                      <Button
                        variant="light"
                        color={copiedEmail ? 'teal' : 'crimson'}
                        radius="md"
                        style={{ width: '100%' }}
                        onClick={copyEmailToClipboard}
                      >
                        {copiedEmail ? 'Copied!' : 'Copy Email'}
                      </Button>
                    </Stack>
                  </Stack>
                )}
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </Section>

      <Footer />
    </Page>
  )
}
