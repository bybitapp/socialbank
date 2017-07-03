const handler = require('./handler')

module.exports = [
  {
    description: 'Get all users',
    method: 'GET',
    path: '/list',
    authorizors: 'loggedIn',
    handler: handler.findAll
  }
]
