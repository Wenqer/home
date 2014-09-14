var exec = require('child_process').exec

function index(req, res) {
  var vol = req.params.value
  exec('volume ' + vol, function(err, stdout, stderr) {
    res.json({
      value: vol,
      err: err,
      stdout: stdout,
      stderr: stderr
    })
  })
}

module.exports = function setup (app) {
  app.get('/volume/:value', index)
}