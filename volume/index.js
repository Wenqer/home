function index(req,res) {
  res.json({'hello':'volume'})
}

module.exports = function setup (app) {
  app.get('/volume', index)
}