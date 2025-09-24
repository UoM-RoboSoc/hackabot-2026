import { Accordion } from '@mantine/core'
import { useEffect, useState } from 'react'
import data from '../../data/faq.json'

type QA = { q: string; a: string }

export function FAQ(){
  const list: QA[] = data as any
  const [opened, setOpened] = useState<string[]>([])

  useEffect(() => {
    const h = window.location.hash.slice(1)
    if (h.startsWith('faq-q')) {
      const key = h.replace('faq-', '')
      setOpened((prev) => (prev.includes(key) ? prev : [...prev, key]))
      // Bring focus to the item for a11y
      const el = document.getElementById(h)
      el?.focus?.()
    }
  }, [])

  const onChange = (values: string[]) => {
    setOpened(values)
    if (values.length) {
      const last = values[values.length - 1]
      history.replaceState(null, '', `#faq-${last}`)
    } else {
      history.replaceState(null, '', '#faq')
    }
  }

  return (
    <Accordion
      chevronPosition="right"
      multiple
      value={opened}
      onChange={onChange}
      radius="lg"
      styles={(theme) => ({
        item: {
          border: '1px solid var(--border)',
          borderRadius: 12,
          marginBottom: 8,
          background: 'var(--panel)',
          overflow: 'hidden',
          '&:hover': {
            background: 'var(--panel)',
            borderColor: 'var(--border)',
          },
        },
        control: {
          minHeight: 56,
          paddingBlock: 12,
          color: 'var(--text)',
          '&[data-active]': {
            color: theme.colors.red[5],
          },
          '&:hover': {
            background: 'transparent',
          },
        },
        chevron: { color: 'var(--text-dim)' },
        panel: {
          background: 'rgba(0,0,0,0)',
          color: 'var(--text-dim)',
          padding: '0 16px 16px',
        },
      })}
    >
      {list.map((qa, i) => {
        const value = `q${i}`
        const id = `faq-${value}`
        return (
          <Accordion.Item key={value} value={value} id={id}>
            <Accordion.Control>{qa.q}</Accordion.Control>
            <Accordion.Panel>{qa.a}</Accordion.Panel>
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}

export default FAQ
