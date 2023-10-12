import process from 'node:process'
import { defineConfig } from 'vitest/config'

const name = process.env.BROWSER ?? 'chrome'

export default defineConfig({
  define: {
    'process.env.VITE_BROWSER': JSON.stringify(name),
  },
  test: {
    globals: true,
    include: ['browser-test/*.test.ts'],
    browser: {
      enabled: true,
      provider: 'webdriverio',
      name,
      headless: true,
    },
  },
})
