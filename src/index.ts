import {
  nodeMajorVersion,
  nodeVersion,
  platform,
  providerInfo,
  runtime,
  runtimeInfo,
} from 'std-env'
import type {
  ProviderInfo,
  RuntimeInfo,
  RuntimeName,
} from 'std-env'

export type DetectedInfoType =
  | 'browser'
  | 'jsdom'
  | 'happy-dom'
  | 'webdriverio'
  | 'bot-device'
  | 'bot'
  | 'react-native'
  | RuntimeName

/**
 * https://wicg.github.io/ua-client-hints/#interface
 */
interface BrandVersion {
  brand: string
  version: string
}

export interface UserAgentDataInfo {
  brands: BrandVersion[]
  mobile: boolean
  platform: string
  architecture: string
  bitness: string
  model: string
  platformVersion: string
  fullVersionList: BrandVersion[]
}

type UserAgentDataHints = 'architecture' | 'bitness' | 'model' | 'platformVersion' | 'fullVersionList'
interface UserAgentData {
  platform: string
  getHighEntropyValues?: (hints?: UserAgentDataHints[]) => Promise<UserAgentDataInfo>
}

interface DetectedInfo<
  T extends DetectedInfoType, N extends string, O, V = null,
> {
  readonly type: T
  readonly name: N
  readonly version: V
  readonly os: O
  readonly ua?: UserAgentDataInfo
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
    public readonly ua?: UserAgentDataInfo,
  ) {}
}

/**
 * @deprecated Use `ServerInfo` instead
 */
export class NodeInfo
implements DetectedInfo<'node', 'node', NodeJS.Platform, string> {
  public readonly type = 'node'
  public readonly name: 'node' = 'node' as const
  public readonly os: NodeJS.Platform = platform
  public readonly ua?: UserAgentDataInfo = undefined
  constructor(
    public readonly version: string,
  ) {}
}

// TODO: include version if possible
export class ServerInfo
implements DetectedInfo<RuntimeName, RuntimeName, ProviderInfo/* , string */> {
  public readonly nodeVersion: string | null = nodeVersion
  public readonly nodeMajorVersion: number | null = nodeMajorVersion
  public readonly provider: ProviderInfo | undefined = providerInfo
  public readonly runtime: RuntimeInfo | undefined = runtimeInfo
  // TODO: include version if possible
  public readonly version: null = null
  public readonly ua?: UserAgentDataInfo = undefined

  constructor(
    public readonly name: RuntimeName,
    public readonly type: RuntimeName,
    public readonly os: ProviderInfo,
    // TODO: include version if possible
    // public readonly version: string,
  ) {}
}

export class SearchBotDeviceInfo
implements
    DetectedInfo<'bot-device', Browser, OperatingSystem | null, string> {
  public readonly type = 'bot-device'
  public readonly ua?: UserAgentDataInfo = undefined
  constructor(
    public readonly name: Browser,
    public readonly version: string,
    public readonly os: OperatingSystem | null,
    public readonly bot: string,
  ) {}
}

export class BotInfo implements DetectedInfo<'bot', 'bot', null> {
  public readonly type = 'bot'
  public readonly bot: true = true as const // NOTE: deprecated test name instead
  public readonly name: 'bot' = 'bot' as const
  public readonly version: null = null
  public readonly os: null = null
  public readonly ua?: UserAgentDataInfo = undefined
}

export class ReactNativeInfo
implements DetectedInfo<'react-native', 'react-native', null> {
  public readonly type = 'react-native'
  public readonly name: 'react-native' = 'react-native' as const
  public readonly version: null = null
  public readonly os: null = null
  public readonly ua?: UserAgentDataInfo = undefined
}

export class JSDOMInfo
implements DetectedInfo<'jsdom', Browser, OperatingSystem | null, string> {
  public readonly type = 'jsdom'
  public readonly ua?: UserAgentDataInfo = undefined
  constructor(
    public readonly name: Browser,
    public readonly version: string,
    public readonly os: OperatingSystem | null,
  ) {}
}

export class HappyDomInfo
implements DetectedInfo<'happy-dom', Browser, OperatingSystem | null, string> {
  public readonly type = 'happy-dom'
  public readonly ua?: UserAgentDataInfo = undefined
  constructor(
    public readonly name: Browser,
    public readonly version: string,
    public readonly os: OperatingSystem | null,
  ) {}
}

export class WDIOBrowserRunnerInfo
implements DetectedInfo<'webdriverio', Browser, OperatingSystem | null, string> {
  public readonly type = 'webdriverio'
  constructor(
    public readonly name: Browser,
    public readonly version: string,
    public readonly os: OperatingSystem | null,
    public readonly ua?: UserAgentDataInfo,
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
  | 'ios-crawler'
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
  | 'Windows 11'
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
  = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver|MobileSafari)/
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
  ['ios-crawler', /MobileSafari\/([\d.]+).*CFNetwork.* Darwin.*/],
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

export function detect(userAgent?: string) {
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

  if (typeof window !== 'undefined') {
    if ('happyDOM' in window) {
      const happyDOM: HappyDOMOptions | undefined = window.happyDOM as unknown as any
      const ua = happyDOM?.settings?.navigator?.userAgent
      if (ua) {
        const browser = parseUserAgent(ua)
        if (browser instanceof BrowserInfo)
          return new HappyDomInfo(browser.name, browser.version, browser.os)
      }
    }

    if ('__wdioSpec__' in window) {
      const browser = parseUserAgent(navigator.userAgent)
      if (browser instanceof BrowserInfo)
        return new WDIOBrowserRunnerInfo(browser.name, browser.version, browser.os)
    }
  }

  if (typeof navigator !== 'undefined')
    return parseUserAgent(navigator.userAgent)

  return getServerVersion()
}

function matchUserAgent(ua: string) {
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

export function browserName(ua: string) {
  const data = matchUserAgent(ua)
  return data ? data[0] : null
}

export function parseUserAgent(ua: string) {
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
  const searchBotMatch = SEARCHBOT_OS_REGEX.exec(ua)
  // TODO: create search bot OS map, don't use this logic
  const os = searchBotMatch?.[1] === 'MobileSafari' ? 'iOS' : detectOS(ua)

  if (searchBotMatch?.[1])
    return new SearchBotDeviceInfo(name, version, os, searchBotMatch[1])

  return new BrowserInfo(name, version, os)
}

export function detectOS(ua: string) {
  for (let ii = 0, count = operatingSystemRules.length; ii < count; ii++) {
    const [os, regex] = operatingSystemRules[ii]
    const match = regex.exec(ua)
    if (match)
      return os
  }

  return null
}

/**
 * @deprecated Use `getServerVersion` instead
 */
export function getNodeVersion() {
  if (runtime !== 'node' || !nodeVersion)
    return null

  return new NodeInfo(nodeVersion)
}

export async function asyncDetect(options?: {
  userAgent?: string
  hints?: UserAgentDataHints[]
  httpHeaders?: RequestHeaders
}) {
  const info = detect(
    options?.userAgent ?? options?.httpHeaders?.['user-agent'] ?? options?.httpHeaders?.['User-Agent'],
  )
  if (!info)
    return info

  if (info instanceof ReactNativeInfo)
    return info

  if (info instanceof BotInfo)
    return info

  if (info instanceof SearchBotDeviceInfo)
    return info

  if (info instanceof JSDOMInfo)
    return info

  if (info instanceof HappyDomInfo)
    return info

  if (info instanceof ServerInfo)
    return info

  const ua = await lookupUserAgentHints(options)

  if (!ua)
    return info

  const {
    platform,
    platformVersion,
  } = ua

  let isWindows11 = false
  if (platform === 'Windows' && platformVersion.length) {
    const majorPlatformVersion = Number.parseInt(platformVersion.split('.')[0])
    isWindows11 = !Number.isNaN(majorPlatformVersion) && majorPlatformVersion >= 13
  }

  if (info instanceof WDIOBrowserRunnerInfo)
    return new WDIOBrowserRunnerInfo(info.name, info.version, isWindows11 ? 'Windows 11' : info.os, ua)

  return new BrowserInfo(info.name, info.version, isWindows11 ? 'Windows 11' : info.os, ua)
}

/**
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData
 * @see https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues
 * @see https://learn.microsoft.com/en-us/microsoft-edge/web-platform/how-to-detect-win11
 */
export async function lookupUserAgentHints(options?: {
  hints?: UserAgentDataHints[]
  httpHeaders?: RequestHeaders
}) {
  const ua = await lookupClientUserAgentHints(options?.hints)
  if (ua)
    return ua

  return options?.httpHeaders
    ? lookupServerUserAgentHints(options.httpHeaders)
    : undefined
}

export async function lookupClientUserAgentHints(hints?: UserAgentDataHints[]) {
  if (typeof navigator === 'undefined' || !('userAgentData' in navigator))
    return

  const userAgentData: UserAgentData | undefined = navigator.userAgentData as unknown as any
  if (!userAgentData || !(typeof userAgentData.getHighEntropyValues === 'function'))
    return

  return await userAgentData.getHighEntropyValues(hints)
}

type _HTTPHeaderName = 'Sec-CH-UA' | 'Sec-CH-UA-Mobile' | 'Sec-CH-UA-Platform' | 'Sec-CH-UA-Arch' | 'Sec-CH-UA-Bitness' | 'Sec-CH-UA-Model' | 'Sec-CH-UA-Platform-Version' | 'Sec-CH-UA-Full-Version-List'

export type HTTPHeaderName =
    | _HTTPHeaderName
    | Lowercase<_HTTPHeaderName>
    // eslint-disable-next-line @typescript-eslint/ban-types
    | (string & {})

export type RequestHeaders = Partial<
    Record<HTTPHeaderName, string | undefined>
>

const uaAgentHints: Record<string, keyof UserAgentDataInfo> = {
  'Sec-CH-UA': 'brands',
  'Sec-CH-UA-Mobile': 'mobile',
  'Sec-CH-UA-Platform': 'platform',
  'Sec-CH-UA-Arch': 'architecture',
  'Sec-CH-UA-Bitness': 'bitness',
  'Sec-CH-UA-Model': 'model',
  'Sec-CH-UA-Platform-Version': 'platformVersion',
  'Sec-CH-UA-Full-Version-List': 'fullVersionList',
}

const serverAcceptCHHeaders: Record<UserAgentDataHints, HTTPHeaderName> = {
  architecture: 'Sec-CH-UA-Arch',
  bitness: 'Sec-CH-UA-Bitness',
  model: 'Sec-CH-UA-Model',
  platformVersion: 'Sec-CH-UA-Platform-Version',
  fullVersionList: 'Sec-CH-UA-Full-Version-List',
}

/**
 * @see https://github.com/WICG/ua-client-hints
 */
export function lookupServerUserAgentHints(httpHeaders: RequestHeaders) {
  return Object.entries(uaAgentHints).reduce((acc, [header, key]) => {
    const value = httpHeaders[header] ?? httpHeaders[header.toLowerCase()]
    if (value && value.length) {
      if (key === 'brands' || key === 'fullVersionList') {
        const parts = value.split(',')
        for (const entries of parts) {
          let [brand, version] = entries.split(';')
          brand = removeDoubleQuotes(brand.trim())
          version = version.trim()
          acc[key].push({
            brand,
            version: removeDoubleQuotes(version.startsWith('v=') ? version.slice(2) : version),
          })
        }
      }
      else if (key === 'mobile') {
        acc[key] = removeDoubleQuotes(value) === '?1'
      }
      else {
        acc[key] = removeDoubleQuotes(value)
      }
    }
    return acc
  }, <UserAgentDataInfo>{
    brands: [],
    mobile: false,
    platform: '',
    architecture: '',
    bitness: '',
    model: '',
    platformVersion: '',
    fullVersionList: [],
  })
}

export function serverResponseHeadersForUserAgentHints(
  hints: UserAgentDataHints[],
) {
  const headers = Object.entries(serverAcceptCHHeaders)
    .filter(([key]) => hints.includes(key as UserAgentDataHints))
    .map(([_, header]) => header)

  return headers.length ? <RequestHeaders>{ 'Accept-CH': headers.join(', ') } : undefined
}

export function getServerVersion() {
  // TODO: how to extract version?
  return runtimeInfo
    ? new ServerInfo(
      runtimeInfo.name,
      runtimeInfo.name,
      providerInfo,
      // TODO: include version if possible
    )
    : null
}

function createVersionParts(count: number) {
  // return Array.from({ length: count }, () => '0')
  const output: string[] = []
  for (let ii = 0; ii < count; ii++)
    output.push('0')

  return output
}

function removeDoubleQuotes(str: string) {
  return str.replace(/^"/, '').replace(/"$/, '')
}
