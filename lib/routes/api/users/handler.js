const errors = require('lib/errors')
const { Org, User } = require('lib/models')
const schema = require('./schema')

exports.findAll = async function findAll (req, res) {
  const org = await Org.findOne({ users: req.user.id }).populate('users').exec()
  let users = []
  if (org) {
    users = org.users
      .filter(u => u.id !== req.user.id)
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
  return res.send(users)
}

exports.add = async function findAll (req, res) {
  const { error, value } = schema.add(req.body)

  if (error) {
    return new errors.ValidationError(error)
  }

  const org = await Org.findOne({ users: req.user.id }).populate('users').exec()
  if (org) {
    let user = org.users.find(u => u.email === value.email)

    if (user && !value.uid) {
      return new errors.ConflictError('You cannot add this same user to organization')
    }

    // update access
    if (user) {
      user.access = value.access
      await user.save()
    } else {
      user = await User.findOne({ email: value.email }).exec()
      if (user) {
        // TODO sent request to user, that he can join to new organization

        // TODO temporary solution for testing
        user.access = value.access
        await user.save()
      } else {
        // TODO invite user to join the sotec

        // TODO temporary solution for testing
        user = new User({
          email: value.email,
          access: value.access,
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
    }

    return res.send({
      access: user.access,
      email: user.email,
      phone: user.phone,
      id: user.id,
      profile: user.profile
    })
  }

  return new errors.NotFoundError('Organization not found')
}

exports.remove = async function findAll (req, res) {
  const { error, value } = schema.remove(req.body)

  if (error) {
    return new errors.ValidationError(error)
  }

  const user = await User.findOne({ _id: value.uid }).exec()
  const org = await Org.findOne({ users: req.user.id }).exec()
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
  return new errors.NotFoundError('User or Organization not found')
}
