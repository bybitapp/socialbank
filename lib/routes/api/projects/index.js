'use strict';

const express = require('express');
const uuid = require('uuid/v1');

const openPayments = require('lib/external/open_payments')
const { Project, Org } = require('lib/models')
const schema = require('./schema')
const { getProjects } = require('lib/util/functions')

const router = express.Router();

// create account [Managed Account]
router.post('/add', async(req, res, next) => {
    const { error, value } = schema.project(req.body)

    if (error) {
      return res.status(409).send(error)
    }

    if (value.pid) {
      // update project
      const existingProject = await Project.findOne({ _id: value.pid }).exec()
      if (existingProject) {
        existingProject.name = value.name,
        existingProject.access = value.access,
        existingProject.description = value.description
        await existingProject.save()
        console.log('success', { msg: `Project ${existingProject.id} updated` })
        return res.send({
          id: existingProject.id,
          name: existingProject.name,
          description: existingProject.description,
          access: existingProject.access,
          cards: 0
        })
      } else {
        const error = { msg: `Project ${value.id} doesn not exists.` }
        console.log('errors', error)
        return res.status(409).send(error)
      }
    }

    // find organzation
    const organization = await Org.findOne({ _id: value.oid }).exec()
    if (!organization) {
      const error = { msg: 'Organization doesn not exists.' }
      console.log('errors', error)
      return res.status(409).send(error)
    }

    // create managed account
    const managedName = 'SOCIALBANK.' + uuid()
    const managedAccount = await openPayments.createManagedAccount(managedName)

    // create project
    const newProject = new Project({
      name: value.name,
      description: value.description,
      access: value.access,
      status: 'active',
      organization: organization,
      managedAccountId: managedAccount.id.id,
      managedAccountName: managedName,
      managedAccountCreated: managedAccount.creationTimestamp
    })
    await newProject.save()

    console.log('success', { msg: `Project ${newProject.id} added to your account` })
    return res.send({
      id: newProject.id,
      name: newProject.name,
      description: newProject.description,
      access: newProject.access,
      balances: managedAccount.balances,
      created: managedAccount.creationTimestamp,
      cards: 0
    })

})

// get managed accounts
router.get('/list/o/:orgId', async(req, res, next) => {
  const projectList = await getProjects(req.params.orgId)
  return res.send({projects: projectList})
})

// close managed accounts
router.post('/delete', async(req, res, next) => {

  const { error, value } = schema.delete(req.body)

  if (error) {
    return res.status(409).send(error)
  }

  // update project
  Project
    .findOne({ _id: value.pid }).exec()
    .then(existingProject => {
      if (existingProject) {
        existingProject.status = 'inactive'
        return existingProject.save()
      }
    })
    .then(project => {
      console.log('success', { msg: `Project ${project.id} set to status inactive` })
      res.send({
          msg: 'success',
          projectId: project.id
      })
    }).catch(err => {next(err)})

})

// get managed accounts
router.post('/deposit', async(req, res, next) => {

  const { error, value } = schema.deposit(req.body)

  if (error) {
    return res.status(409).send(error)
  }

  const project = await Project.findOne({ _id: value.pid }).exec()
  const organization = await Org.findOne({ _id: value.oid }).exec()

  const amount = value.amount
  const eid = organization.bankAccount.externalAccountId
  // TODO OPC return wrong managedAccontID
  // The workaround is only to get list of accounts
  // and then filter by friendlyName
  // const mid = project.managedAccountId
  const accountList = await openPayments.getManagedAccounts()
  const account = accountList.accounts.filter((item) => item.friendlyName === project.managedAccountName)
  const mid = account[0].id.id

  // const deposit = 'test'
  openPayments.createDeposit(amount, eid, mid)
    .then(data => {
      return res.send({
        projectId: value.pid,
        orgId: value.oid,
        amount: value.amount
      })
    })
    .catch(error => {
      console.log(error);
      return res.status(409).send(error)
    })
})

module.exports = router;
