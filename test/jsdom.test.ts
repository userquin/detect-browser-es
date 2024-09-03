/**
 * @vitest-environment jsdom
 */

import { describe, expect, it } from 'vitest'
import { detect } from '../src'

describe('jsdom', () => {
  it('jsdom info is present', () => {
    const browser = detect()
    expect(browser).toBeDefined()
    expect(browser?.type).toBe('jsdom')
    expect(browser?.version).toMatchInlineSnapshot('"25.0.0"')
  })
})
