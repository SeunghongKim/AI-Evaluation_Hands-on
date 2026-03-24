/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/AI-Evaluation_Hands-on/',
  build: {
    outDir: 'dist',
  },
  test: {
    globals: true,
    environment: 'node',
  },
})
