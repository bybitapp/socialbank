const errors = require('lib/errors')
const { getProjects } = require('lib/processors/projects')
const googleMap = require('lib/external/google_map')
const { Org, User } = require('lib/models')
const schema = require('./schema')

// get list of organizations
exports.findAllWithLocation = async function findAllWithLocation (req, res) {
  const orgList = await Org.find({status: 'ACTIVE'}).exec()
  const organizations = orgList
    .filter(org => {
      return (org.location && org.location.lat && org.location.lng)
    })
    .map(org => {
      return {
        id: org.id,
        name: org.name,
        number: org.number,
        funds: '£0',
        icon: 'place',
        lat: org.location.lat,
        lng: org.location.lng,
        address: org.location.address,
        city: org.location.city,
        postcode: org.location.postcode
      }
    })

  return res.send(organizations)
}

// get list of organizations
exports.findByUserId = async (req, res) => {
  const organization = await Org.findOne({ users: req.user.id, status: 'ACTIVE' }).exec()
  if (organization) {
    return res.send({
      id: organization.id,
      name: organization.name,
      number: organization.number,
      location: organization.location
    })
  } else {
    return res.send()
  }
}

// get list of organizations
exports.create = async function create (req, res) {
  const { error, value } = schema.organization(req.body)

  if (error) {
    throw new errors.ValidationError(error)
  }

  // get lat/lng from address
  let location = {
    lat: 0,
    lng: 0,
    address: value.address,
    postcode: value.postcode,
    city: value.city
  }

  const geocode = await googleMap.geocode(value.address, value.postcode, value.city)
  if (geocode && geocode.length > 0) {
    location.lat = geocode[0].geometry.location.lat
    location.lng = geocode[0].geometry.location.lng
  }

  // create org
  let organization = await Org.findOne({ users: req.user.id, status: 'ACTIVE' }).exec()
  if (organization) {
    organization.name = value.name
    organization.number = value.number
    organization.location = location
  } else {
    const user = req.user
    organization = new Org({
      name: value.name,
      number: value.number,
      location: location,
      users: [user]
    })
  }

  await organization.save()

  return res.send({
    id: organization.id,
    name: organization.name,
    number: organization.number,
    location: organization.location
  })
}

// get organization
exports.findById = async function findById (req, res) {
  const org = await Org.findOne({_id: req.params.id}).exec()
  if (org) {
    const projects = await getProjects(org.id, 'public')
    return res.send({
      id: org.id,
      name: org.name,
      number: org.number,
      funds: '£0',
      icon: 'place',
      address: org.location.address,
      city: org.location.city,
      postcode: org.location.postcode,
      projects
    })
  }
  return res.send()
}

// get organization
exports.leave = async function leave (req, res) {
  if (('ADMIN,USER').indexOf(req.user.access) !== -1) {
    const activeOrg = await Org.findOne({users: req.user.id, status: 'ACTIVE'}).exec()
    // remove ref in org to removed user
    await activeOrg.update({$pull: {'users': req.user.id}})

    const user = await User.findOne({ _id: req.user.id }).exec()
    user.access = 'OWNER'
    await user.save()

    const parkedOrg = await Org.findOne({users: req.user.id, status: 'PARKED'}).exec()
    if (parkedOrg) {
      parkedOrg.status = 'ACTIVE'
      await parkedOrg.save()
      return res.send({
        id: parkedOrg.id,
        name: parkedOrg.name,
        number: parkedOrg.number,
        location: parkedOrg.location
      })
    }

    // TODO cancel virtual cards which are assigned to user
  }

  return res.send()
}
