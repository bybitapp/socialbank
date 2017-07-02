
const express = require('express')
const passport = require('passport')
const { User } = require('lib/models')
const schema = require('./schema')
const router = express.Router()

// create account [External/Internal Account|mongoDB]
router.post('/register', async (req, res, next) => {
  const { error, value } = schema.register(req.body)
  var register = value

  if (error) {
    return res.status(409).send(error)
  }

  // create user
  let user = await User.findOne({ email: register.email, status: 'active' }).exec()
  if (user) {
    const error = { msg: 'Account with that email address already exists.' }
    console.log('errors', error)
    return res.status(409).send(error)
  } else {
    user = new User({
      email: register.email,
      password: register.password,
      phone: register.phone
    })
    await user.save()
  }

  // we don't have activation email flow yet
  console.log('success', { msg: 'Please check your inbox for an account activation email' })
  return res.send({
    email: register.email,
    password: register.password,
    phone: register.phone
  })
})

router.post('/login', async (req, res, next) => {
  const { error } = schema.login(req.body)
  if (error) {
    return res.status(409).send(error)
  }

  passport.authenticate('local', async (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      console.log('errors', info)
      return res.sendStatus(404)
    }

    req.logIn(user, async (err) => {
      if (err) { return next(err) }

      return res.send({
        email: user.email,
        phone: user.phone,
        id: user.id
      })
    })
  })(req, res, next)
})

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) { return res.send({ loggedIn: true }) }

  return res.send(401)
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  return res.send({ loggedIn: false })
})

module.exports = router
