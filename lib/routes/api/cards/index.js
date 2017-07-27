const handler = require('./handler')

module.exports = [
  {
    description: 'Create card',
    method: 'POST',
    path: '/add',
    authorizors: 'loggedIn',
    handler: handler.create
  },
  {
    description: 'Get organization cards',
    method: 'GET',
    path: '/list',
    authorizors: 'loggedIn',
    handler: handler.findAll
  },
  {
    description: 'Delete card',
    method: 'POST',
    path: '/delete',
    authorizors: 'loggedIn',
    handler: handler.delete
  },
  {
    description: 'Transfer money from managed account into card',
    method: 'POST',
    path: '/transfer',
    authorizors: 'loggedIn',
    handler: handler.transfer
  },
  {
    description: 'Update card status',
    method: 'POST',
    path: '/status',
    authorizors: 'loggedIn',
    handler: handler.updateStatus
  },
  {
    description: 'Get card detail',
    method: 'POST',
    path: '/detail',
    authorizors: 'loggedIn',
    handler: handler.findDetail
  }
]
