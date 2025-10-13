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
          marginBottom: 6,
          background: 'var(--panel)',
          overflow: 'hidden',
          transition: 'box-shadow 120ms ease, border-color 120ms ease, background-color 120ms ease',
          '&:hover': {
            boxShadow: 'inset 0 0 0 9999px rgba(255,255,255,0.06)',
            borderColor: 'var(--border)'
          },
          // Keep subtle tint when expanded; also apply when child control has data-active
          '&[data-active]': {
            boxShadow: 'inset 0 0 0 9999px rgba(255,255,255,0.06)'
          },
          '&:has([data-active])': {
            boxShadow: 'inset 0 0 0 9999px rgba(255,255,255,0.06)'
          },
          '&:focus-within': {
            boxShadow: 'inset 0 0 0 9999px rgba(255,255,255,0.06)'
          },
        },
        control: {
          minHeight: 44,
          paddingBlock: 8,
          background: 'transparent',
          // Ensure control inherits the item hover/active tint visually
          backgroundColor: 'transparent',
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
          background: 'transparent',
          color: 'var(--text-dim)',
          padding: '0 12px 12px',
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
