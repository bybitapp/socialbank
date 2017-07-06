const openPayments = require('lib/external/open_payments')
const { getCardsFromOpenPayment, hideCardNumber } = require('lib/util/functions')
const { Card, Project, Org } = require('lib/models')
const schema = require('./schema')

exports.create = async function create (req, res) {
  try {
    const { error, value } = schema.card(req.body)

    if (error) {
      return res.status(409).send(error)
    }

    // verify if user has card in project
    const existingNameCard = await Card.findOne({ project: value.pid, user: value.uid }).exec()
    if (existingNameCard) {
      const error = { msg: `User already has virtual card in project.` }
      return res.status(409).send(error)
    }

    // create virtual card
    const virtualCard = await openPayments.createCard()

    // create card
    const card = new Card({
      project: value.pid,
      user: value.uid,
      status: 'active',
      virtualCardId: virtualCard.id.id,
      virtualCardName: virtualCard.friendlyName
    })
    await card.save()

    return res.send({
      id: card.id,
      userId: card.user,
      projectId: card.project,
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
}

exports.findAll = async function findAllByUser (req, res) {
  const organization = await Org.findOne({
    users: req.user.id
  }).exec()
  const projects = await Project.find({
    organization: organization.id,
    status: 'active'
  }).exec()
  if (projects.length) {
    const projectIds = projects.map(p => p.id)
    const cardList = await Card.find({
      status: {$ne: 'deleted'},
      project: {$in: projectIds}
    }).exec()
    const cards = await getCardsFromOpenPayment(cardList)
    return res.send(cards)
  }
  return res.send([])
}

exports.delete = async function deleteCard (req, res) {
  try {
    const { error, value } = schema.delete(req.body)

    if (error) {
      return res.status(409).send(error)
    }

    // destroy card
    const existingCard = await Card.findOne({ _id: value.cid }).exec()
    if (existingCard) {
      await openPayments.destroyCard(existingCard.virtualCardId)

      existingCard.status = 'deleted'
      existingCard.save()

      console.log('success', { msg: `Card ${existingCard.id} set to status deleted` })
      res.send({
        msg: 'success',
        id: existingCard.id
      })
    }
  } catch (err) {
    console.error(err)
    return res.status(409).send(err)
  }
}

// transfer money from managed account into card
exports.transfer = async function transfer (req, res) {
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

  await openPayments.createTransfer(amount, managedAccount.id.id, managedCard.id.id)

  return res.send({
    projectId: project.id,
    cardId: card.id,
    amount: value.amount
  })
}

// update card status
exports.updateStatus = async function updateStatus (req, res) {
  try {
    const { error, value } = schema.updateStatus(req.body)

    if (error) {
      return res.status(409).send(error)
    }

    // update card
    const existingCard = await Card.findOne({ _id: value.cid }).exec()

    if (existingCard) {
      // update virtual card
      if (value.status === 'active') {
        // TODO: verify if blocks is empty or blocks.blockType value are 'NO_BLOCK'
        await openPayments.unblockCard(existingCard.virtualCardId)
      } else if (value.status === 'inactive') {
        await openPayments.blockCard(existingCard.virtualCardId)
      }

      existingCard.status = value.status
      await existingCard.save()

      console.log('success', { msg: `Card ${existingCard.id} updated` })

      return res.send({
        id: existingCard.id,
        status: existingCard.status
      })
    } else {
      const error = { msg: `Card ${value.id} does not exists.` }
      console.log('errors', error)
      return res.status(409).send(error)
    }
  } catch (err) {
    console.error(err)
    return res.status(409).send(err)
  }
}
