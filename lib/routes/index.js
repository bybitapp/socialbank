'use strict'

const router = require('express').Router();
const passport = require('passport');
const mime = require('mime');

const passportConfig = require('lib/passport');

router.use('/api/accounts', require('./api/accounts/routes'))
router.use('/api/projects', /* passportConfig.isAuthenticated,*/ require('./api/projects/routes'))
router.use('/api/cards', passportConfig.isAuthenticated, require('./api/cards/routes'))

module.exports = router
