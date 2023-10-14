import { describe, expect, it, test } from 'vitest'
import { browserName, parseUserAgent } from '../src'

describe('browser detection', () => {
  // for coverage: will call matchUserAgent that's covered in the rest tests
  it('browser name', () => {
    expect(browserName(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    )).toBe('chrome')
  })
  // new tests
  it('Chrome Windows 10: latest', () => {
    const browser = parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
    )
    expect(browser).not.toBe(null)
    expect(browser?.name).toBe('chrome')
    const versions = browser?.version?.split('.')
    expect(versions?.length).toBe(3)
    expect(Number.parseInt(versions![0]) >= 108).toBe(true)
    expect(browser?.os?.toLowerCase().startsWith('windows')).toBe(true)
  })
  it('Safari: Version 16.6', () => {
    const browser = parseUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15',
    )
    expect(browser).not.toBe(null)
    expect(browser?.name).toBe('safari')
    const versions = browser?.version?.split('.')
    expect(versions?.length).toBe(3)
    expect(Number.parseInt(versions![0]) >= 16).toBe(true)
    expect(browser?.os?.toLowerCase().startsWith('mac os')).toBe(true)
  })
  it('Edge Windows 10: latest', () => {
    const browser = parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 Edg/117.0.2045.31',
    )
    expect(browser).not.toBe(null)
    expect(browser?.name).toBe('edge-chromium')
    const versions = browser?.version?.split('.')
    expect(versions?.length).toBe(3)
    expect(Number.parseInt(versions![0]) >= 108).toBe(true)
    expect(browser?.os?.toLowerCase().startsWith('windows')).toBe(true)
  })
  it('Chromium Windows 10: version 108.0.5332.0', () => {
    const browser = parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    )
    expect(browser).not.toBe(null)
    expect(browser?.name).toBe('chrome')
    const versions = browser?.version?.split('.')
    expect(versions?.length).toBe(3)
    expect(Number.parseInt(versions![0]) >= 108).toBe(true)
    expect(browser?.os?.toLowerCase().startsWith('windows')).toBe(true)
  })
  it('Samsung Android: Android 13', () => {
    const browser = parseUserAgent(
      'Mozilla/5.0 (Linux; Android 13) SAMSUNG SM-S908B AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/22.0 Chrome/111.0.5563.116 Mobile Safari/537.36',
    )
    expect(browser).not.toBe(null)
    expect(browser?.name).toBe('samsung')
    const versions = browser?.version?.split('.')
    expect(versions?.length).toBe(3)
    expect(Number.parseInt(versions![0]) >= 21).toBe(true)
    expect(browser?.os?.toLowerCase().startsWith('android')).toBe(true)
  })
  it('Opera Windows', () => {
    const browser = parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 OPR/102.0.0.0',
    )
    expect(browser).not.toBe(null)
    expect(browser?.name).toBe('opera')
    const versions = browser?.version?.split('.')
    expect(versions?.length).toBe(3)
    expect(Number.parseInt(versions![0]) >= 94).toBe(true)
    expect(browser?.os?.toLowerCase().startsWith('windows')).toBe(true)
  })
  it('Opera macOS', () => {
    const browser = parseUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 OPR/102.0.0.0',
    )
    expect(browser).not.toBe(null)
    expect(browser?.name).toBe('opera')
    const versions = browser?.version?.split('.')
    expect(versions?.length).toBe(3)
    expect(Number.parseInt(versions![0]) >= 94).toBe(true)
    expect(browser?.os?.toLowerCase().startsWith('mac')).toBe(true)
  })
  it('Opera Linux', () => {
    const browser = parseUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36 OPR/102.0.0.0',
    )
    expect(browser).not.toBe(null)
    expect(browser?.name).toBe('opera')
    const versions = browser?.version?.split('.')
    expect(versions?.length).toBe(3)
    expect(Number.parseInt(versions![0]) >= 94).toBe(true)
    expect(browser?.os?.toLowerCase().startsWith('linux')).toBe(true)
  })
  it('Opera Android', () => {
    const browser = parseUserAgent(
      'Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.60 Mobile Safari/537.36 OPR/73.3.3216.58675',
    )
    expect(browser).not.toBe(null)
    expect(browser?.name).toBe('opera')
    const versions = browser?.version?.split('.')
    expect(versions?.length).toBe(3)
    expect(Number.parseInt(versions![0]) >= 73).toBe(true)
    expect(browser?.os?.toLowerCase().startsWith('android')).toBe(true)
  })
  it('Firefox macOS: Version 117.0.1', () => {
    const browser = parseUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0',
    )
    expect(browser).not.toBe(null)
    expect(browser?.name).toBe('firefox')
    const versions = browser?.version?.split('.')
    expect(versions?.length).toBe(3)
    expect(Number.parseInt(versions![0]) >= 117).toBe(true)
    expect(browser?.os?.toLowerCase().startsWith('mac os')).toBe(true)
  })
  // original detect-browser tests
  test('detects chrome', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36',
    )).toEqual({ type: 'browser', name: 'chrome', version: '50.0.2661', os: 'Linux' })
    expect(parseUserAgent(
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
    )).toEqual({ type: 'browser', name: 'chrome', version: '41.0.2228', os: 'Windows 7' })
    expect(parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36',
    )).toEqual({ type: 'browser', name: 'chrome', version: '72.0.3626', os: 'Windows 10' })
  })
  test('detects Chrome for iOS', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3',
    )).toEqual({ type: 'browser', name: 'crios', version: '19.0.1084', os: 'iOS' })
  })
  test('detects Firefox', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:46.0) Gecko/20100101 Firefox/46.0',
    )).toEqual({ type: 'browser', name: 'firefox', version: '46.0.0', os: 'Linux' })
    expect(parseUserAgent(
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1',
    )).toEqual({ type: 'browser', name: 'firefox', version: '40.1.0', os: 'Windows 7' })
  })
  test('detects Firefox for iOS', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/1.0 Mobile/12F69 Safari/600.1.4',
    )).toEqual({ type: 'browser', name: 'fxios', version: '1.0.0', os: 'iOS' })
    expect(parseUserAgent(
      'Mozilla/5.0 (iPad; CPU iPhone OS 8_3 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) FxiOS/3.2 Mobile/12F69 Safari/600.1.4',
    )).toEqual({ type: 'browser', name: 'fxios', version: '3.2.0', os: 'iOS' })
  })
  test('detects Edge', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246',
    )).toEqual({ type: 'browser', name: 'edge', version: '12.246.0', os: 'Windows 10' })
    expect(parseUserAgent(
      'Mozilla/5.0 (Windows NT 6.3; Win64, x64; Touch) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0 (Touch; Trident/7.0; .NET4.0E; .NET4.0C; .NET CLR 3.5.30729; .NET CLR 2.0.50727; .NET CLR 3.0.30729; HPNTDFJS; H9P; InfoPath',
    )).toEqual({ type: 'browser', name: 'edge', version: '12.0.0', os: 'Windows 8.1' })
  })
  test('detects IE', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; rv:11.0) like Gecko',
    )).toEqual({ type: 'browser', name: 'ie', version: '11.0.0', os: 'Windows 8.1' })
    expect(parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0; MSN 11.61; MSNbMSNI; MSNmen-us; MSNcOTH) like Gecko',
    )).toEqual({ type: 'browser', name: 'ie', version: '11.0.0', os: 'Windows 10' })
    expect(parseUserAgent(
      'Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0',
    )).toEqual({ type: 'browser', name: 'ie', version: '10.6.0', os: 'Windows 7' })
    expect(parseUserAgent(
      'Mozilla/5.0 (compatible; MSIE 7.0; Windows NT 5.2; WOW64; .NET CLR 2.0.50727)',
    )).toEqual({
      type: 'browser',
      name: 'ie',
      version: '7.0.0',
      os: 'Windows Server 2003',
    })
  })
  test('detects Opera', () => {
    expect(parseUserAgent(
      'Opera/9.80 (J2ME/MIDP; Opera Mini/5.0 (Windows; U; Windows NT 5.1; en) AppleWebKit/886; U; en) Presto/2.4.15',
    )).toEqual({ type: 'browser', name: 'opera', version: '9.80.0', os: 'Windows XP' })
    expect(parseUserAgent(
      'Opera/9.25 (Macintosh; Intel Mac OS X; U; en)',
    )).toEqual({
      type: 'browser',
      name: 'opera',
      version: '9.25.0',
      os: 'Mac OS',
    })
    expect(parseUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36 OPR/38.0.2220.31',
    )).toEqual({ type: 'browser', name: 'opera', version: '38.0.2220', os: 'Mac OS' })
    expect(parseUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.28 Safari/537.36 OPR/61.0.3282.0 (Edition developer)',
    )).toEqual({ type: 'browser', name: 'opera', version: '61.0.3282', os: 'Mac OS' })
  })
  test('detects BlackBerry 10', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.10+ (KHTML, like Gecko) Version/7.2.0.0 Mobile Safari/537.10+',
    )).toEqual({ type: 'browser', name: 'bb10', version: '7.2.0', os: 'BlackBerry OS' })
  })
  test('detects Android Webkit browser', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Linux; U; Android 4.0.3; ko-kr; LG-L160L Build/IML74K) AppleWebkit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
    )).toEqual({ type: 'browser', name: 'android', version: '4.0.3', os: 'Android OS' })
  })
  test('detects mobile Safari', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25',
    )).toEqual({ type: 'browser', name: 'ios', version: '6.0.0', os: 'iOS' })
    expect(parseUserAgent(
      'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; ja-jp) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
    )).toEqual({ type: 'browser', name: 'ios', version: '5.0.2', os: 'iOS' })
  })
  test('detects Safari', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A',
    )).toEqual({ type: 'browser', name: 'safari', version: '7.0.3', os: 'Mac OS' })
  })
  test('detects Yandex Browser', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 YaBrowser/16.10.0.2774 Safari/537.36',
    )).toEqual({
      type: 'browser',
      name: 'yandexbrowser',
      version: '16.10.0',
      os: 'Mac OS',
    })
  })
  test('detects Kakaotalk Browser', () => {
    expect(parseUserAgent(
      'Netscape 5.0 (iPhone; CPU iPhone OS 10_3 1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E304 KAKAOTALK 6.2.2',
    )).toEqual({ type: 'browser', name: 'kakaotalk', version: '6.2.2', os: 'iOS' })
    expect(parseUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS  10_3 1 like Mac OS X) AppleWebKit/  603.1.30 (KHTML, like Gecko) Mobile/ 14E304 KAKAOTALK 6.2.2',
    )).toEqual({ type: 'browser', name: 'kakaotalk', version: '6.2.2', os: 'iOS' })
  })
  test('detects PhantomJS Browser', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.1.1 Safari/538.1',
    )).toEqual({ type: 'browser', name: 'phantomjs', version: '2.1.1', os: 'Mac OS' })
  })
  test('detects AOLShield Browser', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2841.00 Safari/537.36 AOLShield/54.0.2848.0',
    )).toEqual({ type: 'browser', name: 'aol', version: '54.0.2848', os: 'Windows 10' })
  })
  test('detects facebook in-app browser', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_5 like Mac OS X) AppleWebKit/604.5.6 (KHTML, like Gecko) Mobile/15D60 [FBAN/FBIOS;FBAV/157.0.0.42.96;FBBV/90008621;FBDV/iPhone9,1;FBMD/iPhone;FBSN/iOS;FBSV/11.2.5;FBSS/2;FBCR/Verizon;FBID/phone;FBLC/en_US;FBOP/5;FBRV/0]',
    )).toEqual({ type: 'browser', name: 'facebook', version: '157.0.0', os: 'iOS' })
  })
  test('detects instagram in-app browser', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69 Instagram 8.4.0 (iPhone7,2; iPhone OS 9_3_2; nb_NO; nb-NO; scale=2.00; 750x1334',
    )).toEqual({ type: 'browser', name: 'instagram', version: '8.4.0', os: 'iOS' })
  })
  test('detects native iOS WebView browser', () => {
    expect(parseUserAgent(
      'User-Agent: Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Mobile',
    )).toEqual({ type: 'browser', name: 'ios-webview', version: '533.17.9', os: 'iOS' })
    expect(parseUserAgent(
      'Mozilla/5.0 (iPad; CPU OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E216',
    )).toEqual({ type: 'browser', name: 'ios-webview', version: '605.1.15', os: 'iOS' })
    expect(parseUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16B92',
    )).toEqual({ type: 'browser', name: 'ios-webview', version: '605.1.15', os: 'iOS' })
    expect(parseUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko)',
    )).toEqual({ type: 'browser', name: 'ios-webview', version: '605.1.15', os: 'iOS' })
  })
  test('detects Samsung Internet browser', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Linux; Android 5.0.2; SAMSUNG SM-G925F Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/4.0 Chrome/44.0.2403.133 Mobile Safari/537.36',
    )).toEqual({ type: 'browser', name: 'samsung', version: '4.0.0', os: 'Android OS' })
  })
  test('detects crawler: AhrefsBot', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (compatible; AhrefsBot/5.2; +http://ahrefs.com/robot/)',
    )).toEqual({ type: 'bot', bot: true, name: 'bot', version: null, os: null })
  })
  test('detects crawler: GoogleBot', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Safari/537.36',
    )).toEqual({ type: 'bot', bot: true, name: 'bot', version: null, os: null })
  })
  test('detects crawler: YandexBot', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
    )).toEqual({ type: 'bot', bot: true, name: 'bot', version: null, os: null })
  })
  test('detects crawler: YandexBotdetects Opera-Mini', () => {
    expect(parseUserAgent(
      'Opera/9.80 (Android; Opera Mini/8.0.1807/36.1609; U; en) Presto/2.12.423 Version/12.16',
    )).toEqual({
      type: 'browser',
      name: 'opera-mini',
      version: '12.16.0',
      os: 'Android OS',
    })
    expect(parseUserAgent(
      'Opera/9.80 (BlackBerry; Opera Mini/6.5.27548/27.2020; U; en) Presto/2.8.119 Version/11.10',
    )).toEqual({
      type: 'browser',
      name: 'opera-mini',
      version: '11.10.0',
      os: 'BlackBerry OS',
    })
  })
  test('detects Silk', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Linux; Android 4.4.3; KFTHWI Build/KTU84M) AppleWebKit/537.36 (KHTML, like Gecko) Silk/44.1.54 like Chrome/44.0.2403.63 Safari/537.36',
    )).toEqual({ type: 'browser', name: 'silk', version: '44.1.54', os: 'Android OS' })
    expect(parseUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Silk/44.1.54 like Chrome/44.0.2403.63 Safari/537.36',
    )).toEqual({ type: 'browser', name: 'silk', version: '44.1.54', os: 'Linux' })
    expect(parseUserAgent(
      'Mozilla/5.0 (Linux; U; Android 4.4.3; KFTHWI Build/KTU84M) AppleWebKit/537.36 (KHTML, like Gecko) Silk/44.1.54 like Chrome/44.0.2403.63 Mobile Safari/537.36',
    )).toEqual({ type: 'browser', name: 'silk', version: '44.1.54', os: 'Android OS' })
  })
  test('detects Chrome OS', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (X11; CrOS x86_64 10895.78.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.120 Safari/537.36',
    )).toEqual({ type: 'browser', name: 'chrome', version: '69.0.3497', os: 'Chrome OS' })
    expect(parseUserAgent(
      'Mozilla/5.0 (X11; U; CrOS i686 9.10.0; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Gecko/20100101 Firefox/29.0',
    )).toEqual({ type: 'browser', name: 'firefox', version: '29.0.0', os: 'Chrome OS' })
  })
  test('detects miui', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Linux; U; Android 7.0; en-us; MI 5 Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/53.0.2785.146 Mobile Safari/537.36 XiaoMi/MiuiBrowser/9.0.3',
    )).toEqual({ type: 'browser', name: 'miui', version: '9.0.3', os: 'Android OS' })
  })
  test('detects Beaker Browser', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) BeakerBrowser/0.8.7 Chrome/69.0.3497.128 Electron/4.1.3 Safari/537.36',
    )).toEqual({ type: 'browser', name: 'beaker', version: '0.8.7', os: 'Windows 10' })
  })
  test('detects edge chromium', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.48 Safari/537.36 Edg/74.1.96.24',
    )).toEqual({
      type: 'browser',
      name: 'edge-chromium',
      version: '74.1.96',
      os: 'Windows 10',
    })
  })
  test('detects edge chromium (android os)', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Linux; Android 9; SM-N950F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.116 Mobile Safari/537.36 EdgA/45.08.4.5074',
    )).toEqual({
      type: 'browser',
      name: 'edge-chromium',
      version: '45.08.4',
      os: 'Android OS',
    })
  })
  test('detects edge iOS', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 12_1_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 EdgiOS/44.2.1 Mobile/16D57 Safari/605.1.15',
    )).toEqual({ type: 'browser', name: 'edge-ios', version: '44.2.1', os: 'iOS' })
  })
  test('handles no browser', () => {
    expect(parseUserAgent(
      undefined!,
    )).toBeNull()
  })
  /* https://developer.chrome.com/multidevice/user-agent */
  test('detects Chromium-based WebView On Android', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36',
    )).toEqual({
      type: 'browser',
      name: 'chromium-webview',
      version: '43.0.2357',
      os: 'Android OS',
    })
  })
  test('detects extended bot info', () => {
    expect(parseUserAgent(
      'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
    )).toEqual({
      type: 'bot-device',
      name: 'chrome',
      version: '41.0.2272',
      os: 'Android OS',
      bot: 'Googlebot',
    })
  })
  /** Windows CE Ozone (CE 4.2 P/PC 2003) */
  test('detects PocketPC2003', () => {
    expect(parseUserAgent(
      'Mozilla/4.0 (compatible; MSIE 4.01; Windows CE; PPC; 240x320)',
    )).toEqual({
      type: 'browser',
      name: 'pie',
      version: '4.01.0',
      os: 'Windows CE',
    })
  })
  /** Windows CE Pegasus (CE 1.0x) PIE 1.1 */
  test('detects PIE 1.1', () => {
    expect(parseUserAgent(
      'Mozilla/1.1 (compatible; MSPIE 1.1; Windows CE)',
    )).toEqual({
      type: 'browser',
      name: 'pie',
      version: '1.1.0',
      os: 'Windows CE',
    })
  })
  /** Windows CE Stinger SmartPhone 2003 */
  test('detects NetFront', () => {
    expect(parseUserAgent(
      'Mozilla/4.0 (PDA; Windows CE;1.0.0) NetFront/3.0',
    )).toEqual({
      type: 'browser',
      name: 'netfront',
      version: '3.0.0',
      os: 'Windows CE',
    })
  })
  test('detects extended bot info', () => {
    expect(parseUserAgent(
      'curl/7.64.1',
    )).toEqual({
      type: 'bot-device',
      name: 'curl',
      version: '7.64.1',
      os: null,
      bot: 'curl',
    })
  })
})
