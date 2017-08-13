const handler = require('./handler')

module.exports = [
  {
    description: 'Book a Demo',
    method: 'POST',
    path: '/demo',
    handler: handler.demo
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
    handler: handler.forgotPassword,
    captcha: true
  },
  {
    description: 'Reset password',
    method: 'POST',
    path: '/resetPassword/:token',
    handler: handler.resetPassword
  }
]
