function index(req,res) {
  res.json({'hello':'world'})
}

module.exports = function setup (app) {
  app.get('/', index)
}