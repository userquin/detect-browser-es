import { env } from 'std-env'
import { BrowserInfo, detect, lookupBrowserAgentData } from '../src'

// TODO: update to vitest 1.beta.2: will not work with 1.beta.1

const browser = env.VITE_BROWSER

describe('Browser Detection test', () => {
  test('User Agent detection', () => {
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
  test.skipIf(browser !== 'safari')('Safari', () => {
    expect(detect()?.name).toBe('safari')
  })
  test.skipIf(!(browser === 'chrome' || browser === 'edge'))('Detect UserAgentData', async () => {
    const detectInfo = detect()
    expect(detectInfo).toBeDefined()
    expect(detectInfo instanceof BrowserInfo).toBeTruthy()
    const browserInfo = detectInfo as BrowserInfo
    const data = await lookupBrowserAgentData(true)
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(data ?? {}, null, 2))
    const os = browserInfo.os
    expect(os).toBeDefined()
    if (os!.startsWith('Windows')) {
      expect(data).toBeDefined()
      expect(data?.platform).toBe('Windows')
      expect(data?.isWindows10 || data?.isWindows11).toBe(true)
    }
    else {
      expect(data).toBeUndefined()
    }
  })
})
