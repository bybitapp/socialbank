'use strict';

const config = require('config');
const Opc = require('open_payments_cloud_application_api');
Opc.ApiClient.instance.basePath = config.opc.urlApi;
const { Card, Project } = require('lib/models')
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
  nameOnCard: Joi.string().min(5).max(30).required(),
  friendlyName: Joi.string().min(5).max(30).required(),
  projectId: Joi.string().required()
})

router.post('/add', async(req, res) => {
    try {
      const { error, value } = Joi.validate(req.body, cardSchema)
      let card = value
      console.log(card)
      if (error) {
        res.status(409).send(error)
      }

      const {token} = await getToken()

      const correlationId = uuid()
      const projectId = card.projectId
      const friendlyName = card.friendlyName
      const nameOnCard = card.nameOnCard

      // create card
      const api = new Opc.ManagedCardsApi()
      const request = new Opc.CreateManagedCardParams(
        managedCard,
        ownerId,
        friendlyName,
        currency,
        issueProvider,
        'processingProvider',
        nameOnCard // TODO: verify why OPC ignored this field
      );

      const response = await api.managedCardsIdCreate(correlationId, programmeKey, token, request)

      card = Object.assign({
        projectId: projectId
      }, response)

      // TODO save the card's project ID relationship in noSQL database
      console.log(card);

      return res.send(card)
    } catch (err) {
      console.error(err)
      return res.status(409).send(err)
    }
});

router.get('/list/p/:projectId', async(req, res) => {
  try {

    const {token} = await getToken()
    const correlationId = uuid()
    const projectId = req.params.projectId

    const api = new Opc.ManagedCardsApi()
    const request = new Opc.ManagedCardsFilter({
      profileId: managedCard,
      programmeId,
      ownerId
    });

    // TODO: GET PROJECT MANAGED CARDS ID LIST (something stored on DB)
    const projectCardIdList = await Card.find({ project: projectId }).exec();

    // TODO: REQUEST CARDS FROM THE IXARIS API
    const projectCardList = [];

    await Promise.all(projectCardIdList.map(async (virtualCardId)=>{
      const response = await api.managedCardsIdGet(virtualCardId, correlationId, programmeKey, token, request)
      projectCardList.push(response);
    }))


    // TODO: PARSE CARDS INTO SOCIAL BANK VIRTUAL CARDS
    let cards = projectCardList.map((item, index) => {
      return {
        state: item.state,
        name: item.friendlyName,
        nameOnCard: item.nameOnCard,
        cardBrand: item.cardBrand,
        cardNumber: item.cardNumber,
        expiryPeriod:item.expiryPeriod,
        currentNumberOfLoads: item.currentNumberOfLoads,
        maxNumberOfLoads: item.maxNumberOfLoads.value,
        currentNumberOfSpends: item.currentNumberOfSpends,
        maxNumberOfSpends: item.maxNumberOfSpends.value,
        balances: item.balances,
        startDate: item.startDate,
        endDate: item.endDate
      }
    })

    // TEMPORARY: START
    //const result = cards.filter((card)=>(card.projectId == req.params.projectId))
    // TEMPORARY: END

    return res.send(result);
  } catch (err) {
    console.error(err)
    return res.send(err)
  }

})

module.exports = router;
