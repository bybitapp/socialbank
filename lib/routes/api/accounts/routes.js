'use strict';

const express = require('express');
const Opc = require('open_payments_cloud_application_api');
const passport = require('passport');
const uuid = require('uuid/v1');
const Joi = require('joi')

const { User, Org } = require('lib/models');
const config = require('config');

const router = express.Router();
Opc.ApiClient.instance.basePath = config.opc.urlApi;

const {opc: { programmeKey, programmeId, username, password, ownerId, currency, country, issueProvider }} = config
const {opc: {profile: { managedCard, managedAccount, externalAccount, deposit, transfer }}} = config

// get information about token
const getToken = () => {
  const api = new Opc.AuthApi();
  const request = new Opc.LoginParams(programmeId, username, password)
  return api.authLogin(uuid(), programmeKey, request)
}

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

function createOrg (organization) {

  console.log(organization);
  const org = new Org(organization)

  return Org
    .findOne({ number: organization.number }).exec()
    .then((existingOrg) => {
      if (existingOrg) {
        console.error('errors', { msg: `Organization(${organization.number}) already exists.` });
        throw new Error('Org exists')
      }
      return org.save()
    })
}

// create account [External/Internal Account|mongoDB]
router.post('/register', async(req, res) => {
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

  const organization = {
    name: register.charityName,
    number: register.charityNumber,
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

  const user = new User({
    email: register.email,
    password: register.password
  });

  User
    .findOne({ email: register.email, status: 'active' }).exec()
    .then((existingUser) => {
      if (existingUser) {
        console.log('errors', { msg: 'Account with that email address already exists.' });
        return res.status(409).send(error)
      }
      return user.save()
    })
    .then(() => {
      return createOrg(organization)
      // return Promise.resolve()
    })
    .then(() => {
      console.log('success', { msg: 'Please check your inbox for an account activation email' });
      res.send(Object.assign({organization}, {
        email: register.email,
        password: register.password
      }))
    })
    .catch(err => next(err));
})

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
})

// login into system
router.post('/login', async(req, res, next) => {
  const { error, value } = Joi.validate(req.body, loginSchema)

  if (error) {
    res.status(409).send(error)
  }

  // TODO return account and projects

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

  let data = {
    account: {
      "organization": {
        "name": "SocialBank",
        "number": 43242342,
        "address": "Westminster City Hall 64 Victoria Street",
        "postcode": "SW1E 6QP",
        "city": "London",
        "bankAccount": {
          "owner": "James Smith",
          "bankName": "HSBC",
          "ibanCode": "GB15MIDL40051512345678",
          "swiftCode": "MIDLGB22",
          "branchCode": 22,
          "bankCode": "400515",
          "bankAccountNumber": "12345678",
          "externalAccountId": "0000000000000",
          "externalAccountName": "SOCIALBANK.6e4f5fc2-4779-11e7-84d8-8d9b75e28369"
        },
        "uuid": "6e4f5fc3-4779-11e7-84d8-8d9b75e28369"
      },
      "email": "seweryn@socialbank.co",
      "password": "password",
      "uuid": "6e4f5fc0-4779-11e7-84d8-8d9b75e28369",
      "organizationUUID": "6e4f5fc1-4779-11e7-84d8-8d9b75e28369"
    },
    projects: projects
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      console.log('errors', info);
      return res.sendStatus(404)
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.send(data)
    });
  })(req, res, next)
})

module.exports = router;
