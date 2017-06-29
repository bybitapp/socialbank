'use strict'

const express = require('express')

const openPayments = require('lib/external/open_payments')
const { Org, Bank } = require('lib/models')
const schema = require('./schema')
const uuid = require('uuid/v1')

const router = express.Router()

// get  bank account
router.get('/get', async (req, res, next) => {
  let organization = await Org.findOne({ users: req.user.id }).exec()
  if (organization) {
    let bank = await Bank.findOne({ organization: organization.id }).exec()
    if (bank) {
      const externalAccountName = bank.externalAccountName
      const extAccounts = await openPayments.getExternalAccounts(externalAccountName)

      if (extAccounts.externalAccounts) {
        const { externalAccountInfo } = extAccounts.externalAccounts[0]
        return res.send({
          id: bank.id,
          bankName: externalAccountInfo.payee,
          owner: externalAccountInfo.name,
          ibanCode: externalAccountInfo.ibanCode,
          swiftCode: externalAccountInfo.swiftCode
        })
      }
    }
  }

  return res.send()
})

// get list of organizations
router.post('/add', async (req, res, next) => {
  const { error, value } = schema.bank(req.body)

  if (error) {
    return res.status(409).send(error)
  }

  // create org
  let organization = await Org.findOne({ users: req.user.id }).exec()
  if (!organization) {
    const error = { msg: 'No Found Organization' }
    console.log('errors', error)
    return res.status(409).send(error)
  }

  // send request to API
  const externalName = 'SOTEC.' + uuid()
  const externalAccount = await openPayments.createAccount(externalName, value)

  let bank = new Bank({
    name: value.bankName,
    externalAccountId: externalAccount.id.id,
    externalAccountName: externalAccount.friendlyName,
    organization: organization.id
  })

  await bank.save()

  const { externalAccountInfo } = externalAccount

  return res.send({
    id: bank.id,
    bankName: externalAccountInfo.payee,
    owner: externalAccountInfo.name,
    ibanCode: externalAccountInfo.ibanCode,
    swiftCode: externalAccountInfo.swiftCode
  })
})

module.exports = router
