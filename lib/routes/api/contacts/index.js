'use strict';

const express = require('express');
const uuid = require('uuid/v1');
const schema = require('./schema');

const router = express.Router();

router.post('/send', async(req, res) => {
    try {

      console.log(req.body)

      const { error, value } = schema.contact(req.body)

      if (error) {
        return res.status(409).send(error)
      }

      // TODO: SEND MESSAGE TO contact@socialbank.co

      return res.status(200).send("Success")

    } catch (err) {
      console.error(err)
      return res.status(409).send(err)
    }
})

module.exports = router;
