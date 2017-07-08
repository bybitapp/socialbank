const handler = require('./handler')

module.exports = [
  {
    description: 'Register',
    method: 'POST',
    path: '/register',
    handler: handler.register
  },
  {
    description: 'Login',
    method: 'POST',
    path: '/login',
    handler: handler.login
  },
  {
    description: 'Logout',
    method: 'GET',
    path: '/logout',
    handler: handler.logout
  },
  {
    description: 'Update account',
    method: 'POST',
    path: '/update',
    handler: handler.update
  }
]
