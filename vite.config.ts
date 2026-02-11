import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        merch: 'merch/index.html',
        'merch/list/index': 'merch/list/index.html',
        'merch/tee/index': 'merch/tee/index.html',
        'merch/crew/index': 'merch/crew/index.html',
        'merch/hoodie/index': 'merch/hoodie/index.html',
        'merch/robo-hoodie/index': 'merch/robo-hoodie/index.html',
      },
    },
  },
})
