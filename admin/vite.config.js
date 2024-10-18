import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import strip from '@rollup/plugin-strip';

export default defineConfig({
  plugins: [
    react(),
    strip({
      directives: ['use client'],
    }),
  ],
});
