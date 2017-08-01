const uuid = require('uuid/v1')
const errors = require('lib/errors')
const logger = require('lib/logger')
const openPayments = require('lib/external/open_payments')
const { Org, Bank } = require('lib/models')
const schema = require('./schema')

exports.find = async function find (req, res) {
  const organization = await Org.findOne({ users: req.user.id }).exec()
  if (!organization) {
    return res.send(204)
  }

  const bank = await Bank.findOne({ organization: organization.id }).exec()
  if (!bank) {
    return res.send(204)
  }

  const externalAccountName = bank.externalAccountName
  const extAccounts = await openPayments.getExternalAccounts(externalAccountName)
  if (extAccounts.externalAccounts) {
    const { externalAccountInfo } = extAccounts.externalAccounts[0]
    return res.send({
      id: bank.id,
      bankName: externalAccountInfo.bankName,
      owner: externalAccountInfo.payee,
      ibanCode: externalAccountInfo.ibanCode,
      swiftCode: externalAccountInfo.swiftCode
    })
  }
}

exports.create = async function create (req, res) {
  const { error, value } = schema.bank(req.body)
  if (error) {
    throw new errors.ValidationError(error)
  }

  const organization = await Org.findOne({ users: req.user.id }).exec()
  if (!organization) {
    const errorMsg = 'No Found Organization'
    throw new errors.ConflictError(errorMsg)
  }

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
    bankName: externalAccountInfo.bankName,
    owner: externalAccountInfo.payee,
    ibanCode: externalAccountInfo.ibanCode,
    swiftCode: externalAccountInfo.swiftCode
  })
}

exports.findAll = async function findAll (req, res) {
  const organization = await Org.findOne({ users: req.user.id }).exec()
  if (organization) {
    const banks = await Bank.find({ organization: organization.id }).exec()

    if (banks && banks.length > 0) {
      const promises = banks.map(async (bank) => {
        const externalAccountName = bank.externalAccountName
        const extAccounts = await openPayments.getExternalAccounts(externalAccountName)
        if (extAccounts.externalAccounts) {
          const { externalAccountInfo } = extAccounts.externalAccounts[0]
          return {
            id: bank.id,
            bankName: externalAccountInfo.bankName,
            owner: externalAccountInfo.payee,
            ibanCode: externalAccountInfo.ibanCode,
            swiftCode: externalAccountInfo.swiftCode
          }
        }
      })

      const result = await Promise.all(promises)

      return res.send(result)
    }
  }
  return res.send([])
}

exports.remove = async function remove (req, res) {
  const { error, value } = schema.remove(req.body)
  if (error) {
    throw new errors.ValidationError(error)
  }

  const bank = await Bank.findOne({ _id: value.bid }).exec()

  if (!bank) {
    throw new errors.NotFoundError('Bank account not found')
  }

  bank.remove()

  return res.send({
    msg: 'success',
    bankId: bank.id
  })
}
