const mailchimp = require('external/mailchimp')
const logger = require('logger')
const config = require('config')
const debug = require('debug')('sendPasswordReset')

module.exports = function sendPasswordReset (user) {
  const subject = 'Reset your password | SoTec'
  const from = { email: config.support.email, name: config.support.name }
  const to = { email: user.email }
  const content = `You are receiving this email because you have requested the reset of the password for your account.\n\n
    Please click on the following link, or paste this into your browser to complete the process:\n\n
    ${config.app.url}/reset/${user.passwordResetToken}\n\n
    If you did not request this, please ignore this email and your password will remain unchanged.\n`

  return mailchimp.sendTextMail(to, from, subject, content)
    .then((response) => {
      debug('response', response)
      logger.info('Password reset to', to)
    })
    .catch((error) => {
      logger.error(error)
      throw error
    })
}