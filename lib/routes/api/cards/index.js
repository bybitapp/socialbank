'use strict';

const express = require('express');
const uuid = require('uuid/v1');

const openPayments = require('lib/external/open_payments')
const { Card, Project } = require('lib/models')
const schema = require('./schema')
const { getCards, hideCardNumber } = require('lib/util/functions')

const router = express.Router();

router.post('/add', async(req, res) => {
    try {
      const { error, value } = schema.card(req.body)

      if (error) {
        return res.status(409).send(error)
      }

      const virtualCard = await openPayments.createCard()

      // create virtual card
      const card = new Card({
        project: value.projectId,
        name: value.name,
        status: 'active',
        virtualCardId: virtualCard.id.id,
        virtualCardName: virtualCard.friendlyName
      })
      await card.save()

      return res.send({
        id: card.id,
        name: card.name,
        status: virtualCard.state,
        cardBrand: virtualCard.cardBrand,
        cardNumber: hideCardNumber(virtualCard.cardNumber),
        expiryPeriod: virtualCard.expiryPeriod,
        currentNumberOfLoads: virtualCard.currentNumberOfLoads,
        maxNumberOfLoads: virtualCard.maxNumberOfLoads,
        currentNumberOfSpends: virtualCard.currentNumberOfSpends,
        maxNumberOfSpends: virtualCard.maxNumberOfSpends,
        balances: virtualCard.balances,
        startDate: virtualCard.startDate,
        endDate: virtualCard.endDate
      })
    } catch (err) {
      console.error(err)
      return res.status(409).send(err)
    }
})

router.get('/list/p/:projectId', async(req, res) => {
  try {
    const cardList = await getCards(req.params.projectId)
    return res.send(cardList)
  } catch (err) {
    console.error(err)
    return res.send(err)
  }

})

module.exports = router;
