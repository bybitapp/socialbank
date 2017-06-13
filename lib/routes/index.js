'use strict'

const router = require('express').Router()
const passport = require('passport')

const passportConfig = require('lib/passport')

router.use('/api/accounts', require('./api/accounts'))
router.use('/api/organizations', require('./api/organizations'))
router.use('/api/contacts', require('./api/contacts'))
router.use('/api/history', require('./api/history'))
router.use('/api/projects', passportConfig.isAuthenticated, require('./api/projects'))
router.use('/api/cards', /* passportConfig.isAuthenticated,*/ require('./api/cards'))

module.exports = router
