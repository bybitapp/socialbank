'use strict'

const express = require('express')
const uuid = require('uuid/v1')

const openPayments = require('lib/external/open_payments')
const { Card, Project } = require('lib/models')
const schema = require('./schema')
const { getCards, hideCardNumber } = require('lib/util/functions')

const router = express.Router()

router.post('/add', async(req, res) => {
    try {

      const { error, value } = schema.card(req.body)

      if (error) {
        return res.status(409).send(error)
      }

      // verify if card name is in use
      const existingNameCard = await Card.findOne({project: value.pid, name: value.name }).exec()
      if (existingNameCard) {
        const error = { msg: `Card name '${value.name}' already in use.` }
        return res.status(409).send(error)
      }

      if (value.cid) {

        // update card
        const existingCard = await Card.findOne({ _id: value.cid }).exec()
        if (existingCard) {

          // update virtual card
          existingCard.name = value.name
          await existingCard.save()

          console.log('success', { msg: `Card ${existingCard.id} updated` })

          return res.send({
            id: existingCard.id,
            name: existingCard.name,
          })

        } else {
          const error = { msg: `Card ${value.id} does not exists.` }
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
    return res.status(409).send(err)
  }

})

// delete card
router.post('/delete', async(req, res, next) => {

  try {

    const { error, value } = schema.delete(req.body)

    if (error) {
      return res.status(409).send(error)
    }

    // destroy card
    const existingCard = await Card.findOne({ _id: value.cid }).exec()
    if (existingCard) {

      // destroy virtual card
      const virtualCard = await openPayments.destroyCard(existingCard.virtualCardId)

      existingCard.status = 'deleted'
      existingCard.save()

      console.log('success', { msg: `Card ${existingCard.id} set to status deleted` })
      res.send({
        msg: 'success',
        id: existingCard.id
      })
    }

  } catch(err) {
    console.error(err)
    return res.status(409).send(err)
  }

})

// transfer money from managed account into card
router.post('/transfer', async(req, res, next) => {

  const { error, value } = schema.transfer(req.body)

  if (error) {
    return res.status(409).send(error)
  }

  const project = await Project.findOne({ _id: value.pid }).exec()
  const card = await Card.findOne({ _id: value.cid }).exec()

  const amount = value.amount

  const managedAccounts = await openPayments.getManagedAccounts(project.managedAccountName)
  const managedAccount = managedAccounts.accounts[0]

  const managedCards = await openPayments.getManagedCards(card.virtualCardName)
  const managedCard = managedCards.cards[0]

  if (managedAccount && managedCard) {

    openPayments.createTransfer(amount, managedAccount.id.id, managedCard.id.id)
      .then(data => {
        return res.send({
          projectId: value.pid,
          cardId: value.cid,
          amount: value.amount
        })
      })
      .catch(error => {
        console.log(error)
        return res.status(409).send(error)
      })

    } else {
      return res.status(409).send('Internal exception')
    }
})

// update card status
router.post('/status', async(req, res, next) => {

  try {

    const { error, value } = schema.updateStatus(req.body)

    if (error) {
      return res.status(409).send(error)
    }

    // update card
    const existingCard = await Card.findOne({ _id: value.cid }).exec()

    if (existingCard) {
      // update virtual card
      var result
      switch(value.status) {
        case 'active':
          result = await openPayments.unblockCard(existingCard.virtualCardId)
          // TODO: blocks should be empty or blocks.blockType value should be 'NO_BLOCK'
          console.log(result)
        case 'inactive':
          result = await openPayments.blockCard(existingCard.virtualCardId)
      }

      existingCard.status = value.status
      await existingCard.save()

      console.log('success', { msg: `Card ${existingCard.id} updated` })

      return res.send({
        id: existingCard.id,
        status: existingCard.status,
      })

    } else {
      const error = { msg: `Card ${value.id} does not exists.` }
      console.log('errors', error)
      return res.status(409).send(error)
    }

  } catch(err) {
    console.error(err)
    return res.status(409).send(err)
  }
})

module.exports = router
