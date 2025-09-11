import { Modal, Image } from '@mantine/core'

export function Lightbox({ src, opened, onClose }: { src: string | null, opened: boolean, onClose: () => void }){
  return (
    <Modal opened={opened} onClose={onClose} size="lg" title="Preview" centered>
      {src && <Image src={src} alt="Past year photo" radius="md" />}
    </Modal>
  )
}

export default Lightbox

