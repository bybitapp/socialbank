
const router = require('express').Router()
const passportConfig = require('lib/passport')

// TODO: Understand passportConfig and put on right place...
console.log(passportConfig)

router.use('/api/accounts', require('./api/accounts'))

module.exports = router
