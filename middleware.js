exports.errorHandler = function() {
  return function errorHandler(err, req, res, next) {
    console.error('err', err)
  }
}