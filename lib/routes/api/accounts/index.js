'use strict'

const express = require('express')
const passport = require('passport')
const uuid = require('uuid/v1')

const openPayments = require('lib/external/open_payments')
const { User, Org, Project } = require('lib/models')
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
    user.save()
  }

  // create org
  let organization = await Org.findOne({ number: register.charityNumber }).exec()
  if (organization) {
    const error = { msg: `Organization(${register.charityNumber}) already exists.` }
    console.log('errors', error)
    return res.status(409).send(error)
  } else {
    organization = new Org({
      name: register.charityName,
      number: register.charityNumber,
      address: register.address,
      postcode: register.postcode,
      city: register.city,
      bankAccount: {},
      users: [user]
    })
    organization.save()
  }

  // send request to API
  const externalName = 'SOCIALBANK.' + uuid()
  const externalAccount = await openPayments.createAccount(externalName, register)

  // update org
  Org
    .findOne({ _id: organization.id }).exec()
    .then((existingOrg) => {
      if (existingOrg) {
        existingOrg.bankAccount.externalAccountId = externalAccount.id.id
        existingOrg.bankAccount.externalAccountName = externalName
        return existingOrg.save()
      }
    })
    .then((organization) => {
      console.log('success', { msg: 'Please check your inbox for an account activation email' })
      res.send(Object.assign({organization}, {
        email: register.email,
        password: register.password
      }))
    }).catch(err => {next(err)})

})

router.post('/login', async(req, res, next) => {
  const { error } = schema.login(req.body)
  if (error) {
    res.status(409).send(error)
  }

  passport.authenticate('local', async(err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      console.log('errors', info)
      return res.sendStatus(404)
    }

    req.logIn(user, async (err) => {
      if (err) { return next(err) }

      const organization = await Org.findOne({"users": user.id}).exec()
      const externalAccountName = organization.bankAccount.externalAccountName
      const extAccounts = await openPayments.getExternalAccounts(externalAccountName)
      const extAccount = extAccounts.externalAccounts

      if (extAccount) {
        const { externalAccountInfo } = extAccount[0]
        organization.bankAccount = {}
        organization.bankAccount.bankName = externalAccountInfo.bankName
        organization.bankAccount.owner = externalAccountInfo.payee
        organization.bankAccount.ibanCode = externalAccountInfo.ibanCode
        organization.bankAccount.swiftCode = externalAccountInfo.swiftCode
      }

      let projectList = await getProjects(organization.id)

      return res.send({
        account: {
          organization: organization,
          email: user.email,
          id: user.id
        },
        projects: projectList
      })

    })
  })(req, res, next)
})

module.exports = router
