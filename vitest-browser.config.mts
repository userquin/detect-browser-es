import process from 'node:process'
import { defineConfig } from 'vitest/config'

const provider = process.env.PROVIDER ?? 'webdriverio'
const name = process.env.BROWSER ?? 'chromium'

export default defineConfig({
  define: {
    'process.env.VITE_PROVIDER': JSON.stringify(provider),
    'process.env.VITE_BROWSER': JSON.stringify(name),
  },
  test: {
    globals: true,
    include: ['browser-test/*.test.ts'],
    browser: {
      enabled: true,
      provider,
      name,
    },
  },
})
