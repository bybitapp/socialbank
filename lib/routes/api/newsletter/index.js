const handler = require('./handler')

module.exports = [
  {
    description: 'Subscribe to newsletter',
    method: 'POST',
    path: '/',
    handler: handler.subscribe
  }
]
