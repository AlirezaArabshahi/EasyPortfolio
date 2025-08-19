import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index-generated.html'
      }
    },
  },
  server: {
    port: 3000,
    open: true
  }
})