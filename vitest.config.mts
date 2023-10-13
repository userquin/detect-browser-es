import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    include: ['test/*.test.ts'],
    coverage: {
      include: ['src/*.ts'],
    },
  },
})
