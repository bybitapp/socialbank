const handler = require('./handler')

module.exports = [
  {
    description: 'Get all users assigned to owner organization',
    method: 'GET',
    path: '/list',
    authorizors: 'loggedIn',
    handler: handler.findAll
  },
  {
    description: 'Add user into organization',
    method: 'POST',
    path: '/add',
    authorizors: 'loggedIn',
    handler: handler.add
  },
  {
    description: 'Remove selected user from organization',
    method: 'POST',
    path: '/remove',
    authorizors: 'loggedIn',
    handler: handler.remove
  }
]
