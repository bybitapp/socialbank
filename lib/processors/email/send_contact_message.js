const mailchimp = require('external/mailchimp')
const logger = require('logger')
const config = require('config')
const debug = require('debug')('sendContactMessage')

module.exports = function sendContactMessage (contactForm) {
  const subject = 'Contact Form | SoTec'
  const to = { email: config.support.email, name: config.support.name }
  const from = { email: contactForm.email }
  const content = `Message from ${contactForm.name}: ${contactForm.message}`

  return mailchimp.sendTextMail(to, from, subject, content)
    .then((response) => {
      debug('response', response)
      logger.info('Received contact message', from)
    })
    .catch((error) => {
      logger.error(error)
      throw error
    })
}
