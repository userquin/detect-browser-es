import { runtime } from 'std-env'
import { detect, getNodeVersion, getServerVersion } from '../src'

describe('Server Detection', () => {
  test.skipIf(runtime !== 'node')('Node Detection', () => {
    it('node info is present', () => {
      const nodeInfo = getNodeVersion()
      expect(nodeInfo).toBeDefined()
      expect(nodeInfo?.os).toBeDefined()
      expect(nodeInfo?.name).toBe('node')
      expect(nodeInfo?.version).toBeDefined()
    })
    it('node is server', () => {
      const serverInfo = detect()
      expect(serverInfo).toBeDefined()
      expect(serverInfo?.name).toBe('node')
    })
    it('server info is present', () => {
      const serverInfo = getServerVersion()
      expect(serverInfo).toBeDefined()
      expect(serverInfo?.os).toBeDefined()
      expect(serverInfo?.name).toBe('node')
      expect(serverInfo?.version).toBeDefined()
      expect(serverInfo?.nodeVersion).toBeDefined()
      expect(serverInfo?.nodeMajorVersion).toBeDefined()
    })
  })
})
