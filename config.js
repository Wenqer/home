var path = require('path')

// var PRODUCTION = config.PRODUCTION = process.env.NODE_ENV === 'production'

module.exports = {
  express: {
    port: process.env.PORT || 5000,
    ip: '0.0.0.0'
  },

  modules: [
    'main',
    'volume',
    'light'
  ],

  bodyParser: {
    'limit': '20mb'
  },

  hue: {
    host: '192.168.1.142',
    user: '175badea3beb54f713dd90563833b213'
  }
}