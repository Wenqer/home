var hue = require('node-hue-api')
var HueApi = hue.HueApi
var lightState = hue.lightState
var config = require('../config').hue
var api = new HueApi(config.host, config.user)

// var state = lightState
//   .create()
//   .on()
//   .white(154, 100)
//   .transition(10)

function index(req, res) {
  api
    // .getFullState()
    .lightStatus(1)
    // .groups()
    // .createGroup('restRoom', [1, 2, 3])
    .then(function(result) {
      res.json(result)
    })
    .fail(function(err) {
      res.json(err)
    })
    .done()
}

function setSunrise(req, res) {
  var base = function() {
    return lightState
      .create()
      .on()
      // .xy(0.509, 0.4149)
      // .xy(0.6736, 0.3221)
      .transition(20)
  }
  var red = base()
    .brightness(90)
    .xy(0.6736, 0.3221)
  var white = base()
    .brightness(80)
    .xy(0.509, 0.4149)

  api
    .setLightState(1, red)
  api
    .setLightState(2, white)
  api
    .setLightState(3, white)
    // .then(function(result) {
    //   res.json(result)
    // })
    // .fail(function(err) {
    //   res.json(err)
    // })
    // .done()
  res.end()
}

function setBrightness(req, res) {
  var brightness = lightState
    .create()
    .on()
    .brightness(req.params.value)
    .transition(5)

  api
    .setGroupLightState(1, brightness)
    .then(function(result) {
      res.json(result)
    })
    .fail(function(err) {
      res.json(err)
    })
    .done()
}

function setActive(req, res) {
  var state = lightState
    .create()
    .on()
    .xy(0.3151, 0.3252)
    .brightness(80)
    .transition(5)

  api
    .setGroupLightState(1, state)
    .then(function(result) {
      res.json(result)
    })
    .fail(function(err) {
      res.json(err)
    })
    .done()
}

function setOff(req, res) {
  var state = lightState
    .create()
    .off()
    .transition(3)

  api
    .setGroupLightState(1, state)
    .then(function(result) {
      res.json(result)
    })
    .fail(function(err) {
      res.json(err)
    })
    .done()
}

module.exports = function setup (app) {
  app.get('/light', index)
  app.get('/light/off', setOff)
  app.get('/light/active', setActive)
  app.get('/light/sunrise', setSunrise)
  app.get('/light/b/:value', setBrightness)
}