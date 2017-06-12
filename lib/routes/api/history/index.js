'use strict';

const express = require('express');
const uuid = require('uuid/v1');

const openPayments = require('lib/external/open_payments')
const { Card, Project } = require('lib/models')
const { hideCardNumber } = require('lib/util/functions')

const router = express.Router();

function amount(amount) {
  if (amount) {
    return amount / 100
  } else {
    return 0
  }
}

// get list of organizations
router.get('/list/p/:id', async(req, res, next) => {
  try {

    const project = await Project.findOne({_id:req.params.id}).exec()
    if (!project) {
      return res.send()
    }

    // TODO temporary solution because OPC return wrong id during creation
    const manageAccount = await openPayments.getManagedAccounts(project.managedAccountName)
    if (!manageAccount && !manageAccount.accounts.length) {
      return res.send()
    }

    const managedAccountId = manageAccount.accounts[0].id.id
    const accountStatement = await openPayments.getManagedAccountStatement(managedAccountId)
    let transactions = accountStatement.entries.map(item => {
      return {
        datetime: item.processedTimestamp,
        amount: amount(item.transactionAmount.amount),
        currency: item.transactionAmount.currency,
        status: item.stateInstruction,
        name: 'ACCOUNT',
        type: item.txId.type
      }
    })

    const cardList = await Card.find({ project: project.id, status: {$ne: 'deleted'}}).exec()
    for(let i = 0; i < cardList.length; i++) {
        const card = cardList[i]
        const cardStatement = await openPayments.getManagedCardStatement(card.virtualCardId)
        transactions = transactions.concat(cardStatement.entries.map(item => {
          return {
            datetime: item.processedTimestamp,
            amount: amount(item.transactionAmount.amount),
            currency: item.transactionAmount.currency,
            status: item.stateInstruction,
            name: card.name,
            type: item.txId.type
          }
        }))
    }

    transactions.sort(function (a, b) {
      return b.datetime - a.datetime;
    })

    return res.send(transactions);
  } catch (err) {
    console.error(err)
    return res.send([])
  }
})

module.exports = router;
