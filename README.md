
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

## Breaking Changes

**TODO**: maybe we can revert these changes before releasing the first version.

[NodeInfo](https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts#L30) and [getNodeVersion](https://github.com/DamonOehlman/detect-browser/blob/master/src/index.ts#L306C17-L306C31) have been renamed to [ServerInfo](https://github.com/userquin/detect-browser-es/blob/main/src/index.ts#L47) and [getServerVersion](https://github.com/userquin/detect-browser-es/blob/main/src/index.ts#L366) respectively.

## New Features

- Detect [Happy DOM](https://github.com/capricorn86/happy-dom) and [JSDOM](https://github.com/jsdom/jsdom) when using test environments like [Vitest](https://github.com/vitest-dev/vitest) (check the [test](https://github.com/userquin/detect-browser-es/tree/main/test) folder).
- Detect [WebDriverIO](https://github.com/webdriverio/webdriverio) when using WebDriverIO tests or test environments like [Vitest](https://github.com/vitest-dev/vitest).
- ServerInfo via [std-env](https://github.com/unjs/std-env) with [provider](https://github.com/unjs/std-env#provider-detection) and [runtime](https://github.com/unjs/std-env#runtime-detection) detection.

## Testing

To run the test `nr test`, will run the original tests from `detect-browser` and the new ones corresponding to the new features (except `WebDriverIO` detection, requires `WebDriverIO`).

To test the `WebDriverIO` detection, you run one of the following commands:
- `nr wdio-chrome`: test `WebDriverIO` detection with Chrome (you must have it installed)
- `nr wdio-edge`: test `WebDriverIO` detection with Edge (you must have it installed)
- `nr wdio-firefox`: test `WebDriverIO` detection with Firefox (you must have it installed)
- `nr wdio-safari`: test `WebDriverIO` detection with Safari (you must have it installed) and on MacOS machine.

## License

[MIT](./LICENSE)
