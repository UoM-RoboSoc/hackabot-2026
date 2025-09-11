import { useEffect, useState } from 'react'
import { Affix, Transition, Button } from '@mantine/core'
import { IconArrowUp } from '@tabler/icons-react'

export function BackToTop(){
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Affix position={{ bottom: 24, right: 24 }}>
      <Transition mounted={visible} transition="slide-up" duration={200} timingFunction="ease">
        {(styles) => (
          <Button
            leftSection={<IconArrowUp size={18} />}
            style={styles}
            className="btn-soft"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Top
          </Button>
        )}
      </Transition>
    </Affix>
  )
}

export default BackToTop
