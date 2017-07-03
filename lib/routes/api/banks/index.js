const handler = require('./handler')

module.exports = [
  {
    description: 'Get bank details',
    method: 'GET',
    path: '/',
    authorizors: 'loggedIn',
    handler: handler.show
  },
  {
    description: 'Create bank',
    method: 'POST',
    path: '/',
    authorizors: 'loggedIn',
    handler: handler.create
  }
]
