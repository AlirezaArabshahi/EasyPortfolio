import { defineConfig } from 'vite';

export default defineConfig({
  // Serve from dist directory
  root: 'dist',
  
  // Development server configuration
  server: {
    port: 3000,
    open: true,
    host: true
  }
});