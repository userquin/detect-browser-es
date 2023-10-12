import { env, platform } from 'std-env'
import { describe } from 'vitest'
import { detect } from '../src'

// TODO: update to vitest 1.beta.2: will not work with 1.beta.1

const browser = env.VITE_BROWSER

describe('Browser Detection test', () => {
  test('User Agent found', () => {
    expect(typeof navigator).toBeDefined()
    expect(typeof navigator?.userAgent).toBeDefined()
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
  test.skipIf(platform !== 'darwin' || browser !== 'safari')('FireFox', () => {
    expect(detect()?.name).toBe('safari')
  })
})
