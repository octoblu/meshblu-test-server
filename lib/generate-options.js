const _ = require('lodash')

module.exports = function() {
  return {
    dispatcherWorker: {
      namespace: 'test-meshblu-service',
      requestQueueName: 'test-meshblu-service-request-queue',
      timeoutSeconds: 1,
      concurrency: 5,
      redisUri: 'redis://localhost:6379',
      cacheRedisUri: 'redis://localhost:6379',
      firehoseRedisUri: 'redis://localhost:6379',
      mongoDBUri: 'mongodb://localhost:27017/test-meshblu-service-meshblu',
      pepper: 'random-string',
      workerName: 'test',
      aliasServerUri: '',
      jobLogRedisUri: 'redis://localhost:6379',
      jobLogQueue: 'job-log:sample-rate:0',
      jobLogSampleRate: 0,
      privateKey:
        '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAgj8a2mUIa2Md0d7nszF8d8WpWB03XAifIn5buA5Akeyp9SpKy5LtHwFeBNbOCgJHWULqVBWXXuEBLFhoC4DIhVXf0kUoOKpSOM+R+Y3BwbVSxpHK1LvsnFrfHi0IEY8SvWw2NVbUun4D90wryh9j2TBKHnHbgK0++apRBTXOjIuvGMUe9JLBJIZr7BOyT4qBJ7cI3bO/0HjspjW2L+sZ4QkPCtgMp0jfdvWxsBH7MDR+I+S9WNhKL7DmzJj/FnyPYvrNoziB0Dn+iR2Swf1pDYUJo22gBCB4V3wOevqJP6rx8tCKN/yEktsyNu/Hv5lCY+4rlHABeY43M61+T/g9aQIDAQABAoIBAFTZU18PDosWyOhd9EdyZ4mHRSjX76aPH0xTUOD4t+vYZ2gFozA3iS33sA4q+ZLfpSdrRkh8wF3Y6vC+rxk/TmI+bU8IKomvu1yzLH+Mb7sHquMdOyuXOS8qq8t2vpjhwe2Qv0fER1UuntrNzoEgLeXhZYer2LldI3d2Es34HZTEv4wus3UcfkESVNALmvfY9bYSDXb1WnHkuu8NUA1TxqQ0NvjAcNmqRbaheH83LJi8TtBViFK3ZHdYcENtoUfx42f+Us/QTx94iAPO/bjrWu7C333KQcEb7uIHRPMxDeNF+Cx7T7fPNh+XAYe5w3eMWRms45uQfmK22wXURzWfAvkCgYEA4aGGlQwVGvoOnV5lOeVeSdC2i8xvTWUwBkCGOPizVp7/VplZlz2yNE6KGvDSJ84FP5On3IeOIho3zR/1y5fO/toKIPlWP9X8iDz4zdK9OYEyfP07UzjIPhpOp6u+VXm+DwlmpwSgP0j0RLhDdTYxkrezS45SNNSJBfmSjhed3ucCgYEAk8b0qw5Z0eFoQ/fMjZKNIPS8/6I80ss6bqrOyE7IpGC7sQCW/0+9BhQGtvdgFg+1PLybeDslxtuUqTYR8inKEwADcxmDehEfncYr4i8zBOD3JHfMuk/ckyNkmKu508jgVW+J7gXhRyF1Cr1ceGyyT36G/qAlJqbV7qEozqd8By8CgYBo1/rGhW/FMk7aN0PITFms6Sv5+Av8JbnUHeWA0afb51P09JsZ2RRWk+w+qoqs7mGn8j+9DMwx8obdbS105lzMNZshSVsXnKKU1+gxE+zTrMI+LBmGCUua9/R2myp9Y226ZP7rOw4PeiHvUMQf0gflCjFpOX/fhqcJPLgqCLVWHwKBgQCSQVCZk2R2Al7NFg0O+MJQoagEYS9NePHl4YsyWDbf6RUZw3muSd7MizlyEDa63uUCrbA5OGDVBTGGnwr330Atuc+wNMoZH6Vo418/RnN6GqS/JQosQyoNPfQr3ZnW73KHXBLozkz9tzE9ZdiFHx8C6jj0/M6ICIqm2D2o+b4Y5QKBgAGVDkF97tiPcy3s36Gq+fC3+2Vh9HH+zj6hgyAbitHHzYs3yUcDuOATAHg+05WI5BydeOnhrR2cZh8KAV0hIGd0kAmdFraFmdZVZ93ZS7/SJD4kHqfJUoYy4rhLP1eJWXCvs27QLzwDVNv4hPEfvbLowghgeYWxpPpLDDdTw3f2\n-----END RSA PRIVATE KEY-----\n',
      publicKey:
        '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgj8a2mUIa2Md0d7nszF8d8WpWB03XAifIn5buA5Akeyp9SpKy5LtHwFeBNbOCgJHWULqVBWXXuEBLFhoC4DIhVXf0kUoOKpSOM+R+Y3BwbVSxpHK1LvsnFrfHi0IEY8SvWw2NVbUun4D90wryh9j2TBKHnHbgK0++apRBTXOjIuvGMUe9JLBJIZr7BOyT4qBJ7cI3bO/0HjspjW2L+sZ4QkPCtgMp0jfdvWxsBH7MDR+I+S9WNhKL7DmzJj/FnyPYvrNoziB0Dn+iR2Swf1pDYUJo22gBCB4V3wOevqJP6rx8tCKN/yEktsyNu/Hv5lCY+4rlHABeY43M61+T/g9aQIDAQAB\n-----END PUBLIC KEY-----\n',
      singleRun: false,
    },
    meshbluHttp: {
      redisUri: 'redis://localhost:6379',
      cacheRedisUri: 'redis://localhost:6379',
      requestQueueName: 'test-meshblu-service-request-queue',
      responseQueueName: 'test-meshblu-service-response-queue',
      namespace: 'test-meshblu-service',
      jobLogRedisUri: 'redis://localhost:6379',
      jobLogQueue: 'job-log:sample-rate:0',
      jobLogSampleRate: 0,
      jobTimeoutSeconds: 2,
      maxConnections: 15,
      port: _.random(49152, 61000),
    },
    webhookWorker: {
      namespace: 'meshblu-webhooks',
      redisUri: 'redis://localhost:6379',
      queueName: 'webhooks',
      queueTimeout: 1,
      requestTimeout: 5,
      jobLogRedisUri: 'redis://localhost:6379',
      jobLogQueue: 'job-log:sample-rate:0',
      jobLogSampleRate: 0,
      privateKey:
        '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAgj8a2mUIa2Md0d7nszF8d8WpWB03XAifIn5buA5Akeyp9SpKy5LtHwFeBNbOCgJHWULqVBWXXuEBLFhoC4DIhVXf0kUoOKpSOM+R+Y3BwbVSxpHK1LvsnFrfHi0IEY8SvWw2NVbUun4D90wryh9j2TBKHnHbgK0++apRBTXOjIuvGMUe9JLBJIZr7BOyT4qBJ7cI3bO/0HjspjW2L+sZ4QkPCtgMp0jfdvWxsBH7MDR+I+S9WNhKL7DmzJj/FnyPYvrNoziB0Dn+iR2Swf1pDYUJo22gBCB4V3wOevqJP6rx8tCKN/yEktsyNu/Hv5lCY+4rlHABeY43M61+T/g9aQIDAQABAoIBAFTZU18PDosWyOhd9EdyZ4mHRSjX76aPH0xTUOD4t+vYZ2gFozA3iS33sA4q+ZLfpSdrRkh8wF3Y6vC+rxk/TmI+bU8IKomvu1yzLH+Mb7sHquMdOyuXOS8qq8t2vpjhwe2Qv0fER1UuntrNzoEgLeXhZYer2LldI3d2Es34HZTEv4wus3UcfkESVNALmvfY9bYSDXb1WnHkuu8NUA1TxqQ0NvjAcNmqRbaheH83LJi8TtBViFK3ZHdYcENtoUfx42f+Us/QTx94iAPO/bjrWu7C333KQcEb7uIHRPMxDeNF+Cx7T7fPNh+XAYe5w3eMWRms45uQfmK22wXURzWfAvkCgYEA4aGGlQwVGvoOnV5lOeVeSdC2i8xvTWUwBkCGOPizVp7/VplZlz2yNE6KGvDSJ84FP5On3IeOIho3zR/1y5fO/toKIPlWP9X8iDz4zdK9OYEyfP07UzjIPhpOp6u+VXm+DwlmpwSgP0j0RLhDdTYxkrezS45SNNSJBfmSjhed3ucCgYEAk8b0qw5Z0eFoQ/fMjZKNIPS8/6I80ss6bqrOyE7IpGC7sQCW/0+9BhQGtvdgFg+1PLybeDslxtuUqTYR8inKEwADcxmDehEfncYr4i8zBOD3JHfMuk/ckyNkmKu508jgVW+J7gXhRyF1Cr1ceGyyT36G/qAlJqbV7qEozqd8By8CgYBo1/rGhW/FMk7aN0PITFms6Sv5+Av8JbnUHeWA0afb51P09JsZ2RRWk+w+qoqs7mGn8j+9DMwx8obdbS105lzMNZshSVsXnKKU1+gxE+zTrMI+LBmGCUua9/R2myp9Y226ZP7rOw4PeiHvUMQf0gflCjFpOX/fhqcJPLgqCLVWHwKBgQCSQVCZk2R2Al7NFg0O+MJQoagEYS9NePHl4YsyWDbf6RUZw3muSd7MizlyEDa63uUCrbA5OGDVBTGGnwr330Atuc+wNMoZH6Vo418/RnN6GqS/JQosQyoNPfQr3ZnW73KHXBLozkz9tzE9ZdiFHx8C6jj0/M6ICIqm2D2o+b4Y5QKBgAGVDkF97tiPcy3s36Gq+fC3+2Vh9HH+zj6hgyAbitHHzYs3yUcDuOATAHg+05WI5BydeOnhrR2cZh8KAV0hIGd0kAmdFraFmdZVZ93ZS7/SJD4kHqfJUoYy4rhLP1eJWXCvs27QLzwDVNv4hPEfvbLowghgeYWxpPpLDDdTw3f2\n-----END RSA PRIVATE KEY-----\n',
    },
    meshbluFirehose: {
      namespace: 'messages',
      redisUri: 'redis://localhost:6379',
      firehoseRedisUri: 'redis://localhost:6379',
      port: _.random(49152, 61000),
    },
  }
}
