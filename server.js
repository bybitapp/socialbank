require('dotenv').config()

const express = require('express')
const uuid = require('uuid/v1');
const path = require('path');

const config = require('./config');

var Opc = require('open_payments_cloud_application_api');
Opc.ApiClient.instance.basePath = config.opc.urlApi;

const bodyParser = require('body-parser')
const Joi = require('joi')
const cors = require('cors')

const {opc: { programmeKey, programmeId, username, password, ownerId, currency, country, issueProvider }} = config
const {opc: {profile: { managedCard, managedAccount, externalAccount, deposit, transfer }}} = config

const server = express()
server.use(bodyParser.json())
server.use(cors())
server.use(express.static('./build'));

// get information about token
const getToken = () => {
    const api = new Opc.AuthApi();
    const request = new Opc.LoginParams(programmeId, username, password)
    return api.authLogin(uuid(), programmeKey, request)
}

// TEMPORARY: BEGIN
var projects = [{
    id: 1,
    name: 'Human Rights Watch',
    description: '',
    funds: '£14.000',
    icon: 'functions',
    lat: 51.522,
    lng: -0.089
}, {
    id: 2,
    name: 'Do Something',
    description: '',
    funds: '£55.000',
    icon: 'person',
    lat: 51.52,
    lng: -0.08
}, {
    id: 3,
    name: 'World Wildlife Fund',
    description: '',
    funds: '£22.000',
    icon: 'star',
    lat: 51.52,
    lng: -0.082
}, {
    id: 4,
    name: 'Caritas',
    description: '',
    funds: '£5.000',
    icon: 'star',
    lat: 51.523,
    lng: -0.085
}];
const getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    // TEMPORARY: END

// create a request for funds
server.get('/api/projects', async(req, res) => {
    try {
        return res.send(projects);
    } catch (err) {
        console.error(err)
        return res.send(err)
    }
})


server.get('/api/cards', async(req, res) => {
  console.log('GET api/cards');
  return res.send([{'test': "test text"}]);
})

server.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './build', 'index.html'));
});

// create a request for funds
server.post('/api/project', async(req, res) => {
    try {
        // TEMPORARY: BEGIN
        const project = {
            id: projects.length + 1,
            funds: '£0.00',
            icon: 'star',
            lat: '51.52' + getRandomInt(0, 9),
            lng: '-0.082' + getRandomInt(0, 9),
            name: req.body.name,
            description: req.body.description
        }
        projects.push(project);
        // TEMPORARY: END
        return res.send(project)
    } catch (err) {
        console.error(err)
        return res.send(err)
    }
})

const registrationSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    charityName: Joi.string().min(3).max(30).required(),
    address: Joi.string().min(6).required(),
    postcode: Joi.string().regex(/^[a-zA-Z]{1,2}([0-9]{1,2}|[0-9][a-zA-Z])\s*[0-9][a-zA-Z]{2}$/).required(),
    city: Joi.string().min(3).required(),
    accountOwner: Joi.string().min(3).required(),
    bankName: Joi.string().min(3).required(),
    ibanCode: Joi.string().regex(/^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/).required(),
    swiftCode: Joi.string().regex(/^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/).required(),
})

// create account [External/Managed Account]
server.post('/api/account', async(req, res) => {
    try {

        const { error, value } = Joi.validate(req.body, registrationSchema)
        var account = value

        if (error) {
            res.status(409).send(error)
        }

        const {token} = await getToken()
        const correlationId = uuid()

        // create managed account
        const apiManaged = new Opc.ManagedAccountsApi();
        const requestManager = new Opc.CreateManagedAccountParams(
            managedAccount,
            ownerId,
            account.charityName,
            currency,
            issueProvider
        );
        const responseManaged = await apiManaged.managedAccountsIdCreate(correlationId, programmeKey, token, requestManager)

        account['managedAccount'] = []
        account['managedAccount'].push({
            id: responseManaged.id.id,
            created: responseManaged.creationTimestamp,
            name: account.charityName
        })

        // create external account
        const apiExternal = new Opc.ExternalAccountsApi();
        const externalName = account.charityName + '-' + account.bankName + '-' + account.accountOwner;
        const branchCode = account.swiftCode.substring(6)
        const bankCode = account.ibanCode.substring(8, 14)
        const bankAccountNumber = account.ibanCode.substring(15)

        const requestExternal = new Opc.CreateExternalAccountParams(
            externalAccount,
            ownerId,
            externalName, {
                bankAccountNumber,
                payee: account.accountOwner,
                bankName: account.bankName,
                bankCode,
                branchCode,
                ibanCode: account.ibanCode,
                swiftCode: account.swiftCode,
                country,
                currency
            }
        );
        const responseExternal = await apiExternal.externalAccountsIdCreate(correlationId, programmeKey, token, requestExternal)

        Object.assign({
            externalAccountId: responseExternal.id.id,
            externalAccountName: externalName,
            branchCode
            bankCode
            bankAccountNumber
        }, account)

        // TODO save all data with account ID in noSQL database
        console.log(account);

        return res.send(account)
    } catch (err) {
        console.error(err)
        return res.status(409).send(err)
    }
})


server.listen(config.general.port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + config.general.port)
})
