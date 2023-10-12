import { env, platform } from 'std-env'
import { describe } from 'vitest'
import { detect } from '../src'

// TODO: update to vitest 1.beta.2: will not work with 1.beta.1

const provider = env.VITE_PROVIDER
const browser = env.VITE_BROWSER

describe(`Browser Detection test: ${provider}`, () => {
  describe.skipIf(platform !== 'win32')('Windows', () => {
    test('User Agent found', () => {
      expect(typeof navigator).toBeDefined()
      expect(typeof navigator?.userAgent).toBeDefined()
    })
    test.skipIf(browser !== 'chrome')('Chrome', () => {
      expect(detect()).toBe('chrome')
    })
    test.skipIf(provider === 'webdriverio' || browser !== 'chromium')('Chromium', () => {
      expect(detect()).toBe('chromium')
    })
    test.skipIf(browser !== 'edge')('Edge', () => {
      expect(detect()).toBe('edge')
    })
    test.skipIf(browser !== 'firefox')('FireFox', () => {
      expect(detect()).toBe('firefox')
    })
  })
  /*
  describe.skipIf(platform !== 'darwin')('MacOS', () => {
    test('User Agent found', () => {
      expect(typeof navigator).toBeDefined()
      expect(typeof navigator?.userAgent).toBeDefined()
    })
    test.skipIf(browser !== 'chrome')('Chrome', () => {
      expect(detect()).toBe('chrome')
    })
    test.skipIf(provider === 'webdriverio' || browser !== 'chromium')('Chromium', () => {
      expect(detect()).toBe('chromium')
    })
    test.skipIf(browser !== 'firefox')('FireFox', () => {
      expect(detect()).toBe('firefox')
    })
  })
  test('User Agent found', () => {
    expect(typeof navigator).toBeDefined()
    expect(typeof navigator?.userAgent).toBeDefined()
  })
  test.skipIf(browser !== 'chrome')('Chrome', () => {
    expect(detect()).toBe('chrome')
  })
  test.skipIf(provider === 'webdriverio' || browser !== 'chromium')('Chromium', () => {
    expect(detect()).toBe('chromium')
  })
  test.skipIf(browser !== 'edge')('Edge', () => {
    expect(detect()).toBe('edge')
  })
  test.skipIf(browser !== 'firefox')('FireFox', () => {
    expect(detect()).toBe('firefox')
  })
   */
})
