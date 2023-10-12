/**
 * @vitest-environment jsdom
 */

import { detect } from '../src'

describe('jsdom', () => {
  it('jsdom info is present', () => {
    const browser = detect()
    expect(browser).toBeDefined()
    expect(browser?.type).toBe('jsdom')
    expect(browser?.version).toMatchInlineSnapshot('"22.1.0"')
  })
})
