const uuid = require('uuid/v1')
const errors = require('lib/errors')
const logger = require('lib/logger')
const openPayments = require('lib/external/open_payments')
const { Project, Org, Bank, Card } = require('lib/models')
const schema = require('./schema')
const { getProjects } = require('lib/processors/projects')

exports.create = async function create (req, res) {
  const { error, value } = schema.project(req.body)

  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  if (value.pid) {
    // update project
    const existingProject = await Project.findOne({ _id: value.pid }).exec()
    if (existingProject) {
      existingProject.name = value.name
      existingProject.description = value.description
      await existingProject.save()
      logger.info('success', { msg: `Project ${existingProject.id} updated` })
      return res.send({
        id: existingProject.id,
        name: existingProject.name,
        description: existingProject.description,
        access: existingProject.access,
        cards: 0
      })
    } else {
      const errorMsg = 'Project not found'
      throw new errors.NotFoundError(errorMsg)
    }
  }

  // find organzation
  const organization = await Org.findOne({ users: req.user.id }).exec()
  if (!organization) {
    const errorMsg = 'Organization not found'
    throw new errors.NotFoundError(errorMsg)
  }

  // create managed account
  const managedName = 'SOTEC.' + uuid()
  const managedAccount = await openPayments.createManagedAccount(managedName)

  logger.info(managedAccount.ownerId)
  // create project
  const newProject = new Project({
    name: value.name,
    description: value.description,
    organization: organization,
    managedAccountId: managedAccount.ownerId.id,
    managedAccountName: managedName,
    managedAccountCreated: managedAccount.creationTimestamp
  })
  await newProject.save()

  logger.info('success', { msg: `Project ${newProject.id} added to your account` })
  return res.send({
    id: newProject.id,
    name: newProject.name,
    description: newProject.description,
    access: newProject.access,
    balances: managedAccount.balances,
    created: managedAccount.creationTimestamp,
    cards: 0
  })
}

exports.findAll = async function findAll (req, res) {
  // find organzation
  const organization = await Org.findOne({ users: req.user.id }).exec()
  if (organization) {
    let projectList = await getProjects(organization.id)
    if (req.user.access === 'user') {
      const cardList = await Card.find({
        status: {$ne: 'deleted'},
        user: req.user.id
      }).exec()
      const pIds = cardList.map(c => c.project.toString())
      projectList = projectList.filter(p => pIds.includes(p.id.toString()))
    }
    return res.send({projects: projectList})
  } else {
    return res.send({projects: []})
  }
}

// close managed accounts
exports.delete = async (req, res) => {
  const { error, value } = schema.delete(req.body)

  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  // update project
  const existingProject = await Project.findOne({ _id: value.pid }).exec()
  if (existingProject) {
    existingProject.status = 'deleted'
    await existingProject.save()
  }

  logger.log('success', { msg: `Project ${existingProject.id} set to status inactive` })
  res.send({
    msg: 'success',
    projectId: existingProject.id
  })
}

// deposit money into managed account from external account
exports.deposit = async function deposit (req, res) {
  const { error, value } = schema.deposit(req.body)

  if (error) {
    logger.error('validation errors', error)
    throw new errors.ValidationError('Invalid values. Please review the entered data.')
  }

  const project = await Project.findOne({ _id: value.pid }).exec()
  const organization = await Org.findOne({ users: req.user.id }).exec()
  const bank = await Bank.findOne({ _id: value.bid }).exec()

  if (!bank) {
    throw new errors.NotFoundError('Bank account not found')
  }

  const amount = value.amount
  const eid = bank.externalAccountId
  // TODO OPC return wrong managedAccontID
  // The workaround is only to get list of accounts
  // and then filter by friendlyName
  // const mid = project.managedAccountId
  const accountList = await openPayments.getManagedAccounts()
  const account = accountList.accounts.filter((item) => item.friendlyName === project.managedAccountName)
  const mid = account[0].id.id

  // const deposit = 'test'
  await openPayments.createDeposit(amount, eid, mid)

  return res.send({
    projectId: project.id,
    orgId: organization.id,
    amount: value.amount
  })
}
