'use strict'

const openPayments = require('lib/external/open_payments')
const { Project, Card } = require('lib/models')

function hideCardNumber (cardNumber) {
  const treeDigits = cardNumber.substring(cardNumber.length-3, cardNumber.length)
  cardNumber = cardNumber.replace(/[0-9]/g, '*')
  cardNumber = cardNumber.substring(0, cardNumber.length-3)
  cardNumber = cardNumber.concat(treeDigits)
  return cardNumber
}

async function getProjects (orgId, access) {

  let query = {
    organization: orgId,
    status: 'active'
  }

  if (access) {
    query['access'] = access
  }

  let projectList = await Project.find(query).exec()
  if ( projectList.length ) {
    // TODO filter doesn't work properly in ixaris.
    // No filter by friendlyName or IDs
    const menagedAccounts = await openPayments.getManagedAccounts()
    const pIds = projectList.map((item) => {return item.managedAccountName})

    let mAccounts = {}
    menagedAccounts.accounts
      .filter((item) => {return pIds.includes(item.friendlyName)})
      .forEach((item) => {
        const actual = item.balances.actual;
        mAccounts[item.friendlyName] = {
          balances: {
            actual: (actual) ? (actual / 100) : 0
          },
          created: item.creationTimestamp
        }
      })

    const projects = projectList.map((item) => {
      const isManaged = mAccounts[item.managedAccountName] || {}
      return {
        name: item.name,
        access: item.access,
        description: item.description,
        balances: isManaged.balances || {},
        created: isManaged.created || {} ,
        id: item.id,
        cards: 10
      }
    })

    return projects
  } else{
    return []
  }
}

async function getCards (projectId) {

  const cardList = await Card.find({ project: projectId, status: {$ne: 'deleted'}}).exec()
  let cards = []

  for (let i=0; i < cardList.length; i++) {
    const card = cardList[i]
    const managedCards = await openPayments.getManagedCards(card.virtualCardName)
    const managedCard = managedCards.cards[0]
    if (managedCard) {
      cards.push({
        id: card.id,
        name: card.name,
        status: managedCard.state,
        cardBrand: managedCard.cardBrand,
        cardNumber: hideCardNumber(managedCard.cardNumber),
        expiryPeriod: managedCard.expiryPeriod,
        currentNumberOfLoads: managedCard.currentNumberOfLoads,
        maxNumberOfLoads: managedCard.maxNumberOfLoads,
        currentNumberOfSpends: managedCard.currentNumberOfSpends,
        maxNumberOfSpends: managedCard.maxNumberOfSpends,
        balances: managedCard.balances,
        startDate: managedCard.startDate,
        endDate: managedCard.endDate
      })
    }
  }

  return cards
}


module.exports = {
  hideCardNumber,
  getProjects,
  getCards
};
