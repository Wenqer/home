var path = require('path')

// var PRODUCTION = config.PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  express: {
    port: process.env.PORT || 5000,
    ip: '0.0.0.0'
  },

  modules: [
    'main',
    'volume'
  ],

  bodyParser: {
    'limit': '20mb'
  }
}