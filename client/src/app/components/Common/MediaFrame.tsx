import { Box, Text } from '@mantine/core'

type Props = {
  src?: string
  alt?: string
  ratio?: string // e.g., '16 / 9'
  caption?: string
}

export function MediaFrame({ src, alt = 'Illustration', ratio = '16 / 9', caption }: Props){
  return (
    <Box>
      <Box style={{ position: 'relative', width: '100%', aspectRatio: ratio, overflow: 'hidden', borderRadius: 16, border: '1px solid var(--border)', background: 'linear-gradient(180deg, rgba(173,40,49,0.08), rgba(0,0,0,0))' }}>
        {src ? (
          <img src={src} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        ) : (
          <Box style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--text-dim)' }}>
            <Text>[ Image placeholder: {alt} ]</Text>
          </Box>
        )}
      </Box>
      {caption && <Text ta="center" c="var(--text-dim)" fz="sm" mt={6}>{caption}</Text>}
    </Box>
  )}

export default MediaFrame
