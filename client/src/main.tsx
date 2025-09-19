import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
// Mantine v7 requires explicit CSS imports
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
// Your global overrides should be imported after Mantine styles
import './index.css'
import { theme } from './app/theme'
import App from './app/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} forceColorScheme="light" defaultColorScheme="light">
      <Notifications position="top-right" />
      <App />
    </MantineProvider>
  </StrictMode>,
)
