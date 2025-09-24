import { useEffect, useState } from 'react'
import { Affix, Transition, Button, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { IconArrowUp } from '@tabler/icons-react'

export function BackToTop(){
  const [visible, setVisible] = useState(false)
  const [bottom, setBottom] = useState(24)
  const theme = useMantineTheme()
  const isDesktop = useMediaQuery(`(min-width: ${theme.breakpoints.md})`)
  useEffect(() => {
    const scroller = document.getElementById('app-main')
    if (!scroller) return
    const onScroll = () => {
      setVisible(scroller.scrollTop > 600)
      const footer = document.getElementById('site-footer')
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        const scrollerRect = scroller.getBoundingClientRect()
        const viewportBottom = scrollerRect.top + scroller.clientHeight
        const overlap = Math.max(0, viewportBottom - footerRect.top)
        setBottom(24 + overlap)
      }
    }
    const onResize = () => onScroll()
    onScroll()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  if (isDesktop) return null

  return (
    <Affix position={{ bottom, right: 24 }}>
      <Transition mounted={visible} transition="slide-up" duration={200} timingFunction="ease">
        {(styles) => (
          <Button
            leftSection={<IconArrowUp size={18} />}
            style={styles}
            className="btn-soft"
            onClick={() => {
              const scroller = document.getElementById('app-main')
              if (scroller){
                scroller.scrollTo({ top: 0, behavior: 'smooth' })
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            Top
          </Button>
        )}
      </Transition>
    </Affix>
  )
}

export default BackToTop
