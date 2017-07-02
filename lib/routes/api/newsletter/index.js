
const express = require('express')

const mailchimp = require('lib/external/mailchimp')
const schema = require('./schema')

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { error, value } = schema.contact(req.body)

    if (error) {
      return res.status(409).send(error)
    }

    await mailchimp.subscribe(value.email)
    return res.status(200).send('Message Sent')
  } catch (err) {
    console.error(err)
    return res.status(409).send(err)
  }
})

module.exports = router
