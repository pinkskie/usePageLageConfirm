import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './example',
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
