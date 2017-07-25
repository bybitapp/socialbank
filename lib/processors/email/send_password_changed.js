const mailchimp = require('external/mailchimp')
const config = require('config')
const logger = require('logger')
const debug = require('debug')('sendPasswordChanged')

module.exports = function sendPasswordChanged (user) {
  const subject = 'Your SoTec password has been changed'
  const from = { email: config.support.email, name: config.support.name }
  const to = { email: user.email }
  const content = `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`

  return mailchimp.sendTextMail(to, from, subject, content)
    .then((response) => {
      debug('response', response)
      logger.info('Password changed to', to)
    })
    .catch((error) => {
      logger.error(error)
      throw error
    })
}
