/**
 * @vitest-environment happy-dom
 */

import { detect } from '../src'

describe('happy-dom', () => {
  it('happy-dom info is present', () => {
    const browser = detect()
    expect(browser).toBeDefined()
    expect(browser?.type).toBe('happy-dom')
    expect(browser?.version).toMatchInlineSnapshot('"12.9.1"')
  })
})
