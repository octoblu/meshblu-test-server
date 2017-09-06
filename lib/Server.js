const async = require('async')
const mongojs = require('mongojs')
const Redis = require('ioredis')
const MeshbluCoreRunner = require('meshblu-server')
const bindAll = require('lodash/fp/bindAll')
const cloneDeep = require('lodash/fp/cloneDeep')
const each = require('lodash/fp/each')
const functionsIn = require('lodash/fp/functionsIn')
const Chance = require('chance')

const chance = new Chance()
const generateOptions = require('./generate-options')

class MeshbluServer {
  constructor() {
    bindAll(Object.getOwnPropertyNames(MeshbluServer.prototype), this)

    this.MESHBLU_OPTIONS = generateOptions(chance.word({ length: 6 }))
    this.MESHBLU_CONFIG = {
      protocol: 'http',
      hostname: 'localhost',
      port: this.MESHBLU_OPTIONS.meshbluHttp.port,
      keepAlive: true,
    }

    this.MESHBLU_OPTIONS.meshbluFirehose.meshbluConfig = this.MESHBLU_CONFIG
    this.MESHBLU_OPTIONS.webhookWorker.meshbluConfig = this.MESHBLU_CONFIG

    this.MESHBLU_FIREHOSE_CONFIG = {
      protocol: 'http',
      hostname: 'localhost',
      port: this.MESHBLU_OPTIONS.meshbluFirehose.port,
      keepAlive: true,
    }
  }

  getConfig() {
    return cloneDeep(this.MESHBLU_CONFIG)
  }

  getFirehoseConfig() {
    return cloneDeep(this.MESHBLU_FIREHOSE_CONFIG)
  }

  setup(callback) {
    const { mongoDBUri, redisUri } = this.MESHBLU_OPTIONS.dispatcherWorker

    this.mongo = mongojs(mongoDBUri, ['devices', 'tokens', 'subscriptions'])

    this.redis = new Redis(redisUri, { dropBufferSupport: true })
    this.redis = bindAll(functionsIn(this.redis), this.redis)
    this.redis.ping((pingError) => {
      if (pingError) return callback(pingError)

      this.redis.once('error', (error) => {
        if (error) throw error
      })

      callback(null)
    })
  }

  start(callback) {
    async.parallel([
      this.setup,
      this.startMeshblu,
    ], callback)
  }

  startMeshblu(callback) {
    this.meshbluServer = new MeshbluCoreRunner(this.MESHBLU_OPTIONS)
    async.series([
      this.meshbluServer.prepare,
      this.meshbluServer.run,
    ], callback)
  }

  destroy(callback) {
    this.meshbluServer.destroy(callback)
  }

  cleanup(callback) {
    async.parallel([
      this.removeDevices,
      this.removeTokens,
      this.removeSubscriptions,
      this.cleanupRedis,
    ], callback)
  }

  cleanupRedis(callback) {
    const { namespace, requestQueueName, responseQueueName } = this.MESHBLU_OPTIONS.meshbluHttp

    const pipeline = this.redis.pipeline()
    const del = pipeline.del.bind(pipeline)
    const delAll = each(del)

    async.parallel([
      (next) => {
        this.redis.keys(`${namespace}*`, (error, keys) => {
          if (error) return next(error)

          delAll(keys)
          next()
        })
      },
      (next) => {
        this.redis.keys(`${requestQueueName}*`, (error, keys) => {
          if (error) return next(error)

          delAll(keys)
          next()
        })
      },
      (next) => {
        this.redis.keys(`${responseQueueName}*`, (error, keys) => {
          if (error) return next(error)

          delAll(keys)
          next()
        })
      },
    ], (error) => {
      if (error) return callback(error)
      pipeline.exec(callback)
    })
  }

  removeDevices(callback) {
    this.mongo.devices.remove({}, callback)
  }

  removeTokens(callback) {
    this.mongo.tokens.remove({}, callback)
  }

  removeSubscriptions(callback) {
    this.mongo.subscriptions.remove({}, callback)
  }
}

module.exports = MeshbluServer
