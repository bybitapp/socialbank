require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require('passport')
const path = require('path')
const cors = require('cors')
const lusca = require('lusca')

const middleware = require('lib/middleware')
const router = require('lib/router')
const config = require('./config')
require('lib/db')
require('lib/passport')

const server = express()

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error)
})

server.disable('etag')
server.disable('x-powered-by')
server.enable('trust proxy')

server.use(middleware.ensureHttps())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json({limit: '512kb'}))
server.use(cors())
server.use(express.static('./build'))
server.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.session.secret,
  cookie: {
    httpOnly: true,
    secure: config.session.cookie.secure
  },
  store: new MongoStore({
    url: config.mongoUrl,
    autoReconnect: true
  })
}))
server.use(passport.initialize())
server.use(passport.session())
server.use(lusca({
  csrf: false,
  xframe: 'SAMEORIGIN',
  hsts: { maxAge: 31536000 },
  xssProtection: true,
  nosniff: true
}))

server.use('/api/accounts', router(require('lib/routes/api/accounts')))
server.use('/api/banks', router(require('lib/routes/api/banks')))
server.use('/api/cards', router(require('lib/routes/api/cards')))
server.use('/api/organizations', router(require('lib/routes/api/organizations')))
server.use('/api/users', router(require('lib/routes/api/users')))
server.use('/api/contacts', router(require('lib/routes/api/contacts')))
server.use('/api/history', router(require('lib/routes/api/history')))
server.use('/api/newsletter', router(require('lib/routes/api/newsletter')))
server.use('/api/projects', router(require('lib/routes/api/projects')))

server.get('*', (req, res, next) => {
  if (/^\/api(\/.*)?$/.test(req.path) === false) {
    res.sendFile(path.join(__dirname, './build', 'index.html'))
  } else {
    next()
  }
})

server.use(middleware.errorDispatcher())

server.listen(config.app.port, (err) => {
  if (err) throw err
  console.log('> Ready on http://localhost:' + config.app.port)
})
