import { env, platform } from 'std-env'
import { detect } from '../src'

// TODO: update to vitest 1.beta.2: will not work with 1.beta.1

const browser = env.VITE_BROWSER

describe('Browser Detection test', () => {
  test('User Agent detection', () => {
    expect(typeof navigator).toBeDefined()
    expect(typeof navigator?.userAgent).toBeDefined()
  })
  // TODO: missing __wdioSpec__ and cookie
  test.skip('WebdriverIO Detection', () => {
    expect(detect()?.type).toBe('webdriverio')
  })
  test.skipIf(browser !== 'chrome')('Chrome', () => {
    expect(detect()?.name).toBe('chrome')
  })
  test.skipIf(browser !== 'edge')('Edge', () => {
    expect(detect()?.name).toBe('edge')
  })
  test.skipIf(browser !== 'firefox')('FireFox', () => {
    expect(detect()?.name).toBe('firefox')
  })
  test.skipIf(platform !== 'darwin' || browser !== 'safari')('Safari', () => {
    expect(detect()?.name).toBe('safari')
  })
})
