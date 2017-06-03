'use strict';

const config = require('config');
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

const cardSchema = Joi.object().keys({
  nameOnCard: Joi.string().min(5).required(),
  maxNumberOfLoads: Joi.integer(),
  maxNumberOfSpends: Joi.integer(),
  projectUUID: Joi.string().required()
})

// TEMPORARY: START
const cards = [{
  projectId:98046814839373820,
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
  projectId:98046823654948860,
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
  projectId:98046823654948860,
  state: "PRE_ACTIVE",
  nameOnCard: "Adams Smith",
  cardBrand: "VISA",
  cardNumber: "2222.3232.1212.2222",
  expiryPeriod:{
    periodLength: 2,
    timeUnit: "YEAR"
  },
  currentNumberOfLoads: 2,
  maxNumberOfLoads: 5,
  currentNumberOfSpends: 36,
  maxNumberOfSpends: 40
},
{
  projectId:98046823654948860,
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
  projectId:98046823654948860,
  state: "PRE_DESTROYED",
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
  projectId:98046823654948860,
  state: "ACTIVE",
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

router.get('/list/project/:projectId', async(req, res) => {
  const result = cards.filter((card)=>(card.projectId == req.params.projectId))
  return res.send(result);
})

module.exports = router;
