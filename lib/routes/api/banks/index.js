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
  },
  {
    description: 'Get banks',
    method: 'GET',
    path: '/list',
    authorizors: 'loggedIn',
    handler: handler.findAll
  },
  {
    description: 'Remove bank',
    method: 'POST',
    path: '/remove',
    authorizors: 'loggedIn',
    handler: handler.remove
  }
]
