import { browser, expect } from '@wdio/globals'
import { platform } from 'std-env'
import { detect } from 'detect-browser-es'

const browserName = browser.capabilities.browserName

describe('WebdriverIO detection', () => {
  it('WebdriverIO Detection', () => {
    expect(detect()?.type).to('webdriverio')
  })
  if (browserName === 'chrome') {
    it('Chrome', () => {
      expect(detect()?.name).toBe('chrome')
    })
  }
  if (browserName === 'edge') {
    it('Edge', () => {
      expect(detect()?.name).toBe('edge-chromium')
    })
  }
  if (browserName === 'firefox') {
    it('FireFox', () => {
      expect(detect()?.name).toBe('firefox')
    })
  }
  if (platform === 'darwin' && browserName === 'safari') {
    it('Safari', () => {
      expect(detect()?.name).toBe('safari')
    })
  }
})
