/// <reference types="@types/mocha" />

import { browser, expect } from '@wdio/globals'
import { platform } from 'std-env'
import { detect } from 'detect-browser-es'

const browserName = browser.capabilities.browserName

describe('WebdriverIO detection', () => {
  it('WebdriverIO Detection', () => {
    expect(detect()?.type).toEqual('webdriverio')
  })
  if (browserName === 'chrome') {
    it('Chrome', () => {
      expect(detect()?.name).toEqual('chrome')
    })
  }
  if (browserName === 'edge') {
    it('Edge', () => {
      expect(detect()?.name).toEqual('edge-chromium')
    })
  }
  if (browserName === 'firefox') {
    it('FireFox', () => {
      expect(detect()?.name).toEqual('firefox')
    })
  }
  if (platform === 'darwin' && browserName === 'safari') {
    it('Safari', () => {
      expect(detect()?.name).toEqual('safari')
    })
  }
})
