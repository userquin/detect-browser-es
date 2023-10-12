import { detect, getServerVersion } from '../src'

describe('node', () => {
  it('server info is present', () => {
    const serverInfo = getServerVersion()
    expect(serverInfo).toBeDefined()
    expect(serverInfo?.os).toBeDefined()
    expect(serverInfo?.name).toBe('node')
    expect(serverInfo?.version).toBeDefined()
    expect(serverInfo?.nodeMajorVersion).toBeDefined()
    expect(serverInfo?.provider).toBeDefined()
    expect(serverInfo?.runtime).toBeDefined()
  })
  it('detect is server', () => {
    const serverInfo = detect()
    expect(serverInfo).toBeDefined()
    expect(serverInfo?.name).toBe('node')
  })
})
