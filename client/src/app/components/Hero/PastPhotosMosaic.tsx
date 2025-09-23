import { useEffect, useMemo, useState } from 'react'
import { SimpleGrid, Box, Image } from '@mantine/core'
import { useReducedMotion } from '@mantine/hooks'
import gallery from '../../data/gallery.json'

const DISPLAY_COUNT = 6
const INTERVAL_MS = 6000

function Placeholder({ label }: { label: string }){
  return (
    <Box
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '80%',
        borderRadius: 12,
        background: 'linear-gradient(135deg, rgba(141,153,174,0.25), rgba(237,242,244,0.8))',
        border: '1px dashed rgba(141,153,174,0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-dim)',
        textAlign: 'center',
        fontSize: '0.85rem',
        padding: '0 12px',
      }}
    >
      {label}
    </Box>
  )
}

export function PastPhotosMosaic(){
  const photos = gallery as { src?: string; alt: string }[]
  const reducedMotion = useReducedMotion()
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (reducedMotion || photos.length <= DISPLAY_COUNT) return
    const id = setInterval(() => {
      setOffset((prev) => (prev + DISPLAY_COUNT) % photos.length)
    }, INTERVAL_MS)
    return () => clearInterval(id)
  }, [photos.length, reducedMotion])

  const slots = useMemo(() => {
    if (!photos.length) return []
    const doubled = [...photos, ...photos]
    return doubled.slice(offset, offset + DISPLAY_COUNT)
  }, [offset, photos])

  if (!photos.length){
    return <Placeholder label="Past event photos coming soon" />
  }

  return (
    <SimpleGrid cols={{ base: 2, sm: 3 }} spacing={12}>
      {slots.map((photo, index) => {
        const hasImage = Boolean(photo.src)
        if (!hasImage){
          return <Placeholder key={`placeholder-${index}`} label={photo.alt} />
        }
        return (
          <Box key={`${photo.alt}-${index}`} style={{ position: 'relative', overflow: 'hidden', borderRadius: 12, border: '1px solid rgba(43,45,66,0.12)' }}>
            <Image src={photo.src} alt={photo.alt} fit="cover" />
          </Box>
        )
      })}
    </SimpleGrid>
  )
}

export default PastPhotosMosaic
