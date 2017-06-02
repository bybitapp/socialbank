require('dotenv').config()

const express = require('express')
const uuid = require('uuid/v1');
const path = require('path');

const config = require('./config');

var Opc = require('open_payments_cloud_application_api');
Opc.ApiClient.instance.basePath = config.opc.urlApi;

const middleware = require('src/middleware');
const bodyParser = require('body-parser')
const Joi = require('joi')
const cors = require('cors')

const {opc: { programmeKey, programmeId, username, password, ownerId, currency, country, issueProvider }} = config
const {opc: {profile: { managedCard, managedAccount, externalAccount, deposit, transfer }}} = config

const server = express()

server.enable("trust proxy");

server.use(middleware.ensureHttps());
server.use(bodyParser.json())
server.use(cors())
server.use(express.static('./build'));

// get information about token
const getToken = () => {
    const api = new Opc.AuthApi();
    const request = new Opc.LoginParams(programmeId, username, password)
    return api.authLogin(uuid(), programmeKey, request)
}

// get managed accounts
server.get('/api/project/list', async(req, res) => {
    try {

      const {token} = await getToken()
      const correlationId = uuid()

      const api = new Opc.ManagedAccountsApi()
      const request = new Opc.ManagedAccountsFilter({
        profileId: managedAccount,
        programmeId,
        ownerId
      });

      const response = await api.managedAccountsGet(correlationId, programmeKey, token, request)

      let projects = response.accounts.map((item, index) => {
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
        }
      )

      return res.send(projects);
    } catch (err) {
        console.error(err)
        return res.send(err)
    }
})

server.get('/api/card/list', async(req, res) => {
  console.log('GET api/cards');
  return res.send([{'test': "test text"}]);
})

server.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});

const registrationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  charityName: Joi.string().min(3).max(30).required(),
  charityNumber: Joi.number().integer().required(),
  address: Joi.string().min(6).required(),
  postcode: Joi.string().regex(/^[a-zA-Z]{1,2}([0-9]{1,2}|[0-9][a-zA-Z])\s*[0-9][a-zA-Z]{2}$/).required(),
  city: Joi.string().min(3).required(),
  accountOwner: Joi.string().min(3).required(),
  bankName: Joi.string().min(3).required(),
  ibanCode: Joi.string().regex(/^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/).required(),
  swiftCode: Joi.string().regex(/^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/).required(),
})

// create account [External/Internal Account|mongoDB]
server.post('/api/account/register', async(req, res) => {
    try {

        const { error, value } = Joi.validate(req.body, registrationSchema)
        var register = value

        if (error) {
            res.status(409).send(error)
        }

        const {token} = await getToken()
        const correlationId = uuid()
        const organizationUUID = uuid()
        const accountUUID = uuid()

        // create external account
        const api = new Opc.ExternalAccountsApi();
        const externalName = 'SOCIALBANK.' + organizationUUID;
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
        );
        const response = await api.externalAccountsIdCreate(correlationId, programmeKey, token, request)

        let account = {
          email: register.email,
          password: register.password,
          uuid: accountUUID,
          organizationUUID
        }

        // TODO save all data with account ID in noSQL database
        console.log(account);

        const organization = {
          name: register.charityName,
          number: register. charityNumber,
          address: register.address,
          postcode: register.postcode,
          city: register.city,
          bankAccount: {
            owner: register.accountOwner,
            bankName: register.bankName,
            ibanCode: register.ibanCode,
            swiftCode: register.swiftCode,
            branchCode,
            bankCode,
            bankAccountNumber,
            externalAccountId: response.id.id,
            externalAccountName: externalName
          },
          uuid: organizationUUID
        }

        // TODO save all data with account ID in noSQL database
        console.log(organization);

        account = Object.assign({organization}, account)

        return res.send(account)
    } catch (err) {
        console.error(err)
        return res.status(409).send(err)
    }
})

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

// login into system
server.post('/api/account/login', async(req, res) => {
    try {

        const { error, value } = Joi.validate(req.body, loginSchema)
        var login = value

        if (error) {
            res.status(409).send(error)
        }

        // TEMPORARY: START
        let account = {
          email: 'james.smith@socialbank.co',
          password: 'password',
          uuid: uuid(),
          organizationUUID: uuid()
        }

        // TODO save all data with account ID in noSQL database
        //console.log(account);

        const organization = {
          name: 'SocialBank',
          number: 43242342,
          address: 'Westminster City Hall 64 Victoria Street',
          postcode: 'SW1E 6QP',
          city: 'London',
          bankAccount: {
            owner: 'James Smith',
            bankName: 'HSBC',
            ibanCode: 'GB15MIDL40051512345678',
            swiftCode: 'MIDLGB22',
            branchCode: 22,
            bankCode: '400515',
            bankAccountNumber: '12345678',
            externalAccountId: 0000000000000,
            externalAccountName: 'SOCIALBANK.' + uuid()
          },
          uuid: uuid()
        }
        // TEMPORARY: END

        account = Object.assign({organization}, account)
        console.log(account);
        return res.send(account)
    } catch (err) {
        console.error(err)
        return res.status(409).send(err)
    }
})

const projectSchema = Joi.object().keys({
  name: Joi.string().min(5).required(),
  description: Joi.string(),
  organizationUUID: Joi.string()
})

// create account [Managed Account]
server.post('/api/project/add', async(req, res) => {
    try {

        const { error, value } = Joi.validate(req.body, projectSchema)
        let project = value

        if (error) {
            res.status(409).send(error)
        }

        const {token} = await getToken()
        const correlationId = uuid()
        const projectUUID = uuid()

        // create managed account
        const api = new Opc.ManagedAccountsApi();
        const managedName = 'SOCIALBANK.' + project.organizationUUID + '.' + projectUUID
        const request = new Opc.CreateManagedAccountParams(
            managedAccount,
            ownerId,
            managedName,
            currency,
            issueProvider
        );
        const response = await apiManaged.managedAccountsIdCreate(correlationId, programmeKey, token, request)

        project = Object.assign({
            managedAccountId: response.id.id,
            managedAccountName: managedName,
            managedAccountCreated: response.creationTimestamp,
            uuid: projectUUID,
            organizationUUID: project.organizationUUID
        }, project)

        // TODO save all data with project ID in noSQL database
        console.log(project);

        return res.send(project)
    } catch (err) {
        console.error(err)
        return res.status(409).send(err)
    }
})


server.listen(config.general.port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + config.general.port)
})
