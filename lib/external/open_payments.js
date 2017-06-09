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
  // TODO workaround issue with orginal object
  const request = Opc.ExternalAccountFilter.constructFromObject({
    profileId: managedAccount,
    programmeId: programmeId,
    ownerId: ownerId,
    friendlyName: friendlyName
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

  const api = new Opc.ManagedAccountsApi()
  const request = new Opc.CreateManagedAccountParams(
    managedAccount,
    ownerId,
    managedName,
    currency,
    issueProvider
  )

  return api.managedAccountsIdCreate(correlationId, programmeKey, token, request)
}

exports.createDeposit = async function createDeposit (value, extId, managedId) {
  const { token } = await getToken()
  const correlationId = uuid()

  const amount = {currency, amount: (value * 100)}

  // TODO pay in simulator, only for testing
  const apiTest = new Opc.PayinSimulatorApi()
  const requestTest = new Opc.CreatePayinSimulationParams(amount, extId, 'SOCIALBANK-TEST-PAYIN')
  const payin = await apiTest.payinSimulatorIdPayin(correlationId, programmeKey, token, requestTest)

  const api = new Opc.DepositsApi()
  const sourceInstrumentId = {id: extId, type: 'external_accounts'}
  const destinationInstrumentId = {id: managedId, type: 'managed_accounts'}
  const request = new Opc.CreateExternalAccountDepositParams(
    deposit,
    amount,
    sourceInstrumentId,
    payin.id,
    destinationInstrumentId
  )

  return api.depositsIdCreateFromExternalAccount(correlationId, programmeKey, token, request)
}

exports.getManagedCards = async function getManagedCards () {
  const {token} = await getToken()
  const correlationId = uuid()

  const api = new Opc.ManagedCardsApi()
  const request = new Opc.ManagedCardFilter({
    profileId: managedCard,
    programmeId,
    ownerId
  })

  return api.managedCardsGet(correlationId, programmeKey, token, request)
}
