'use strict';

const config = require('../config');
const Opc = require('open_payments_cloud_application_api');
Opc.ApiClient.instance.basePath = config.opc.urlApi;

const express = require('express');
const uuid = require('uuid/v1');
const Joi = require('joi')
const router = express.Router();

const {opc: { programmeKey, programmeId, username, password, ownerId, currency, country, issueProvider }} = config
const {opc: {profile: { managedCard, managedAccount, externalAccount, deposit, transfer }}} = config

// get information about token
const getToken = () => {
    const api = new Opc.AuthApi();
    const request = new Opc.LoginParams(programmeId, username, password)
    return api.authLogin(uuid(), programmeKey, request)
}

// TEMPORARY: START
const cards = [{
  id:1,
  state: "ACTIVE",
  nameOnCard: "John Due",
  cardBrand: "MASTERCARD",
  cardNumber: "5555.3232.1212.2222",
  expiryPeriod:{
    periodLength: 3,
    timeUnit: "MONTH"
  },
  currentNumberOfLoads: 5,
  maxNumberOfLoads: 23,
  currentNumberOfSpends: 10,
  maxNumberOfSpends: 20
},
{
  id: 2,
  state: "DESTROYED",
  nameOnCard: "John Smith",
  cardBrand: "VISA",
  cardNumber: "5555.3232.1212.2222",
  expiryPeriod:{
    periodLength: 1,
    timeUnit: "YEAR"
  },
  currentNumberOfLoads: 2,
  maxNumberOfLoads: 5,
  currentNumberOfSpends: 36,
  maxNumberOfSpends: 40
},
{
  id: 3,
  state: "PRE_ACTIVE",
  nameOnCard: "Adam Smith",
  cardBrand: "VISA",
  cardNumber: "7777.3232.1212.2222",
  expiryPeriod:{
    periodLength: 2,
    timeUnit: "YEAR"
  },
  currentNumberOfLoads: 2,
  maxNumberOfLoads: 5,
  currentNumberOfSpends: 36,
  maxNumberOfSpends: 40
}];
// TEMPORARY: END

router.post('/add', async(req, res) => {
    try {
      return res.send(cards[0])
    } catch (err) {
      console.error(err)
      return res.status(409).send(err)
    }
});

router.get('/list', async(req, res) => {
  return res.send(cards);
})

module.exports = router;