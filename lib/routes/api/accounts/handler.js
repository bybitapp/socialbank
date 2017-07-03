const passport = require('passport')

const { User } = require('lib/models')
const schema = require('./schema')

exports.register = async function (req, res, next) {
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
}

exports.login = function (req, res, next) {
  const { error } = schema.login(req.body)
  if (error) {
    return res.status(409).send(error)
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { throw err }
    if (!user) {
      console.log('errors', info)
      return res.sendStatus(404)
    }

    req.logIn(user, (err) => {
      if (err) { throw err }

      return res.send({
        email: user.email,
        phone: user.phone,
        id: user.id
      })
    })
  })(req, res)
}

exports.logout = function (req, res) {
  req.session.destroy()
  return res.send({ loggedIn: false })
}
