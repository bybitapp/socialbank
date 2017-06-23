'use strict'

const express = require('express')
const passport = require('passport')
const uuid = require('uuid/v1')

const openPayments = require('lib/external/open_payments')
const googleMap = require('lib/external/google_map')
const { User, Org } = require('lib/models')
const schema = require('./schema')
const { getProjects } = require('lib/util/functions')

const router = express.Router()

// create account [External/Internal Account|mongoDB]
router.post('/register', async(req, res, next) => {
  const { error, value } = schema.register(req.body)
  var register = value

  if (error) {
    return res.status(409).send(error)
  }

  // create org
  let organization = await Org.findOne({ number: register.charityNumber }).exec()
  if (organization) {
    const error = { msg: `Organization(${register.charityNumber}) already exists.` }
    console.log('errors', error)
    return res.status(409).send(error)
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
      password: register.password
    })
    await user.save()
  }

  // send request to API
  const externalName = 'SOTEC.' + uuid()
  const externalAccount = await openPayments.createAccount(externalName, register)

  // get lat/lng from address
  let location = {lat: 0, lng: 0}
  const geocode = await googleMap.geocode(register.address, register.postcode, register.city)
  if (geocode && geocode.length > 0) {
    location = geocode[0].geometry.location
  }

  organization = new Org({
    name: register.charityName,
    number: register.charityNumber,
    location: {
      address: register.address,
      postcode: register.postcode,
      city: register.city,
      lat: location.lat,
      lng: location.lng
    },
    externalAccountId: externalAccount.id.id,
    externalAccountName: externalName,
    users: [user]
  })
  await organization.save()

  // we don't have activation email flow yet
  console.log('success', { msg: 'Please check your inbox for an account activation email' })
  return res.send(Object.assign({organization}, {
    email: register.email,
    password: register.password
  }))
})

router.post('/login', async(req, res, next) => {
  const { error } = schema.login(req.body)
  if (error) {
    return res.status(409).send(error)
  }

  passport.authenticate('local', async(err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      console.log('errors', info)
      return res.sendStatus(404)
    }

    req.logIn(user, async (err) => {
      if (err) { return next(err) }

      const organization = await Org.findOne({'users': user.id}).exec()
      const externalAccountName = organization.externalAccountName
      const extAccounts = await openPayments.getExternalAccounts(externalAccountName)
      const extAccount = extAccounts.externalAccounts

      let bankAccount = {}
      if (extAccount) {
        const { externalAccountInfo } = extAccount[0]
        bankAccount.bankName = externalAccountInfo.bankName
        bankAccount.owner = externalAccountInfo.payee
        bankAccount.ibanCode = externalAccountInfo.ibanCode
        bankAccount.swiftCode = externalAccountInfo.swiftCode
      }

      return res.send({
        account: {
          organization: {
            id: organization.id,
            name: organization.name,
            number: organization.number,
            bankAccount: bankAccount,
            location: organization.location
          },
          email: user.email,
          id: user.id
        }
      })
    })
  })(req, res, next)
})

router.get('/login', (req, res) => {
  if (req.isAuthenticated()) { return res.send({ loggedIn: true }) }

  return res.send(401)
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  return res.send({ loggedIn: false })
})

module.exports = router
