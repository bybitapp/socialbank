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
          name: u.name,
          email: u.email,
          phone: u.phone,
          type: u.type
        }
      })
  }
  return res.send(users)
}

exports.remove = async function findAll (req, res, next) {
  const { error, value } = schema.remove(req.body)

  if (error) {
    return res.status(409).send(error)
  }

  const user = await User.findOne({ _id: value.uid }).exec()
  const org = await Org.findOne({ users: req.user.id }).exec()
  if (user && org) {
    // TODO destroy all assigned cards to this user for selected organization

    // return owner access to removing user
    user.type = 'OWNER'
    await user.save()

    // remove ref in org to removed user
    await org.update({$pull: {
      'users': user.id
    }})

    return res.send({
      id: user.id
    })
  }
  return res.status(404).send('User or Organization not found')
}
