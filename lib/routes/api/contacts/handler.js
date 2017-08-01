const errors = require('lib/errors')
const logger = require('lib/logger')
const schema = require('./schema')
const nodemailer = require('nodemailer')
const config = require('config')
const smtpConfig = config.smtp
const transporter = nodemailer.createTransport(smtpConfig)

exports.send = async function send (req, res) {
  const { error, value } = schema.contact(req.body)

  if (error) {
    throw new errors.ValidationError(error)
  }

  const mailOptions = {
    from: 'contact@sotec.io',
    to: 'contact@sotec.io',
    subject: `Contact from ${value.name}`,
    text: `Name: ${value.name} Email: ${value.email} Message: ${value.message}`,
    html: `<p>Name: ${value.name}</p><p>Email: ${value.email}</p><p>Message: ${value.message}</p>`
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger.error('errors', error)
      throw new errors.ConflictError(error)
    }
    logger.info('Message %s sent: %s', info.messageId, info.response)
    return res.status(200).send('Message Sent')
  })
}
