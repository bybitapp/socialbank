const mailgun = require('lib/external/mailgun')
const config = require('config')
const logger = require('logger')
const debug = require('debug')('sendPasswordChanged')

module.exports = function sendPasswordChanged (user) {
  const subject = 'Your SoTec password has been changed'
  const from = config.support.email
  const to = user.email
  const content = {
    text: `Hello,\n\nThis is a confirmation that the password for your account ${user.email} has just been changed.\n`
  }

  return mailgun.sendMail(to, from, subject, content)
    .then((response) => {
      debug('response', response)
      logger.info('Password changed to', to)
    })
    .catch((error) => {
      logger.error(error)
      throw error
    })
}
