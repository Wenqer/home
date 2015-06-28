require('babel/register')
var config        = require('./config')
var express       = require('express')
var bodyParser    = require('body-parser')
var morgan        = require('morgan')
var mw            = require('./middleware')

var app = express()

app.use(morgan(function(tokens, req, res){
  var status = res.statusCode,
    color = 32,
    user = (req.user && req.user.email) || '-',
    ip = req.headers['cf-connecting-ip'] || req.ip || req._remoteAddress || req.connection.remoteAddress,
    iplen = ip.length,
    maxlen = 15

  if (status >= 500) color = 31
  else if (status >= 400) color = 33
  else if (status >= 300) color = 36

  return '\x1b[90m' + ip + new Array(maxlen - iplen + 2).join(' ')
    + '\x1b[90m' + 'HTTP/' + req.httpVersionMajor + '.' + req.httpVersionMinor + ' '
    + user + ' '
    + '\x1b[90m' + req.method
    + ' ' + req.originalUrl + ' '
    + '\x1b[' + color + 'm' + res.statusCode
    + ' \x1b[90m'
    + (new Date - req._startTime)
    + 'ms'
    + '\x1b[0m'
}))

app.set('views', __dirname)
// app.engine('dust', cons.dust)
// app.set('view engine', 'dust')
// app.set('view options', {'cache': config.cache})

app.use(bodyParser(config.bodyParser))

config.modules.forEach(function (routePath) {
    require('./' + routePath)(app)
  }
)

//FINALLY, use any error handlers
app.use(mw.errorHandler())

//Note that there's not much logic in this file.
//The server should be mostly 'glue' code to set things up and
//then start listening

app.listen(config.express.port, config.express.ip, function (error) {
  if (error) {
    console.error('Unable to listen for connections', error)
    process.exit(10)
  }
  console.info('express is listening on http://' +
    config.express.ip + ':' + config.express.port)
})