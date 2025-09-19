import { Page } from './layout/Page'
import Section from './layout/Section'
import Hero from './components/Hero/Hero'
// import CircuitBackdrop from './components/Hero/CircuitBackdrop'
import ValueProps from './components/ValueProps/ValueProps'
import KeyInfo from './components/KeyInfo/KeyInfo'
import Schedule from './components/Schedule/Schedule'
import PastYears from './components/PastYears/PastYears'
import Sponsors from './components/Sponsors/Sponsors'
import FAQ from './components/FAQ/FAQ'
import Team from './components/Team/Team'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import { CountdownBar } from './components/Hero/CountdownBar'
import event from './data/event.json'

export default function App(){
  return (
    <Page>
      <Section id="hero" centered
        // background={<CircuitBackdrop startsAt={event.startsAt} safeZoneSelector="#hero [data-safezone]" palette={{ trace: 'rgba(100,13,20,0.40)', glow: 'rgba(173,40,49,0.35)', accent: 'rgba(128,14,19,0.80)' }} />}
      >
        <Hero event={event} />
      </Section>

      <Section id="countdown" title="Countdown" subtitle="Time left until hacking begins">
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <CountdownBar startsAt={event.startsAt} />
        </div>
      </Section>

      <Section id="about" title="What & Why" subtitle="[Add 1–2 sentence pitch for participants]">
        <ValueProps />
      </Section>

      <Section id="key-info" title="Key Info" subtitle="High‑level details to orient participants">
        <KeyInfo />
      </Section>

      <Section id="schedule" title="Schedule Snapshot" subtitle="Greyed until finalised">
        <Schedule />
      </Section>

      <Section id="past-years" title="Past Years" subtitle="Quick stats + gallery from prior years">
        <PastYears />
      </Section>

      <Section id="sponsors" title="Sponsors & Partners" subtitle="Previous year sponsors shown for now">
        <Sponsors />
      </Section>

      <Section id="faq" title="FAQs" subtitle="Common questions about eligibility, logistics, IP, and more">
        <FAQ />
      </Section>

      <Section id="team" title="Team & Contacts" subtitle="Organisers and ways to reach out">
        <Team />
      </Section>

      <Section id="contact" title="Mailing List / Interest Forms" subtitle="Register, volunteer, judge, or sponsor — link your forms below">
        <Contact />
      </Section>

      <Footer />
    </Page>
  )
}
