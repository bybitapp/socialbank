const Opc = require('open_payments_cloud_application_api')
const uuid = require('uuid/v1')

const config = require('config')

Opc.ApiClient.instance.basePath = config.opc.urlApi

const {opc: { programmeKey, programmeId, username, password, ownerId, currency, country, issueProvider }} = config
const {opc: {profile: { managedCard, managedAccount, externalAccount, deposit, transfer }}} = config

function getToken () {
  const api = new Opc.AuthApi()
  const request = new Opc.LoginParams(programmeId, username, password)
  return api.authLogin(uuid(), programmeKey, request)
}

exports.createAccount = async function createAccount (externalName, register) {
  const { token } = await getToken()
  const correlationId = uuid()

  // create external account
  const api = new Opc.ExternalAccountsApi()
  const branchCode = register.swiftCode.substring(6)
  const bankCode = register.ibanCode.substring(8, 14)
  const bankAccountNumber = register.ibanCode.substring(15)

  const request = new Opc.CreateExternalAccountParams(
    externalAccount,
    ownerId,
    externalName, {
      bankAccountNumber,
      payee: register.accountOwner,
      bankName: register.bankName,
      bankCode,
      branchCode,
      ibanCode: register.ibanCode,
      swiftCode: register.swiftCode,
      country,
      currency
    }
  )

  return api.externalAccountsIdCreate(correlationId, programmeKey, token, request)
}

exports.getExternalAccounts = async function getExternalAccounts (friendlyName) {
  const {token} = await getToken()
  const correlationId = uuid()

  const api = new Opc.ExternalAccountsApi()
  const request = new Opc.ExternalAccountFilter({
    profileId: managedAccount,
    programmeId,
    ownerId,
    friendlyName
  });

  return api.externalAccountsGet(correlationId, programmeKey, token, request)
}

exports.getManagedAccounts = async function getManagedAccounts () {
  const {token} = await getToken()
  const correlationId = uuid()

  const api = new Opc.ManagedAccountsApi()
  const request = new Opc.ManagedAccountsFilter({
    profileId: managedAccount,
    programmeId,
    ownerId
  });

  return api.managedAccountsGet(correlationId, programmeKey, token, request)
}

exports.createManagedAccount = async function createManagedAccount (managedName) {
  const { token } = await getToken()
  const correlationId = uuid()

  const api = new Opc.ManagedAccountsApi();
  const request = new Opc.CreateManagedAccountParams(
    managedAccount,
    ownerId,
    managedName,
    currency,
    issueProvider
  )

  return api.managedAccountsIdCreate(correlationId, programmeKey, token, request)
}