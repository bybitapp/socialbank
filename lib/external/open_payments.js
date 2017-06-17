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

exports.getManagedAccounts = async function getManagedAccounts (friendlyName) {
  const {token} = await getToken()
  const correlationId = uuid()

  const api = new Opc.ManagedAccountsApi()
  let params = {
    profileId: managedAccount,
    programmeId,
    ownerId
  }

  if (friendlyName) {
    params["friendlyName"] = friendlyName
  }

  const request = Opc.ManagedAccountsFilter.constructFromObject(params)
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

exports.getManagedAccountStatement = async function getManagedAccountStatement (projectId) {
  const {token} = await getToken()
  const correlationId = uuid()

  const api = new Opc.ManagedAccountsApi()
  const request = new Opc.GetManagedAccountStatementRequestParams()

  return api.managedAccountsIdStatementGet(projectId, correlationId, programmeKey, token, request)
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

exports.getManagedCards = async function getManagedCards (friendlyName) {
  const {token} = await getToken()
  const correlationId = uuid()

  const api = new Opc.ManagedCardsApi()
  const request = Opc.ManagedCardFilter.constructFromObject({
    profileId: managedCard,
    programmeId,
    ownerId,
    friendlyName
  })

  return api.managedCardsGet(correlationId, programmeKey, token, request)
}

exports.getManagedCardStatement = async function getManagedCardStatement (cardId) {
  const {token} = await getToken()
  const correlationId = uuid()

  const api = new Opc.ManagedCardsApi()
  const request = new Opc.GetManagedCardStatementRequestParams()

  return api.managedCardsIdStatementGet(cardId, correlationId, programmeKey, token, request)
}

exports.createCard = async function createCard () {
  const {token} = await getToken()
  const correlationId = uuid()
  const friendlyName = 'SOCIALBANK.' + uuid()

  // create card
  const api = new Opc.ManagedCardsApi()
  const request = new Opc.CreateManagedCardParams(
    managedCard,
    ownerId,
    friendlyName,
    currency,
    issueProvider,
    'processingProvider'
  );

  return api.managedCardsIdCreate(correlationId, programmeKey, token, request)
}

exports.blockCard = async function blockCard(id) {
  const {token} = await getToken()
  const correlationId = uuid()
  const intentId = "1" // This field is reserved for future use, and any value can be passed for the time being.

  // block card
  const api = new Opc.ManagedCardsApi()

  var request = new Opc.BlockManagedCardParams(intentId, {blockType : "OPERATOR"})

  return api.managedCardsIdBlock(id, correlationId, programmeKey, token, request)
}


exports.unblockCard = async function unblockCard(id) {
  const {token} = await getToken()
  const correlationId = uuid()
  const intentId = "1" // This field is reserved for future use, and any value can be passed for the time being.

  // unblock card
  const api = new Opc.ManagedCardsApi()

  // TODO: NO_BLOCK should work, but getting field required instead
  var request = new Opc.UnblockManagedCardParams(intentId, {blockType : "NO_BLOCK"})

  return api.managedCardsIdUnblock(id, correlationId, programmeKey, token, request)
}

exports.destroyCard = async function destroyCard(id) {
  const {token} = await getToken()
  const correlationId = uuid()
  const intentId = "1" // This field is reserved for future use, and any value can be passed for the time being.

  // destroy card
  const api = new Opc.ManagedCardsApi()

  // TODO: Validate if destroyType is correct
  var request = new Opc.DestroyManagedCardParams(intentId, "OPERATOR")

  return api.managedCardsIdDestroy(id, correlationId, programmeKey, token, request)
}

exports.createTransfer = async function createDeposit (value, managedId, cardId) {
  const { token } = await getToken()
  const correlationId = uuid()

  const amount = {currency, amount: (value * 100)}

  const api = new Opc.TransfersApi()
  const sourceInstrumentId = {id: managedId, type: 'managed_accounts'}
  const destinationInstrumentId = {id: cardId, type: 'managed_cards'}
  const request = new Opc.CreateTransferParams(
    transfer,
    amount,
    sourceInstrumentId,
    destinationInstrumentId
  )

  return api.transfersIdCreate(correlationId, programmeKey, token, request)
}
