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
      res.status(409).send(error)
    }

    if (value.pid) {
      const error = { msg: 'Edit project has not implemented yet.' }
      console.log('errors', error)
      return res.status(409).send(error)
    }

    // find organzation
    const organization = await Org.findOne({ _id: value.oid }).exec()
    if (!organization) {
      const error = { msg: 'Organization doesn not exists.' }
      console.log('errors', error)
      return res.status(409).send(error)
    }

    // create project
    const newProject = new Project({
      name: value.name,
      description: value.description,
      access: value.access,
      status: 'active',
      organization: organization
    })
    await newProject.save()

    // create managed account
    const managedName = 'SOCIALBANK.' + uuid()
    const managedAccount = await openPayments.createManagedAccount(managedName)

    // update project
    Project
      .findOne({ _id: newProject.id }).exec()
      .then(existingProject => {
        if (existingProject) {
          existingProject.managedAccountId = managedAccount.id.id,
          existingProject.managedAccountName = managedName,
          existingProject.managedAccountCreated = managedAccount.creationTimestamp
          return existingProject.save()
        }
      })
      .then(project => {
        console.log('success', { msg: 'Project added to your account' })
        res.send({
          id: project.id,
          name: project.name,
          description: project.description,
          access: project.access,
          balances: managedAccount.balances,
          created: managedAccount.creationTimestamp,
          cards: 0
        })
      }).catch(err => {next(err)})

})

// get managed accounts
router.get('/list/o/:orgId', async(req, res, next) => {
  const projectList = await getProjects(req.params.orgId)
  return res.send({projects: projectList})
})

module.exports = router;
