const handler = require('./handler')

module.exports = [
  {
    description: 'Get list of organizations with locations',
    method: 'GET',
    path: '/list',
    handler: handler.findAllWithLocation
  },
  {
    description: 'Get an user organization',
    method: 'GET',
    path: '/get',
    handler: handler.findByUserId
  },
  {
    description: 'Create an organization',
    method: 'POST',
    path: '/add',
    authorizors: 'loggedIn',
    handler: handler.create
  },
  {
    description: 'Get an organization',
    method: 'GET',
    path: '/o/:id',
    handler: handler.findByUserId
  }
]
