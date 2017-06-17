'use strict'

const express = require('express')
const uuid = require('uuid/v1')
const schema = require('./schema')
const nodemailer = require('nodemailer')
const config = require('config')
const router = express.Router()

const { smtp } = config

// Transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(smtp)

router.post('/send', async (req, res) => {
  try {
    const { error, value } = schema.contact(req.body)

    if (error) {
      return res.status(409).send(error)
    }

    let mailOptions = {
      from: '\'Social Bank\' <contact@socialbank.co>',
      to: 'contact@socialbank.co',
      subject: `Contact from ${value.name}`,
      text: `Name: ${value.name} Email: ${value.email} Message: ${value.message}`,
      html: `<p>Name: ${value.name}</p><p>Email: ${value.email}</p><p>Message: ${value.message}</p>`
    }

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(409).send(error)
      }
      console.log('Message %s sent: %s', info.messageId, info.response)
      return res.status(200).send('Message Sent')
    })

    return res.status(200).send('Message Sent')
  } catch (err) {
    console.error(err)
    return res.status(409).send(err)
  }
})

module.exports = router
