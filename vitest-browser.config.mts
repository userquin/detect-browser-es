import { env } from 'std-env'
import { defineConfig } from 'vitest/config'

const name = env.BROWSER ?? 'chrome'

export default defineConfig({
  define: {
    'process.env.VITE_BROWSER': JSON.stringify(name),
  },
  test: {
    include: ['browser-test/*.test.ts'],
    browser: {
      enabled: true,
      provider: 'webdriverio',
      name,
      headless: true,
    },
  },
})
