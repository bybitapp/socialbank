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
  maxNumberOfLoads: Joi.number().integer(),
  maxNumberOfSpends: Joi.number().integer(),
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
  try {

    const {token} = await getToken()
    const correlationId = uuid()

    // const api = new Opc.ManagedCardsApi()
    // const request = new Opc.ManagedCardsFilter({
    //   profileId: managedAccount,
    //   programmeId,
    //   ownerId
    // });

    // TODO: GET PROJECT MANAGED CARDS ID LIST (something stored on DB)
    const projectCardIdList = [];

    // TODO: REQUEST CARDS FROM THE IXARIS API
    const projectCardList = [];
    /*
    await Promise.all(projectCardIdList.map(async (virtualCardId)=>{
      const response = await api.managedCardsIdGet(virtualCardId, correlationId, programmeKey, token, request)
      projectCardList.push(response);
    }))
    */

    // TODO: PARSE CARDS INTO SOCIAL BANK VIRTUAL CARDS
    /*
    let cards = projectCardList.map((item, index) => {
      return {
        state: item.state,
        name: item.friendlyName,
        nameOnCard: item.nameOnCard,
        cardBrand: item.cardBrand,
        cardNumber: item.cardNumber,
        expiryPeriod:item.expiryPeriod,
        currentNumberOfLoads: item.currentNumberOfLoads,
        maxNumberOfLoads: item.maxNumberOfLoads,
        currentNumberOfSpends: item.currentNumberOfSpends,
        maxNumberOfSpends: item.maxNumberOfSpends,
        balances: item.balances,
        startDate: item.startDate,
        endDate: item.endDate
      }
    }
    */

    // TEMPORARY: START
    const result = cards.filter((card)=>(card.projectId == req.params.projectId))
    // TEMPORARY: END

    return res.send(result);
  } catch (err) {
    console.error(err)
    return res.send(err)
  }

})

module.exports = router;
