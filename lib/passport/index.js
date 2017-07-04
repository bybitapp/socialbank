const passport = require('passport')

const localStrategy = require('./local_strategy')
const User = require('lib/models/User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(localStrategy)