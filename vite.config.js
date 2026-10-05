import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // GitHub Pages serves the site from /neufin-brand/. Local dev stays at /.
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: { port: 5173, open: false },
});
