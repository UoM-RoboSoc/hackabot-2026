import { useMemo } from 'react'
import { Box, Image, Text } from '@mantine/core'
import { useReducedMotion } from '@mantine/hooks'
import gallery from '../../data/gallery.json'
import { assetPath } from '../../lib/assets'
import './PastPhotosMosaic.css'

type Photo = { src?: string; alt: string }

function Placeholder({ label }: { label: string }){
  return (
    <Box className="mosaic-item">
      <Text fz="xs" c="var(--text-dim)" ta="center" px={8}>
        {label}
      </Text>
    </Box>
  )
}

function Row({ photos, reverse, disableAnimation }: { photos: Photo[]; reverse?: boolean; disableAnimation?: boolean }){
  const items = useMemo(() => (photos.length ? [...photos, ...photos] : []), [photos])

  if (!items.length){
    return (
      <div className="mosaic-row">
        <div className={`mosaic-track${reverse ? ' reverse' : ''}`} style={disableAnimation ? { animation: 'none' } : undefined}>
          <Placeholder label="Past event photos coming soon" />
        </div>
      </div>
    )
  }

  return (
    <div className="mosaic-row">
      <div className={`mosaic-track${reverse ? ' reverse' : ''}`} style={disableAnimation ? { animation: 'none' } : undefined}>
        {items.map((photo, idx) => {
          if (!photo.src){
            return <Placeholder key={`placeholder-${idx}`} label={photo.alt} />
          }
          return (
            <div key={`${photo.alt}-${idx}`} className="mosaic-item">
              <Image src={photo.src} alt={photo.alt} fit="cover" />
            </div>
          )
        })}
      </div>
    </div>
  )
}

const IMAGE_REGEX = /\.(png|jpe?g|webp|gif)$/i

export function PastPhotosMosaic(){
  const photos = (gallery as Photo[])
    .map((photo) => (photo.src ? { ...photo, src: assetPath(photo.src) } : photo))
    .filter((photo) => photo.src && IMAGE_REGEX.test(photo.src))
  const reducedMotion = useReducedMotion()

  const [rowOne, rowTwo] = useMemo(() => {
    const first: Photo[] = []
    const second: Photo[] = []
    photos.forEach((photo, idx) => {
      if (idx % 2 === 0) first.push(photo)
      else second.push(photo)
    })
    return [first.length ? first : photos, second.length ? second : photos]
  }, [photos])

  return (
    <div className="mosaic-container">
      <div className="mosaic-overlay left" aria-hidden="true" />
      <div className="mosaic-overlay right" aria-hidden="true" />
      <Row photos={rowOne} disableAnimation={reducedMotion} />
      <Row photos={rowTwo} reverse disableAnimation={reducedMotion} />
    </div>
  )
}

export default PastPhotosMosaic
