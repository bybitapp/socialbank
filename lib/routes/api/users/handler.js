const errors = require('lib/errors')
const { Org, User } = require('lib/models')
const { sendInviteUser } = require('lib/processors/email')
const schema = require('./schema')

exports.findAll = async function findAll (req, res) {
  let users = []
  const org = await Org
    .findOne({ users: req.user.id, status: 'ACTIVE' })
    .populate('users').exec()
  if (org) {
    if (req.user.access === 'USER') {
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
    .findOne({ users: req.user.id, status: 'ACTIVE' })
    .populate('users').exec()
  if (!org) {
    throw new errors.NotFoundError('Organization not found')
  }

  let user = org.users.find(u => u.email === value.email)
  if (user && !value.uid) {
    throw new errors.ConflictError('User is already added.')
  }

  // update access
  if (!user) {
    user = await User.findOne({ email: value.email }).exec()
    if (user) {
      const userOrg = await Org.findOne({ users: user.id }).exec()
      if (userOrg) {
        // TODO sent request to user, that he can join to new organization
      } else {
        user.access = value.access
        await user.save()
      }
    } else {
      // TODO generate random password
      const password = 'temp123'

      // TODO invite user to join the sotec by email

      user = new User({
        email: value.email,
        access: value.access,
        password: password,
        profile: {
          name: 'invited'
        }
      })
      await user.save()
    }
    // TODO temporary update organization
    await org.update({
      $push: {
        'users': user.id
      }
    })
  } else {
    user.access = value.access
    await user.save()
  }

  await sendInviteUser(user, org)

  return res.send({
    access: user.access,
    email: user.email,
    phone: user.phone,
    id: user.id,
    profile: user.profile
  })
}

exports.remove = async function findAll (req, res) {
  const { error, value } = schema.remove(req.body)

  if (error) {
    throw new errors.ValidationError(error)
  }

  const user = await User.findOne({ _id: value.uid }).exec()
  const org = await Org.findOne({ users: req.user.id, status: 'ACTIVE' }).exec()
  if (user && org) {
    // TODO destroy all assigned cards to this user for selected organization

    // return owner access to removing user
    user.access = 'OWNER'
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
