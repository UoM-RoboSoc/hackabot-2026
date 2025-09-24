import { Paper, Stack, Text } from '@mantine/core'
import QRCode from 'react-qr-code'
import './TopRightQRCode.css'

const TARGET_URL = 'https://aj-floater.github.io/hackabot-2026/'

export function TopRightQRCode(){
  return (
    <div className="qr-affix" aria-label="Hack-A-Bot 2026 quick access QR" role="complementary">
      <Paper withBorder radius="lg" p="md" className="qr-card">
        <Stack align="center" gap={8}>
          <QRCode value={TARGET_URL} size={108} bgColor="transparent" fgColor="var(--text)" />
          <Text fz="xs" c="var(--text-dim)" tt="uppercase" fw={600}>
            Scan for site
          </Text>
        </Stack>
      </Paper>
    </div>
  )
}

export default TopRightQRCode
