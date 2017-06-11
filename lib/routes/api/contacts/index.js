'use strict';

const express = require('express');
const uuid = require('uuid/v1');
const schema = require('./schema');
const nodemailer = require('nodemailer');


const router = express.Router();


/* TODO: UNCOMMENT AFTER contact@socialbank.co are created.

// Transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'contact@socialbank.co', // TODO:  mail user into mongoDB
        pass: 'password' // TODO: store mail password into mongoDB
    }
});

*/


router.post('/send', async(req, res) => {
    try {

      const { error, value } = schema.contact(req.body)

      if (error) {
        return res.status(409).send(error)
      }

      const contact = value

      /* TODO: UNCOMMENT AFTER contact@socialbank.co are created.

      // Send mail to contact@socialbank.co with the contact info
      let mailOptions = {
          from: '"Social Bank" <contact@socialbank.co>',
          to: 'contact@socialbank.co',
          subject: `Contact from ${contact.name}`,
          text: `Name: ${contact.name}; Email: ${contact.email}; Message: ${contact.message}`, // plain text body
          html: `<p>Name: ${contact.name}</p><p>Email: ${contact.email}</p><p>Message: ${contact.message}</p>`  // html body
      };

      await transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return res.status(409).send(error)
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
          return res.status(200).send("Message Sent")
      });
      */

      // TEMPORARY START
      return res.status(200).send("Message Sent")
      // TEMPORARY END

    } catch (err) {
      console.error(err)
      return res.status(409).send(err)
    }
})

module.exports = router;
