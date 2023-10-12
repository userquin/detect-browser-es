import {
  type ProviderInfo,
  type RuntimeInfo,
  nodeMajorVersion,
  nodeVersion,
  platform,
  providerInfo,
  runtimeInfo,
} from 'std-env'

export type DetectedInfoType =
  | 'browser'
  | 'node'
  | 'jsdom'
  | 'happy-dom'
  | 'bot-device'
  | 'bot'
  | 'react-native'

interface DetectedInfo<
  T extends DetectedInfoType,
  N extends string,
  O,
  V = null,
> {
  readonly type: T
  readonly name: N
  readonly version: V
  readonly os: O
}

export interface HappyDOMOptions {
  settings?: {
    navigator?: {
      userAgent?: string
    }
  }
}

export class BrowserInfo
implements DetectedInfo<'browser', Browser, OperatingSystem | null, string> {
  public readonly type = 'browser'
  constructor(
    public readonly name: Browser,
    public readonly version: string,
    public readonly os: OperatingSystem | null,
  ) {}
}

export class ServerInfo
implements DetectedInfo<'node', 'node', NodeJS.Platform, string> {
  public readonly type = 'node'
  public readonly name: 'node' = 'node' as const
  public readonly os: NodeJS.Platform = platform
  public readonly nodeVersion: string | null = nodeVersion
  public readonly nodeMajorVersion: number | null = nodeMajorVersion
  public readonly provider: ProviderInfo | undefined = providerInfo
  public readonly runtime: RuntimeInfo | undefined = runtimeInfo

  constructor(public readonly version: string) {}
}

export class SearchBotDeviceInfo
implements
    DetectedInfo<'bot-device', Browser, OperatingSystem | null, string> {
  public readonly type = 'bot-device'
  constructor(
    public readonly name: Browser,
    public readonly version: string,
    public readonly os: OperatingSystem | null,
    public readonly bot: string,
  ) {}
}

export class BotInfo implements DetectedInfo<'bot', 'bot', null, null> {
  public readonly type = 'bot'
  public readonly bot: true = true as const // NOTE: deprecated test name instead
  public readonly name: 'bot' = 'bot' as const
  public readonly version: null = null
  public readonly os: null = null
}

export class ReactNativeInfo
implements DetectedInfo<'react-native', 'react-native', null, null> {
  public readonly type = 'react-native'
  public readonly name: 'react-native' = 'react-native' as const
  public readonly version: null = null
  public readonly os: null = null
}

export class JSDOMInfo
implements DetectedInfo<'jsdom', Browser, OperatingSystem | null, string> {
  public readonly type = 'jsdom'
  constructor(
    public readonly name: Browser,
    public readonly version: string,
    public readonly os: OperatingSystem | null,
  ) {}
}

export class HappyDomInfo
implements DetectedInfo<'happy-dom', Browser, OperatingSystem | null, string> {
  public readonly type = 'happy-dom'
  constructor(
    public readonly name: Browser,
    public readonly version: string,
    public readonly os: OperatingSystem | null,
  ) {}
}

export type Browser =
  | 'aol'
  | 'edge'
  | 'edge-ios'
  | 'yandexbrowser'
  | 'kakaotalk'
  | 'samsung'
  | 'silk'
  | 'miui'
  | 'beaker'
  | 'edge-chromium'
  | 'chrome'
  | 'chromium-webview'
  | 'phantomjs'
  | 'crios'
  | 'firefox'
  | 'fxios'
  | 'opera-mini'
  | 'opera'
  | 'pie'
  | 'netfront'
  | 'ie'
  | 'bb10'
  | 'android'
  | 'ios'
  | 'safari'
  | 'facebook'
  | 'instagram'
  | 'ios-webview'
  | 'curl'
  | 'searchbot'
  | 'jsdom'
  | 'happy-dom'
export type OperatingSystem =
  | 'iOS'
  | 'Android OS'
  | 'BlackBerry OS'
  | 'Windows Mobile'
  | 'Amazon OS'
  | 'Windows 3.11'
  | 'Windows 95'
  | 'Windows 98'
  | 'Windows 2000'
  | 'Windows XP'
  | 'Windows Server 2003'
  | 'Windows Vista'
  | 'Windows 7'
  | 'Windows 8'
  | 'Windows 8.1'
  | 'Windows 10'
  | 'Windows ME'
  | 'Windows CE'
  | 'Open BSD'
  | 'Sun OS'
  | 'Linux'
  | 'Mac OS'
  | 'QNX'
  | 'BeOS'
  | 'OS/2'
  | 'Chrome OS'
type UserAgentRule = [Browser, RegExp]
type UserAgentMatch = [Browser, RegExpExecArray] | false
type OperatingSystemRule = [OperatingSystem, RegExp]

// tslint:disable-next-line:max-line-length
const SEARCHBOX_UA_REGEX
  = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/
const SEARCHBOT_OS_REGEX
  = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/
const REQUIRED_VERSION_PARTS = 3

const userAgentRules: UserAgentRule[] = [
  ['aol', /AOLShield\/([\d._]+)/],
  ['edge', /Edge\/([\d._]+)/],
  ['edge-ios', /EdgiOS\/([\d._]+)/],
  ['yandexbrowser', /YaBrowser\/([\d._]+)/],
  ['kakaotalk', /KAKAOTALK\s([\d.]+)/],
  ['samsung', /SamsungBrowser\/([\d.]+)/],
  ['silk', /\bSilk\/([\d._-]+)\b/],
  ['miui', /MiuiBrowser\/([\d.]+)$/],
  ['beaker', /BeakerBrowser\/([\d.]+)/],
  ['edge-chromium', /EdgA?\/([\d.]+)/],
  ['chromium-webview', /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([\d.]+)(:?\s|$)/],
  ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([\d.]+)(:?\s|$)/],
  ['phantomjs', /PhantomJS\/([\d.]+)(:?\s|$)/],
  ['crios', /CriOS\/([\d.]+)(:?\s|$)/],
  ['firefox', /Firefox\/([\d.]+)(?:\s|$)/],
  ['fxios', /FxiOS\/([\d.]+)/],
  ['opera-mini', /Opera Mini.*Version\/([\d.]+)/],
  ['opera', /Opera\/([\d.]+)(?:\s|$)/],
  ['opera', /OPR\/([\d.]+)(:?\s|$)/],
  ['pie', /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/],
  [
    'pie',
    /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/,
  ],
  ['netfront', /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/],
  ['ie', /Trident\/7\.0.*rv:([\d.]+).*\).*Gecko$/],
  ['ie', /MSIE\s([\d.]+);.*Trident\/[4-7].0/],
  ['ie', /MSIE\s(7\.0)/],
  ['bb10', /BB10;\sTouch.*Version\/([\d.]+)/],
  ['android', /Android\s([\d.]+)/],
  ['ios', /Version\/([\d._]+).*Mobile.*Safari.*/],
  ['safari', /Version\/([\d._]+).*Safari/],
  ['facebook', /FB[AS]V\/([\d.]+)/],
  ['instagram', /Instagram\s([\d.]+)/],
  ['ios-webview', /AppleWebKit\/([\d.]+).*Mobile/],
  ['ios-webview', /AppleWebKit\/([\d.]+).*Gecko\)$/],
  ['curl', /^curl\/([\d.]+)$/],
  ['searchbot', SEARCHBOX_UA_REGEX],
  ['jsdom', /jsdom\/([\d.]+).*/],
  ['happy-dom', /HappyDOM\/([\d.]+).*/],
]
const operatingSystemRules: OperatingSystemRule[] = [
  ['iOS', /iP(hone|od|ad)/],
  ['Android OS', /Android/],
  ['BlackBerry OS', /BlackBerry|BB10/],
  ['Windows Mobile', /IEMobile/],
  ['Amazon OS', /Kindle/],
  ['Windows 3.11', /Win16/],
  ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
  ['Windows 98', /(Windows 98)|(Win98)/],
  ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
  ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
  ['Windows Server 2003', /(Windows NT 5.2)/],
  ['Windows Vista', /(Windows NT 6.0)/],
  ['Windows 7', /(Windows NT 6.1)/],
  ['Windows 8', /(Windows NT 6.2)/],
  ['Windows 8.1', /(Windows NT 6.3)/],
  ['Windows 10', /(Windows NT 10.0)/],
  ['Windows ME', /Windows ME/],
  ['Windows CE', /Windows CE|WinCE|Microsoft Pocket Internet Explorer/],
  ['Open BSD', /OpenBSD/],
  ['Sun OS', /SunOS/],
  ['Chrome OS', /CrOS/],
  ['Linux', /(Linux)|(X11)/],
  ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
  ['QNX', /QNX/],
  ['BeOS', /BeOS/],
  ['OS/2', /OS\/2/],
]

export function detect(
  userAgent?: string,
):
  | BrowserInfo
  | SearchBotDeviceInfo
  | BotInfo
  | ServerInfo
  | ReactNativeInfo
  | JSDOMInfo
  | HappyDomInfo
  | null {
  if (userAgent)
    return parseUserAgent(userAgent)

  if (
    typeof document === 'undefined'
    && typeof navigator !== 'undefined'
    && navigator.product === 'ReactNative'
  )
    return new ReactNativeInfo()

  if (typeof navigator !== 'undefined' && navigator.userAgent.includes('jsdom')) {
    const browser = parseUserAgent(navigator.userAgent)
    if (browser instanceof BrowserInfo)
      return new JSDOMInfo(browser.name, browser.version, browser.os)
  }

  if (typeof window !== 'undefined' && 'happyDOM' in window) {
    const happyDOM: HappyDOMOptions | undefined = window.happyDOM as unknown as any
    const ua = happyDOM?.settings?.navigator?.userAgent
    if (ua) {
      const browser = parseUserAgent(ua)
      if (browser instanceof BrowserInfo)
        return new HappyDomInfo(browser.name, browser.version, browser.os)
    }
  }

  if (typeof navigator !== 'undefined')
    return parseUserAgent(navigator.userAgent)

  return getServerVersion()
}

function matchUserAgent(ua: string): UserAgentMatch {
  // opted for using reduce here rather than Array#first with a regex.test call
  // this is primarily because using the reduce we only perform the regex
  // execution once rather than once for the test and for the exec again below
  // probably something that needs to be benchmarked though
  return (
    ua !== ''
    && userAgentRules.reduce<UserAgentMatch>(
      (matched: UserAgentMatch, [browser, regex]) => {
        if (matched)
          return matched

        const uaMatch = regex.exec(ua)
        return !!uaMatch && [browser, uaMatch]
      },
      false,
    )
  )
}

export function browserName(ua: string): Browser | null {
  const data = matchUserAgent(ua)
  return data ? data[0] : null
}

export function parseUserAgent(
  ua: string,
): BrowserInfo | SearchBotDeviceInfo | BotInfo | null {
  const matchedRule: UserAgentMatch = matchUserAgent(ua)

  if (!matchedRule)
    return null

  const [name, match] = matchedRule
  if (name === 'searchbot')
    return new BotInfo()

  // Do not use RegExp for split operation as some browser do not support it (See: http://blog.stevenlevithan.com/archives/cross-browser-split)
  let versionParts
    = match[1] && match[1].split('.').join('_').split('_').slice(0, 3)
  if (versionParts) {
    if (versionParts.length < REQUIRED_VERSION_PARTS) {
      versionParts = [
        ...versionParts,
        ...createVersionParts(REQUIRED_VERSION_PARTS - versionParts.length),
      ]
    }
  }
  else {
    versionParts = []
  }

  const version = versionParts.join('.')
  const os = detectOS(ua)
  const searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua)

  if (searchBotMatch && searchBotMatch[1])
    return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1])

  return new BrowserInfo(name, version, os)
}

export function detectOS(ua: string): OperatingSystem | null {
  for (let ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
    const [os, regex] = operatingSystemRules[ii]
    const match = regex.exec(ua)
    if (match)
      return os
  }

  return null
}

export function getServerVersion(): ServerInfo | null {
  return nodeVersion ? new ServerInfo(`${nodeVersion}`) : null
}

function createVersionParts(count: number): string[] {
  const output = []
  for (let ii = 0; ii < count; ii++)
    output.push('0')

  return output
}
