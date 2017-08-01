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
    authorizors: 'loggedIn',
    path: '/logout',
    handler: handler.logout
  },
  {
    description: 'Update account',
    method: 'POST',
    authorizors: 'loggedIn',
    path: '/update',
    handler: handler.update
  },
  {
    description: 'Update password',
    method: 'POST',
    authorizors: 'loggedIn',
    path: '/updatePassword',
    handler: handler.updatePassword
  },
  {
    description: 'Forgot password',
    method: 'POST',
    path: '/forgotPassword',
    handler: handler.forgotPassword
  },
  {
    description: 'Reset password',
    method: 'POST',
    path: '/resetPassword/:token',
    handler: handler.resetPassword
  }
]
