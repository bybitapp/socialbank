const passport = require('passport')

const errors = require('lib/errors')
const { User } = require('lib/models')
const schema = require('./schema')

exports.register = async function (req, res) {
  const { error, value } = schema.register(req.body)
  var register = value

  if (error) {
    return new errors.ValidationError(error)
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
      phone: register.phone,
      access: 'OWNER'
    })
    await user.save()
  }

  // we don't have activation email flow yet
  console.log('success', { msg: 'Please check your inbox for an account activation email' })
  return res.send({
    email: user.email,
    password: user.password,
    phone: user.phone,
    access: user.access,
    profile: user.profile
  })
}

exports.login = async function (req, res) {
  const { error } = schema.login(req.body)
  if (error) {
    return res.status(409).send(error)
  }

  let user
  try {
    user = await new Promise(function (resolve, reject) {
      passport.authenticate('local', (err, user, info) => {
        if (err) { reject(err) }
        if (!user) {
          console.log('errors', info)
          return resolve(null)
        }

        req.logIn(user, (err) => {
          if (err) { reject(err) }
          resolve(user)
        })
      })(req, res)
    })
  } catch (e) {
    throw new errors.AuthError(e)
  }

  if (user) {
    return res.send({
      access: user.access,
      email: user.email,
      phone: user.phone,
      id: user.id,
      profile: user.profile
    })
  } else {
    return new errors.NotFoundError('Invalid login')
  }
}

exports.logout = function (req, res) {
  req.session.destroy()
  return res.send({ loggedIn: false })
}
