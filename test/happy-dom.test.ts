/**
 * @vitest-environment happy-dom
 */

import { describe, expect, it } from 'vitest'
import { detect } from '../src'

describe('happy-dom', () => {
  it('happy-dom info is present', () => {
    const browser = detect()
    expect(browser).toBeDefined()
    expect(browser?.type).toBe('happy-dom')
    expect(browser?.version).toMatchInlineSnapshot('"0.0.0"')
  })
})
