const handler = require('./handler')

module.exports = [
  {
    description: 'Get bank details',
    method: 'GET',
    path: '/get',
    authorizors: 'loggedIn',
    handler: handler.find
  },
  {
    description: 'Create bank',
    method: 'POST',
    path: '/add',
    authorizors: 'loggedIn',
    handler: handler.create
  }
]
