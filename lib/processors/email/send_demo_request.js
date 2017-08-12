const mailgun = require('lib/external/mailgun')
const logger = require('lib/logger')
const config = require('config')

module.exports = function sendDemoRequest (fromEmail, fromName, message) {
  const subject = `SoTec Demo Request | Message - ${fromName}`
  const to = `${config.support.name} <${config.support.email}>`
  const from = `${fromName} <${fromEmail}>`
  const content = {
    text: `
      Name: ${fromName} \n
      Work Email: ${fromEmail} \n
      Message: ${message} \n
      Message: ${message} \n
      Message: ${message}
    `
  }

  return mailgun.sendMail(to, from, subject, content)
    .then((response) => {
      logger.info('Forwarded contact message sent to', from)
    })
    .catch((error) => {
      logger.error(error)
      throw error
    })
}
