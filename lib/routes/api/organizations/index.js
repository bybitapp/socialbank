'use strict'

const express = require('express')

const { Org } = require('lib/models')
const { getProjects } = require('lib/util/functions')
const googleMap = require('lib/external/google_map')
const schema = require('./schema')

const router = express.Router()

// get list of organizations
router.get('/list', async (req, res, next) => {
  const orgList = await Org.find({}).exec()
  let organizations = orgList
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
    }
  )

  return res.send(organizations)
})

// get list of organizations
router.get('/get', async(req, res, next) => {
  let organization = await Org.findOne({ users: req.user.id }).exec()
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
})

// get list of organizations
router.post('/add', async(req, res, next) => {
  const { error, value } = schema.organization(req.body)

  if (error) {
    return res.status(409).send(error)
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
  let organization = await Org.findOne({ users: req.user.id }).exec()
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
})

// get organization
router.get('/o/:id', async(req, res, next) => {
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
})

module.exports = router
