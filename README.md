# meshblu-test-server
A helper for spinning up a meshblu-server for your tests

## Example

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

## Sinon
If you use sinon.useFakeTimers, you need to whitelist the functions that are mocked out. This is because
mongojs uses setTimeout a bunch under the hood and stopping time causes it to just never respond.
Related docs: http://sinonjs.org/releases/v3.2.1/fake-timers/

```javascript
const now = Date.now()
sinon.useFakeTimers({ now, toFake: ['Date'] })  // now is optional
moment().utc().format()  // moment should work as expected. AFAIK, moment only uses Date
```

## Travis

In order for the server to work in travis, you'll need to add the following to your `.travis.yml`

```yaml
services:
- redis
- mongodb
```
