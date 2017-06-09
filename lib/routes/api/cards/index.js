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

      if (error) {
        res.status(409).send(error)
      }

      const {token} = await getToken()

      const correlationId = uuid()
      const projectId = value.projectId
      const friendlyName = value.friendlyName
      const nameOnCard = value.nameOnCard

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

      const card = await api.managedCardsIdCreate(correlationId, programmeKey, token, request)

      // create virtual card
      const newVirtualCard = new Card({
        managedCardId: card.id.id,
        project: projectId,
        nameOnCard: nameOnCard,
        friendlyName: friendlyName
      })

      await newVirtualCard.save()

      return res.send({
        id: newVirtualCard.id,
        project: newVirtualCard.project,
        name: newVirtualCard.friendlyName,
        nameOnCard: newVirtualCard.nameOnCard,
        state: card.state,
        cardBrand: card.cardBrand,
        cardNumber: card.cardNumber,
        expiryPeriod:card.expiryPeriod,
        currentNumberOfLoads: card.currentNumberOfLoads,
        maxNumberOfLoads: card.maxNumberOfLoads,
        currentNumberOfSpends: card.currentNumberOfSpends,
        maxNumberOfSpends: card.maxNumberOfSpends,
        balances: card.balances,
        startDate: card.startDate,
        endDate: card.endDate
      })
    } catch (err) {
      console.error(err)
      return res.status(409).send(err)
    }
})

router.get('/list/p/:projectId', async(req, res) => {
  try {

    const {token} = await getToken()
    const correlationId = uuid()
    const projectId = req.params.projectId

    const api = new Opc.ManagedCardsApi()
    const request = new Opc.ManagedCardFilter({
      profileId: managedCard,
      programmeId,
      ownerId
    })

    const virtualCardList = await Card.find({ project: projectId }).exec()

    const managedCardList = await api.managedCardsGet(correlationId, programmeKey, token, request)

    // Filter managed cards and parse to virtual cards
    const cardList = managedCardList.cards.reduce((acc, card) => {
      const virtualCard = virtualCardList.find((virtualCard) => virtualCard.friendlyName === card.friendlyName)
      if(virtualCard) {
        acc.push({
          id: virtualCard.id,
          project: virtualCard.project,
          name: virtualCard.friendlyName,
          nameOnCard: virtualCard.nameOnCard,
          state: card.state,
          cardBrand: card.cardBrand,
          cardNumber: card.cardNumber,
          expiryPeriod:card.expiryPeriod,
          currentNumberOfLoads: card.currentNumberOfLoads,
          maxNumberOfLoads: card.maxNumberOfLoads,
          currentNumberOfSpends: card.currentNumberOfSpends,
          maxNumberOfSpends: card.maxNumberOfSpends,
          balances: card.balances,
          startDate: card.startDate,
          endDate: card.endDate
        })
      }
      return acc
    }, [])

    return res.send(cardList);
  } catch (err) {
    console.error(err)
    return res.send(err)
  }

})

module.exports = router;
