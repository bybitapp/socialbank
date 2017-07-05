const handler = require('./handler')

module.exports = [
  {
    description: 'Send contact',
    method: 'POST',
    path: '/send',
    handler: handler.send
  }
]
