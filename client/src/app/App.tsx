import { Page } from './layout/Page'
import Section from './layout/Section'
import Hero from './components/Hero/Hero'
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
      <Section id="hero" gradient="bg-gradient-crimson-mesh">
        <Hero event={event} />
      </Section>

      <Section id="countdown" title="Countdown" subtitle="Time left until hacking begins" gradient="bg-gradient-rosewood-radial">
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <CountdownBar startsAt={event.startsAt} />
        </div>
      </Section>

      <Section id="about" title="What & Why" subtitle="[Add 1–2 sentence pitch for participants]" gradient="bg-gradient-rosewood-radial">
        <ValueProps />
      </Section>

      <Section id="key-info" title="Key Info" subtitle="High‑level details to orient participants" gradient="bg-gradient-falu-diagonal">
        <KeyInfo />
      </Section>

      <Section id="schedule" title="Schedule Snapshot" subtitle="Greyed until finalised" gradient="bg-gradient-auburn-wave">
        <Schedule />
      </Section>

      <Section id="past-years" title="Past Years" subtitle="Quick stats + gallery from prior years" gradient="bg-gradient-rosewood-radial">
        <PastYears />
      </Section>

      <Section id="sponsors" title="Sponsors & Partners" subtitle="Previous year sponsors shown for now" gradient="bg-gradient-falu-diagonal">
        <Sponsors />
      </Section>

      <Section id="faq" title="FAQs" subtitle="Common questions about eligibility, logistics, IP, and more" gradient="bg-gradient-crimson-mesh">
        <FAQ />
      </Section>

      <Section id="team" title="Team & Contacts" subtitle="Organisers and ways to reach out" gradient="bg-gradient-auburn-wave">
        <Team />
      </Section>

      <Section id="contact" title="Mailing List / Interest Forms" subtitle="Register, volunteer, judge, or sponsor — link your forms below" gradient="bg-gradient-rosewood-radial">
        <Contact />
      </Section>

      <Footer />
    </Page>
  )
}
