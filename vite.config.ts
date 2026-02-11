import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        merch: resolve(__dirname, 'merch/index.html'),
        'merch/list/index': resolve(__dirname, 'merch/list/index.html'),
        'merch/tee/index': resolve(__dirname, 'merch/tee/index.html'),
        'merch/crew/index': resolve(__dirname, 'merch/crew/index.html'),
        'merch/hoodie/index': resolve(__dirname, 'merch/hoodie/index.html'),
        'merch/robo-hoodie/index': resolve(__dirname, 'merch/robo-hoodie/index.html'),
      },
    },
  },
})
