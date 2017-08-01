const passport = require('passport')

const errors = require('lib/errors')
const logger = require('lib/logger')
const { User } = require('lib/models')
const randomToken = require('lib/util/randon_token')
const sendPasswordReset = require('lib/processors/email/send_password_reset')
const schema = require('./schema')

exports.register = async function (req, res) {
  const { error, value } = schema.register(req.body)
  var register = value

  if (error) {
    throw new errors.ValidationError(error)
  }

  let user = await User.findOne({ email: register.email, status: 'active' }).exec()
  if (user) {
    const errorMsg = 'Account with that email address already exists.'
    throw new errors.ConflictError(errorMsg)
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
  logger.info('success', { msg: 'Please check your inbox for an account activation email' })
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
    throw new errors.ValidationError(error)
  }

  let user
  try {
    user = await new Promise(function (resolve, reject) {
      passport.authenticate('local', (err, user, info) => {
        if (err) { reject(err) }
        if (!user) {
          logger.error(info)
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
    throw new errors.NotFoundError('Invalid login')
  }
}

exports.logout = function (req, res) {
  req.session.destroy()
  return res.send({ loggedIn: false })
}

exports.update = async function (req, res) {
  const { error, value } = schema.updateAccount(req.body)
  var updateAccount = value

  if (error) {
    logger.error('errors', error)
    throw new errors.ValidationError(error)
  }

  let user = await User.findOne({ email: updateAccount.email, status: 'active' }).exec()
  if (user) {
    user.profile.name = updateAccount.name
    user.phone = updateAccount.phone
    await user.save()
  } else {
    const errorMsg = 'Could not find an account with that email address.'
    throw new errors.ConflictError(errorMsg)
  }

  return res.send({
    email: user.email,
    phone: user.phone,
    profile: user.profile
  })
}

exports.updatePassword = async function (req, res) {
  const { error, value } = schema.updatePassword(req.body)
  const updatePassword = value

  if (error) {
    logger.error('errors', error)
    throw new errors.ValidationError(error)
  }

  const user = await User.findOne({ _id: req.user.id, status: 'active' }).exec()
  if (!user) {
    const errorMsg = 'Could not find user.'
    throw new errors.NotFoundError(errorMsg)
  }

  const isMatch = await user.comparePassword(updatePassword.oldPassword)
  if (!isMatch) {
    const errorMsg = 'Old password does not match.'
    throw new errors.ConflictError(errorMsg)
  }

  user.password = updatePassword.newPassword
  await user.save()

  logger.info('Password saved')
  return res.send({
    email: user.email,
    phone: user.phone,
    profile: user.profile
  })
}

exports.forgotPassword = async function (req, res) {
  const { error, value } = schema.forgotPassword(req.body)

  if (error) {
    logger.error('errors', error)
    throw new errors.ValidationError(error)
  }

  const user = await User.findOne({ email: value.email, status: 'active' }).exec()
  if (user) {
    logger.info('User found! send reset token')
    user.passwordResetToken = await randomToken(16)
    user.passwordResetExpires = Date.now() + 3600000 // 1 hour
    await user.save()
  } else {
    logger.warn('No user found')
  }

  await sendPasswordReset(user)

  return res.send(200)
}
