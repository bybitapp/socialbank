const mailgun = require('lib/external/mailgun')
const logger = require('lib/logger')
const config = require('config')
const debug = require('debug')('sendContactMessage')

module.exports = function sendContactMessage (fromEmail, fromName, message) {
  const subject = `SoTec Contact Form | Message - ${fromName}`
  const to = config.support.email
  const from = fromEmail
  const content = {
    text: `Name: ${fromName} Email: ${fromEmail} Message: ${message}`,
    html: `<p>Name: ${fromName}</p><p>Email: ${fromEmail}</p><p>Message: ${message}</p>`
  }

  return mailgun.sendMail(to, from, subject, content)
    .then((response) => {
      debug('response', response)
      logger.info('Forwarded contact message', from)
    })
    .catch((error) => {
      logger.error(error)
      throw error
    })
}
