# meshblu-test-server
A helper for spinning up a meshblu-server for your tests

```javascript
const MeshbluServer = require('meshblu-test-server')
const MeshbluHttp = require('meshblu-http')

describe('your application', function() {
  before("start meshblu", function(done) {
    this.meshbluServer = new MeshbluServer()
    this.meshbluConfig = this.meshbluServer.getConfig()

    this.meshbluServer.start(done)
  })

  after("stop meshblu", function(done) {
    this.meshbluServer.destroy(done)
  })
  
  it('should be a valid meshblu server now', function(done) {
    const meshblu = new MeshbluHttp(this.meshbluConfig)
    meshblu.register({ type: 'test-device' }, (error, device) {
      if (error) return done(error)
      expect(device.uuid).to.exist
      done()
    })
  })
})
```
