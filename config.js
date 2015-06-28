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
    'light',
    'atmo'
  ],

  bodyParser: {
    'limit': '20mb'
  },

  hue: {
    host: '192.168.1.142',
    user: '175badea3beb54f713dd90563833b213'
  },

  netatmo: {
    client_id: '558ad645485a884b63f4a49e',
    client_secret: '3XllGkkKQBpGTIiQ1KqDwPQEt',
    username: 'wenqeer@gmail.com',
    password: 'djkjoer',
  }
}