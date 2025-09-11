import { Accordion } from '@mantine/core'
import data from '../../data/faq.json'

type QA = { q: string; a: string }

export function FAQ(){
  const list: QA[] = data as any
  return (
    <Accordion chevronPosition="right" multiple>
      {list.map((qa, i) => (
        <Accordion.Item key={i} value={`q${i}`}>
          <Accordion.Control>{qa.q}</Accordion.Control>
          <Accordion.Panel>{qa.a}</Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}

export default FAQ

