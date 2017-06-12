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

      if (value.cid) {
        // update card
        const existingCard = await Card.findOne({ _id: value.cid }).exec()
        if (existingCard) {
          existingCard.name = value.name,
          existingCard.status = value.status,
          await existingCard.save()

          console.log('success', { msg: `Card ${existingCard.id} updated` })

          return res.send({
            id: existingCard.id,
            name: existingCard.name,
            status: existingCard.status,
          })
          
        } else {
          const error = { msg: `Card ${value.id} doesn not exists.` }
          console.log('errors', error)
          return res.status(409).send(error)
        }
      }

      // create virtual card
      const virtualCard = await openPayments.createCard()

      // create card
      const card = new Card({
        project: value.pid,
        name: value.name,
        status: 'active',
        virtualCardId: virtualCard.id.id,
        virtualCardName: virtualCard.friendlyName
      })
      await card.save()

      return res.send({
        id: card.id,
        name: card.name,
        status: card.status,
        state: virtualCard.state,
        cardBrand: virtualCard.cardBrand,
        cardNumber: hideCardNumber(virtualCard.cardNumber),
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
