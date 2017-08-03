/* eslint-disable func-names, prefer-arrow-callback, no-unused-expressions */

const { after, before, beforeEach, describe, it } = global
const { expect } = require('chai')
const request = require('request')
const url = require('url')
const Server = require('../../lib/Server')

describe('Server', function() {
  before('start meshblu', function(done) {
    this.sut = new Server()
    this.sut.start(done)
  })

  after('stop meshblu', function(done) {
    this.sut.destroy(done)
  })

  describe('GET /status', function() {
    beforeEach(function(done) {
      const { protocol, hostname, port } = this.sut.getConfig()
      const baseUrl = url.format({ protocol, hostname, port })

      request.get('/status', { baseUrl, json: true }, (error, response, body) => {
        if (error) return done(error)

        this.response = response
        this.body = body
        done()
      })
    })

    it('should respond with a 200', function() {
      expect(this.response.statusCode).to.equal(200)
    })

    it('should respond with meshblu: online', function() {
      expect(this.body).to.deep.equal({ meshblu: 'online' })
    })
  })
})
