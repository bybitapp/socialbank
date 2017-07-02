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
const routes = require('lib/routes')
const config = require('./config')
require('lib/db')

const server = express()

// TEMPORARY START
// This event are called when an unhandled rejection throw exception
// But couldn't figure out how to send back an 500 response to client
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error)
})
// TEMPORARY END

server.enable('trust proxy')

server.use(middleware.ensureHttps())
server.use(bodyParser.json())
server.use(cors())
server.use(express.static('./build'))
server.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.session.secret,
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

server.use(routes)
server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, './build', 'index.html'))
})

server.use(middleware.errorDispatcher())

server.listen(config.app.port, (err) => {
  if (err) throw err
  console.log('> Ready on http://localhost:' + config.app.port)
})
