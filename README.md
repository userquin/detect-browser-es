# detect-browser-es

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle size](https://flat.badgen.net/bundlephobia/minzip/detect-browser-es)](https://bundlephobia.com/package/detect-browser-es)

ESM build of [detect-browser](https://www.npmjs.com/package/detect-browser) with server info via [std-env](https://github.com/unjs/std-env).

## Usage

Install:

```sh
# pnpm
pnpm add detect-browser-es

# npm
npm i detect-browser-es

# yarn
yarn add detect-browser-es
```

Import:

```js
// ESM
import { detect } from 'detect-browser-es'

// CommonJS
const { detect } = require('detect-browser-es')
```

## Deprecations

[NodeInfo](https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts#L30) and [getNodeVersion](https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts#L306C17-L306C31) have been deprecated and replaced with [ServerInfo](https://github.com/userquin/detect-browser-es/blob/main/src/index.ts#L47) and [getServerVersion](https://github.com/userquin/detect-browser-es/blob/main/src/index.ts#L366) respectively.

## Breaking changes

Calling `detect` function returns `ServerInfo` instead `NodeInfo`. If you still want to use `NodeInfo`, use deprecated `getNodeVersion` function.

## New Features

- Detect [Happy DOM](https://github.com/capricorn86/happy-dom) and [jsdom](https://github.com/jsdom/jsdom) when using test environments like [Vitest](https://github.com/vitest-dev/vitest) (check the [test](https://github.com/userquin/detect-browser-es/tree/main/test) folder).
- Detect [WebdriverIO](https://github.com/webdriverio/webdriverio) when using [@wdio/browser-runner](https://www.npmjs.com/package/@wdio/browser-runner) runner.
- ServerInfo via [std-env](https://github.com/unjs/std-env) with [provider](https://github.com/unjs/std-env#provider-detection) and [runtime](https://github.com/unjs/std-env#runtime-detection) detection.
- [User-Agent Client Hints API](https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API) client and server detection: via new `asyncDetect` function.
- Windows 11 detection when using the new `asyncDetect` function (there is no way to detect Windows 11 using only `user-agent`).

### User-Agent Client Hints API

The new `asyncDetect` function should be used when you need to detect Windows 11 or any User-Agent Client Hints, otherwise you can still use the `detect` function.

To access the low-entropy User-Agent Client Hints values (`mobile`, `platform` and `brands` ), you don't need to use the `asyncDetect` function, you can use the `navigator.userAgentData` object when available in the browser (check [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API#browser_compatibility)), or using `lookupServerUserAgentHints` function for server.

### Windows 11 detection

There is no way to detect Windows 11 using only `user-agent`, you need to use the `asyncDetect` function or the `serverResponseHeadersForUserAgentHints` function and will work only on Chromium based and Opera browsers (those supporting the User-Agent Client Hints API).

To detect Windows 11 in the browser, you need to use the `asyncDetect` function providing `platformVersion` in the `options.hints` array.

To detect Windows 11 in the server, you need to send `Accept-CH` http response header to the client with the corresponding `Sec-CH-UA-*` values. You can use the `serverResponseHeadersForUserAgentHints` function providing the required entries for your application, it will return the corresponding `Accept-CH` header. The function accepts the hint names you use in the browser, you don't need to worry about http header names.

## Testing

To run the tests, from root folder run `nr dev` or `nr test` (with coverage), the script will run:
- the original tests from `detect-browser`
- Happy DOM and jsdom tests, except WebdriverIO detection
- User-Agent Client Hints server detection 
- Windows 11 server detection
- Accept-CH response header generation

To run tests using Vitest Browser with WebdriverIO, run one of the following commands:
- `nr test:chrome`: Chrome must be installed
- `nr test:edge`: Edge must be installed
- `nr test:firefox`: Firefox must be installed
- `nr test:safari`: Safari must be installed and only on macOS machine

To test WebdriverIO detection, run one of the following commands (will not work, there is a bug in `@wdio/browser-runner`):
- `nr wdio:chrome`: Chrome must be installed
- `nr wdio:edge`: Edge must be installed
- `nr wdio:firefox`: Firefox must be installed
- `nr wdio:safari`: Safari must be installed and only on macOS machine

## License

[MIT](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/detect-browser-es?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/detect-browser-es
[npm-downloads-src]: https://img.shields.io/npm/dm/detect-browser-es?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/detect-browser-es
[license-src]: https://img.shields.io/github/license/unjs/unplugin.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/unjs/unplugin/blob/main/LICENSE

