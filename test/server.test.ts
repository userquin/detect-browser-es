import { runtime } from 'std-env'
import { describe, expect, it, test } from 'vitest'
import {
  asyncDetect,
  detect,
  getNodeVersion,
  getServerVersion,
  lookupServerUserAgentHints,
  serverResponseHeadersForUserAgentHints,
} from '../src'

describe('Server Detection', () => {
  test('Server Detection', () => {
    const serverInfo = detect()
    expect(serverInfo).toBeDefined()
    expect(serverInfo?.type).toBeDefined()
  })
  describe.skipIf(runtime !== 'node')('Node Detection', () => {
    it('node info is present', () => {
      const nodeInfo = getNodeVersion()
      expect(nodeInfo).toBeDefined()
      expect(nodeInfo?.os).toBeDefined()
      expect(nodeInfo?.name).toBe('node')
      expect(nodeInfo?.version).toBeDefined()
    })
    it('server info is present', () => {
      const serverInfo = getServerVersion()
      expect(serverInfo).toBeDefined()
      expect(serverInfo?.os).toBeDefined()
      expect(serverInfo?.name).toBe('node')
      expect(serverInfo?.version).toBeDefined()
      expect(serverInfo?.nodeVersion).toBeDefined()
      expect(serverInfo?.nodeMajorVersion).toBeDefined()
    })
  })
  test('Accept-CH server response header', () => {
    expect(serverResponseHeadersForUserAgentHints([
      'architecture',
      'bitness',
      'model',
      'platformVersion',
      'fullVersionList',
    ])).toMatchInlineSnapshot(`
      {
        "Accept-CH": "Sec-CH-UA-Arch, Sec-CH-UA-Bitness, Sec-CH-UA-Model, Sec-CH-UA-Platform-Version, Sec-CH-UA-Full-Version-List",
      }
    `)
  })
  // https://github.com/WICG/ua-client-hints
  test('UA Client Hints server detection', () => {
    expect(lookupServerUserAgentHints({
      'Sec-CH-UA': '"Chrome"; v="73", "Chromium"; v="73", "?Not:Your Browser"; v="11"',
      'Sec-CH-UA-Arch': '"arm"',
      'Sec-CH-UA-Bitness': '"64"',
      'Sec-CH-UA-Mobile': '?1',
      'Sec-CH-UA-Model': '"Pixel 2 XL"',
      'Sec-CH-UA-Platform-Version': '"73.1.2343B.TR"',
      'Sec-CH-UA-Platform': '"Windows"',
      'Sec-CH-UA-Full-Version-List': '"Microsoft Edge"; v="92.0.902.73", "Chromium"; v="92.0.4515.131", "?Not:Your Browser"; v="3.1.2.0"',
    })).toMatchInlineSnapshot(`
      {
        "architecture": "arm",
        "bitness": "64",
        "brands": [
          {
            "brand": "Chrome",
            "version": "73",
          },
          {
            "brand": "Chromium",
            "version": "73",
          },
          {
            "brand": "?Not:Your Browser",
            "version": "11",
          },
        ],
        "fullVersionList": [
          {
            "brand": "Microsoft Edge",
            "version": "92.0.902.73",
          },
          {
            "brand": "Chromium",
            "version": "92.0.4515.131",
          },
          {
            "brand": "?Not:Your Browser",
            "version": "3.1.2.0",
          },
        ],
        "mobile": true,
        "model": "Pixel 2 XL",
        "platform": "Windows",
        "platformVersion": "73.1.2343B.TR",
      }
    `)
    expect(lookupServerUserAgentHints({
      'Sec-CH-UA-Mobile': '?0',
    })?.mobile).toBe(false)
  })
  test('Windows 11 server detection: userAgent option', async () => {
    const info = await asyncDetect({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
      httpHeaders: {
        'Sec-CH-UA-Platform': '"Windows"',
        'Sec-CH-UA-Platform-Version': '13.0.0',
      },
    })
    expect(info).toBeDefined()
    expect(info?.type).toBe('browser')
    expect(info?.name).toBe('chrome')
    expect(info?.os).toBe('Windows 11')
  })
  test('Windows 11 server detection: User-Agent header', async () => {
    const info = await asyncDetect({
      httpHeaders: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
        'Sec-CH-UA-Platform': '"Windows"',
        'Sec-CH-UA-Platform-Version': '13.0.0',
      },
    })
    expect(info).toBeDefined()
    expect(info?.type).toBe('browser')
    expect(info?.name).toBe('chrome')
    expect(info?.os).toBe('Windows 11')
  })
})
