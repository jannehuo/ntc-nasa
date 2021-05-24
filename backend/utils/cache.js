const NodeCache = require('node-cache')
const myCache = new NodeCache()
const constants = require('../constants')

function set(key, obj, ttl = constants.DEFAULT_TTL) {
  myCache.set(key, obj, ttl)
}

function get(key) {
  return myCache.get(key)
}

module.exports = {
  get,
  set,
}
