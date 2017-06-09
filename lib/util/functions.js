'use strict'

const openPayments = require('lib/external/open_payments')
const { Project, Card } = require('lib/models')

exports.getProjects = async function getProjects (orgId) {
  let projectList = await Project.find({ organization: orgId, status: 'active' }).exec()
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

exports.getCards = async function getCards (projectId) {

  const virtualCardList = await Card.find({ project: projectId }).exec()

  const managedCardList = await openPayments.getManagedCards()

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

  return cardList
}
