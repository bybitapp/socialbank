const errors = require('lib/errors')
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

exports.add = async function findAll (req, res) {
  const { error, value } = schema.add(req.body)
  if (error) {
    throw new errors.ValidationError(error)
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
    await userInOrg.save()
  } else {
    const userEmailUsed = await User.findOne({
      email: value.email, status: { $ne: 'deleted' }
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

    await sendInviteUser(userInOrg, org, tempPassword)
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

exports.remove = async function findAll (req, res) {
  const { error, value } = schema.remove(req.body)

  if (error) {
    throw new errors.ValidationError(error)
  }

  const user = await User.findOne({ _id: value.uid }).exec()
  const org = await Org.findOne({ users: req.user.id, status: 'active' }).exec()
  if (user && org) {
    const userCards = await Card.find({ user: user.id }).exec()
    console.log(userCards);
    if (userCards) {
      await userCards.forEach(async (card) => {
        console.log('destroyed');
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
