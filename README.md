
# detect-browser-es

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

## New Features

- Detect [Happy DOM](https://github.com/capricorn86/happy-dom) and [jsdom](https://github.com/jsdom/jsdom) when using test environments like [Vitest](https://github.com/vitest-dev/vitest) (check the [test](https://github.com/userquin/detect-browser-es/tree/main/test) folder).
- Detect [WebdriverIO](https://github.com/webdriverio/webdriverio) when using WebdriverIO tests.
- ServerInfo via [std-env](https://github.com/unjs/std-env) with [provider](https://github.com/unjs/std-env#provider-detection) and [runtime](https://github.com/unjs/std-env#runtime-detection) detection.

## Testing

To run the tests, from root folder run `nr dev` or `nr test` (with coverage), the script will run:
- the original tests from `detect-browser`
- Happy DOM and jsdom tests, except WebdriverIO detection

To run tests in the browser via WebdriverIO, run one of the following commands:
- `nr test-chrome`: Chrome must be installed
- `nr test-edge`: Edge must be installed
- `nr test-firefox`: Firefox must be installed
- `nr test-safari`: Safari must be installed and only on macOS machine

To test WebdriverIO detection, run one of the following commands:
- `nr wdio-chrome`: Chrome must be installed
- `nr wdio-edge`: Edge must be installed
- `nr wdio-firefox`: Firefox must be installed
- `nr wdio-safari`: Safari must be installed and only on macOS machine

## License

[MIT](./LICENSE)
