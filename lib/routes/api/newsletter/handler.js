
const errors = require('lib/errors')
const mailchimp = require('lib/external/mailchimp')
const schema = require('./schema')

exports.subscribe = async function subscribe (req, res) {
  const { error, value } = schema.contact(req.body)

  if (error) {
    return new errors.ValidationError(error)
  }

  await mailchimp.subscribe(value.email)
  return res.status(200).send('Message Sent')
}
