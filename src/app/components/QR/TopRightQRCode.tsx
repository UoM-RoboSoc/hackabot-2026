import { Paper, Stack, Text } from '@mantine/core'
import QRCode from 'react-qr-code'
import { QR_CARD_TITLE, QR_TARGET_URL } from './constants'
import './TopRightQRCode.css'

export function TopRightQRCode() {
  return (
    <div className="qr-affix" aria-label={QR_CARD_TITLE} role="complementary">
      <Paper withBorder radius="lg" p="md" className="qr-card">
        <Stack align="center" gap={8}>
          <QRCode value={QR_TARGET_URL} size={108} bgColor="transparent" fgColor="var(--text)" />
          <Text fz="xs" c="var(--text-dim)" tt="uppercase" fw={600}>
            Scan for site
          </Text>
        </Stack>
      </Paper>
    </div>
  )
}

export default TopRightQRCode
