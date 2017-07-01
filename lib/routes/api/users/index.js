'use strict'

const express = require('express')

const router = express.Router()

router.get('/list', async (req, res, next) => {
  return res.send([])
})

module.exports = router
