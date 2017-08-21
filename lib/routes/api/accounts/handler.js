const passport = require('passport')

const errors = require('lib/errors')
const logger = require('lib/logger')
const { User } = require('lib/models')
const randomToken = require('lib/util/randon_token')
const { sendPasswordReset, sendPasswordChanged, sendDemoRequest } = require('lib/processors/email')
const schema = require('./schema')
const config = require('config')

exports.demo = async function (req, res) {
  const { error, value } = schema.demo(req.body)
  const demo = value

  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  let user = await User.findOne({ email: demo.email, status: { $ne: 'deleted' } }).exec()
  if (user) {
    const errorMsg = 'Account with that email address already exists.'
    throw new errors.ConflictError(errorMsg)
  } else {
    user = new User({
      email: demo.email,
      phone: demo.phone,
      access: 'owner',
      status: 'pending',
      profile: {
        name: demo.name,
        role: demo.role
      }
    })
    await user.save()
  }

  await sendDemoRequest(
    demo.email,
    demo.name,
    demo.phone,
    demo.role,
    demo.employees
  )

  logger.info('success', { msg: 'Request about demo account has accepted' })
  return res.send({
    email: user.email,
    phone: user.phone,
    access: user.access,
    status: user.status,
    profile: user.profile
  })
}

exports.login = async function (req, res) {
  const { error } = schema.login(req.body)
  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
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
  return new Promise(function (resolve, reject) {
    req.session.destroy(function (err) {
      if (err) {
        logger.error('deleting session', err)
        reject(err)
      } else {
        res.clearCookie(config.session.name, {
          httpOnly: config.session.cookie.httpOnly,
          secure: config.session.cookie.secure,
          domain: config.session.cookie.domain
        })
        delete req.user
        delete req.session

        return res.send({ loggedIn: false })
      }
    })
  })
}

exports.update = async function (req, res) {
  const { error, value } = schema.updateAccount(req.body)
  const updateAccount = value

  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
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
  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  const user = await User.findOne({ _id: req.user.id, status: 'active' }).exec()
  if (!user) {
    const errorMsg = 'Could not find user.'
    throw new errors.NotFoundError(errorMsg)
  }

  const isMatch = await user.comparePassword(value.oldPassword)
  if (!isMatch) {
    const errorMsg = 'Old password does not match.'
    throw new errors.ConflictError(errorMsg)
  }

  const isValid = await user.isPasswordAllowed(value.newPassword)
  if (isValid === false) {
    throw new errors.ConflictError('Please choose another password.')
  }

  user.password = value.newPassword
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
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  const user = await User.findOne({ email: value.email, status: { $in: ['active', 'pending'] } }).exec()
  if (!user) {
    logger.warn('No user found')
    return res.sendStatus(200)
  }

  logger.info('User found! send reset token')
  user.passwordResetToken = await randomToken(16)
  user.passwordResetExpires = Date.now() + 3600000 // 1 hour
  await user.save()
  await sendPasswordReset(user)

  return res.sendStatus(200)
}

exports.resetPassword = async function (req, res) {
  const { error, value } = schema.resetPassword(req.body)
  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  const user = await User
    .findOne({ passwordResetToken: req.params.token })
    .where('passwordResetExpires').gt(Date.now())
    .exec()

  if (!user) {
    const errorMsg = 'Password reset token is invalid or has expired.'
    logger.error(errorMsg)
    throw new errors.ConflictError(errorMsg)
  }

  const isValid = await user.isPasswordAllowed(value.password)
  if (isValid === false) {
    throw new errors.ConflictError('Please choose another password.')
  }

  user.password = value.password
  user.passwordResetToken = undefined
  user.passwordResetExpires = undefined
  await user.save()
  await sendPasswordChanged(user)

  return res.sendStatus(200)
}
