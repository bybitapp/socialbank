'use strict';

const express = require('express');
const Opc = require('open_payments_cloud_application_api');
const passport = require('passport');
const uuid = require('uuid/v1');
const Joi = require('joi')

const User = require('lib/models/User');
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

// create account [External/Internal Account|mongoDB]
router.post('/register', async(req, res) => {
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
router.post('/login', (req, res, next) => {
  const { error, value } = Joi.validate(req.body, loginSchema)

  if (error) {
    res.status(409).send(error)
  }

  return res.send()

  // passport.authenticate('local', (err, user, info) => {
  //   if (err) { return next(err); }
  //   if (!user) {
  //     console.log('errors', info);
  //     return res.sendStatus(404)
  //   }
  //   req.logIn(user, (err) => {
  //     if (err) { return next(err); }
  //     res.redirect(req.session.returnTo || '/');
  //   });
  // })(req, res, next)
})

module.exports = router;
