'use strict'

const express = require('express')
const passport = require('passport')
const uuid = require('uuid/v1')

const openPayments = require('lib/external/open_payments')
const { User, Org } = require('lib/models')
const schema = require('./schema')

const router = express.Router()

function createOrg (organization) {
  console.log(organization)
  const org = new Org(organization)

  return Org
    .findOne({ number: organization.number }).exec()
    .then((existingOrg) => {
      if (existingOrg) {
        console.error('errors', { msg: `Organization(${organization.number}) already exists.` })
        throw new Error('Org exists')
      }
      return org.save()
    })
}

// create account [External/Internal Account|mongoDB]
router.post('/register', async(req, res, next) => {
  const { error, value } = schema.register(req.body)
  var register = value

  if (error) {
    res.status(409).send(error)
  }

  const organizationUUID = uuid()
  const externalName = 'SOCIALBANK.' + organizationUUID
  const externalAccount = await openPayments.createAccount(externalName, register)

  const organization = {
    name: register.charityName,
    number: register.charityNumber,
    address: register.address,
    postcode: register.postcode,
    city: register.city,
    bankAccount: {
      owner: register.accountOwner,
      externalAccountId: externalAccount.id.id,
      externalAccountName: externalName
    },
    uuid: organizationUUID
  }

  const user = new User({
    email: register.email,
    password: register.password
  })

  User
    .findOne({ email: register.email, status: 'active' }).exec()
    .then((existingUser) => {
      if (existingUser) {
        console.log('errors', { msg: 'Account with that email address already exists.' })
        return res.status(409).send(error)
      }
      return user.save()
    })
    .then(() => {
      return createOrg(organization)
      // return Promise.resolve()
    })
    .then(() => {
      console.log('success', { msg: 'Please check your inbox for an account activation email' })
      res.send(Object.assign({organization}, {
        email: register.email,
        password: register.password
      }))
    })
    .catch(err => next(err))
})

router.post('/login', async(req, res, next) => {
  const { error } = schema.login(req.body)
  if (error) {
    res.status(409).send(error)
  }

  // TODO return account and projects
  const externalAccounts = await openPayments.getAccount()

  let projects = externalAccounts.accounts.map((item, index) => {
    return {
      name: item.friendlyName,
      balance: {
        available: item.balances.available,
        reserved: item.balances.reserved,
        actual: item.balances.actual
      },
      created: item.creationTimestamp,
      id: item.id.id,
      cards: 12
    }
  })

  let data = {
    account: {
      'organization': {
        'name': 'SocialBank',
        'number': 43242342,
        'address': 'Westminster City Hall 64 Victoria Street',
        'postcode': 'SW1E 6QP',
        'city': 'London',
        'bankAccount': {
          'owner': 'James Smith',
          'bankName': 'HSBC',
          'ibanCode': 'GB15MIDL40051512345678',
          'swiftCode': 'MIDLGB22',
          'branchCode': 22,
          'bankCode': '400515',
          'bankAccountNumber': '12345678',
          'externalAccountId': '0000000000000',
          'externalAccountName': 'SOCIALBANK.6e4f5fc2-4779-11e7-84d8-8d9b75e28369'
        },
        'uuid': '6e4f5fc3-4779-11e7-84d8-8d9b75e28369'
      },
      'email': 'seweryn@socialbank.co',
      'password': 'password',
      'uuid': '6e4f5fc0-4779-11e7-84d8-8d9b75e28369',
      'organizationUUID': '6e4f5fc1-4779-11e7-84d8-8d9b75e28369'
    },
    projects: projects
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) {
      console.log('errors', info)
      return res.sendStatus(404)
    }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      return res.send(data)
    })
  })(req, res, next)
})

module.exports = router
