const errors = require('lib/errors')
const logger = require('lib/logger')
const openPayments = require('lib/external/open_payments')
const { Card, Project } = require('lib/models')

function amount (amount) {
  if (amount) {
    return amount / 100
  } else {
    return 0
  }
}

exports.findAllByProjectId = async function findAllByProjectId (req, res) {
  const project = await Project.findOne({_id: req.params.id}).exec()
  if (!project) {
    const errorMsg = 'Project does not exists.'

    throw new errors.NotFoundError(errorMsg)
  }

  let transactions = []
  if (req.user.access !== 'user') {
    // TODO temporary solution because OPC return wrong id during creation
    const manageAccount = await openPayments.getManagedAccounts(project.managedAccountName)
    if (!manageAccount && !manageAccount.accounts.length) {
      const errorMsg = 'Managed account does not exists.'
      logger.log('errors', {msg: errorMsg})
      throw new errors.NotFoundError(errorMsg)
    }

    const managedAccountId = manageAccount.accounts[0].id.id
    const accountStatement = await openPayments.getManagedAccountStatement(managedAccountId)
    transactions = accountStatement.entries.map(item => {
      return {
        datetime: item.processedTimestamp,
        amount: amount(item.transactionAmount.amount),
        currency: item.transactionAmount.currency,
        status: item.stateInstruction,
        name: project.name,
        transaction: item.txId.type,
        type: 'PROJECT'
      }
    })
  }

  let cardQuery = {
    project: project.id,
    status: {$ne: 'deleted'}
  }

  if (req.user.access === 'user') {
    cardQuery['user'] = req.user.id
  }

  const cardList = await Card.find(cardQuery).populate('user').exec()
  for (let i = 0; i < cardList.length; i++) {
    const card = cardList[i]
    const cardStatement = await openPayments.getManagedCardStatement(card.virtualCardId)
    transactions = transactions.concat(cardStatement.entries.map(item => {
      return {
        datetime: item.processedTimestamp,
        amount: amount(item.transactionAmount.amount),
        currency: item.transactionAmount.currency,
        status: item.stateInstruction,
        name: card.user.email,
        transaction: item.txId.type,
        type: 'CARD'
      }
    }))
  }

  transactions.sort(function (a, b) {
    return a.datetime - b.datetime
  })

  // calculate balance
  // TODO has to be improved
  // let balance = transactions[0].amount
  // transactions = transactions.map(item => {
  //   balance += item.amount
  //   item['balance'] = balance
  //   return item
  // })

  transactions.sort(function (a, b) {
    return b.datetime - a.datetime
  })

  return res.send(transactions)
}
