const mailchimp = require('lib/external/mailchimp')
const errors = require('lib/errors')
const config = require('config')
const schema = require('./schema')

exports.subscribe = async function subscribe (req, res) {
  const { error, value } = schema.contact(req.body)
  if (error) {
    throw new errors.ValidationError(error)
  }

  try {
    await mailchimp.subscribe(value.email, config.mailchimp.mailingListId)
  } catch (err) {
    if (err.message !== 'Already subscribed e-mail address') {
      throw err
    }
  }
  return res.status(200).send('Message Sent')
}
