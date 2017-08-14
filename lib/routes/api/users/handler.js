const errors = require('lib/errors')
const logger = require('lib/logger')
const generator = require('generate-password')
const { Org, User, Card } = require('lib/models')
const { sendInviteUser } = require('lib/processors/email')
const openPayments = require('lib/external/open_payments')
const schema = require('./schema')

exports.findAll = async function findAll (req, res) {
  let users = []
  const org = await Org
    .findOne({ users: req.user.id, status: 'active' })
    .populate('users').exec()
  if (org) {
    if (req.user.access === 'user') {
      users.push({
        id: req.user.id,
        email: req.user.email,
        phone: req.user.phone,
        access: req.user.access,
        profile: req.user.profile
      })
    } else if (req.user.access === 'admin') {
      users = org.users
        .reduce((result, u) => {
          if (u.access !== 'owner') {
            result.push({
              id: u.id,
              email: u.email,
              phone: u.phone,
              access: u.access,
              profile: u.profile
            })
          }
          return result
        }, [])
    } else {
      users = org.users
        .map((u) => {
          return {
            id: u.id,
            email: u.email,
            phone: u.phone,
            access: u.access,
            profile: u.profile
          }
        })
    }
  }
  return res.send(users)
}

exports.add = async function add (req, res) {
  const { error, value } = schema.add(req.body)
  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  const org = await Org
    .findOne({ users: req.user.id, status: 'active' })
    .populate('users').exec()
  if (!org) {
    throw new errors.NotFoundError('Organization not found')
  }

  let userInOrg = org.users.find(u => u.email === value.email)
  if (userInOrg && !value.uid) {
    throw new errors.ConflictError('User is already added.')
  }

  if (userInOrg) {
    // update access
    userInOrg.access = value.access
    userInOrg.profile.role = value.role
    await userInOrg.save()
  } else {
    // a user can only be added to one organization
    const userEmailUsed = await User.findOne({
      email: value.email, status: 'active'
    }).exec()
    if (userEmailUsed) {
      throw new errors.ConflictError('User is already added.')
    }

    const tempPassword = generator.generate({
      length: 10,
      numbers: true,
      symbols: true
    })

    userInOrg = new User({
      email: value.email,
      access: value.access,
      password: tempPassword,
      status: 'pending',
      profile: {
        name: value.name,
        role: value.role
      }
    })
    await userInOrg.save()
    await org.update({
      $push: {
        'users': userInOrg.id
      }
    })

    await sendInviteUser(userInOrg, org)
  }

  return res.send({
    access: userInOrg.access,
    email: userInOrg.email,
    phone: userInOrg.phone,
    status: userInOrg.status,
    id: userInOrg.id,
    profile: userInOrg.profile
  })
}

exports.remove = async function remove (req, res) {
  const { error, value } = schema.remove(req.body)

  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  const user = await User.findOne({ _id: value.uid }).exec()
  const org = await Org.findOne({ users: req.user.id, status: 'active' }).exec()
  if (user && org) {
    const userCards = await Card.find({ user: user.id }).exec()
    if (userCards) {
      await userCards.forEach(async (card) => {
        await openPayments.destroyCard(card.virtualCardId)
        card.status = 'deleted'
        await card.save()
      })
    }

    // return owner access to removing user
    user.status = 'deleted'
    await user.save()

    // remove ref in org to removed user
    await org.update({
      $pull: {
        'users': user.id
      }
    })

    return res.send({
      id: user.id
    })
  }
  throw new errors.NotFoundError('User or Organization not found')
}
