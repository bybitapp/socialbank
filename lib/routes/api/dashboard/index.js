const handler = require('./handler')

module.exports = [
  {
    description: 'Get dashboard info',
    method: 'GET',
    path: '/',
    authorizors: 'loggedIn',
    handler: handler.getDashboard
  }
]
