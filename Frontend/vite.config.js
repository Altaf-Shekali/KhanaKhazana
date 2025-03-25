import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: "./", // Ensures proper asset loading in Netlify
  build: {
    outDir: "dist", // Ensures build output goes into "dist"
  },
});
