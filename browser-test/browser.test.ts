import { env } from 'std-env'
import { describe, expect, test } from 'vitest'
import { BrowserInfo, asyncDetect, detect } from '../src'

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
    expect(detect()?.name).toBe('edge-chromium')
  })
  test.skipIf(browser !== 'firefox')('FireFox', () => {
    expect(detect()?.name).toBe('firefox')
  })
  test.skipIf(browser !== 'safari')('Safari', () => {
    expect(detect()?.name).toBe('safari')
  })
  test.skipIf(!(browser === 'chrome' || browser === 'edge'))('Detect UserAgentData', async () => {
    const detectInfo = await asyncDetect({
      hints: ['platformVersion'],
    })
    expect(detectInfo).toBeDefined()
    expect(detectInfo instanceof BrowserInfo).toBeTruthy()
    const browserInfo = detectInfo as BrowserInfo
    const ua = (detectInfo as BrowserInfo).ua
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(ua ?? {}, null, 2))
    const os = browserInfo.os
    expect(os).toBeDefined()
    expect(ua).toBeDefined()
    if (os!.startsWith('Windows')) {
      expect(ua?.platform).toBe('Windows')
      expect(ua?.mobile).toBe(false)
      expect(ua?.brands?.length ?? 0).toBeGreaterThan(0)
      expect(detectInfo?.os?.startsWith('Windows ')).toBe(true)
    }
  })
})
