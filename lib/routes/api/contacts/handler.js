const errors = require('lib/errors')
const logger = require('lib/logger')
const schema = require('./schema')
const sendContactMessage = require('lib/processors/email/send_contact_message')

exports.send = async function send (req, res) {
  const { error, value } = schema.contact(req.body)
  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  return sendContactMessage(value.email, value.name, value.message)
    .then((body) => {
      logger.info('Message sent', body)
      return res.status(200).send('Message Sent')
    })
}
