const handler = require('./handler')

module.exports = [
  {
    description: 'Create a project',
    method: 'POST',
    path: '/add',
    authorizors: 'loggedIn',
    handler: handler.create
  },
  {
    description: 'Get projects',
    method: 'GET',
    path: '/list',
    handler: handler.findAll
  },
  {
    description: 'Delete a project',
    method: 'POST',
    path: '/delete',
    authorizors: 'loggedIn',
    handler: handler.delete
  },
  {
    description: 'Deposit to a project',
    method: 'POST',
    path: '/deposit',
    authorizors: 'loggedIn',
    handler: handler.deposit
  }
]
