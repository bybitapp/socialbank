const uuid = require('uuid/v1')

const openPayments = require('lib/external/open_payments')
const { Org, Bank } = require('lib/models')
const schema = require('./schema')

exports.find = async function find (req, res) {
  const organization = await Org.findOne({ users: req.user.id }).exec()
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
}

exports.create = async function create (req, res) {
  const { error, value } = schema.bank(req.body)

  if (error) {
    return res.status(409).send(error)
  }

  const organization = await Org.findOne({ users: req.user.id }).exec()
  if (!organization) {
    const error = { msg: 'No Found Organization' }
    console.log('errors', error)
    return res.status(409).send(error)
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
    bankName: externalAccountInfo.payee,
    owner: externalAccountInfo.name,
    ibanCode: externalAccountInfo.ibanCode,
    swiftCode: externalAccountInfo.swiftCode
  })
}
