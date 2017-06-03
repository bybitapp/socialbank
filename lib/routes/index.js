module.exports = function (server) {
  server.use('/api', require('./api'));
}
