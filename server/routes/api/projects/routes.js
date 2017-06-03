'use strict';

const config = require('config');
const Opc = require('open_payments_cloud_application_api');
Opc.ApiClient.instance.basePath = config.opc.urlApi;

const express = require('express');
const uuid = require('uuid/v1');
const Joi = require('joi')
const router = express.Router();

const {opc: { programmeKey, programmeId, username, password, ownerId, currency, country, issueProvider }} = config
const {opc: {profile: { managedCard, managedAccount, externalAccount, deposit, transfer }}} = config

// get information about token
const getToken = () => {
    const api = new Opc.AuthApi();
    const request = new Opc.LoginParams(programmeId, username, password)
    return api.authLogin(uuid(), programmeKey, request)
}

const projectSchema = Joi.object().keys({
  name: Joi.string().min(5).required(),
  description: Joi.string(),
  organizationUUID: Joi.string()
})

// create account [Managed Account]
router.post('/add', async(req, res) => {
    try {

        const { error, value } = Joi.validate(req.body, projectSchema)
        let project = value

        if (error) {
            res.status(409).send(error)
        }

        const {token} = await getToken()
        const correlationId = uuid()
        const projectUUID = uuid()

        // create managed account
        const api = new Opc.ManagedAccountsApi();
        const managedName = 'SOCIALBANK.' + project.organizationUUID + '.' + projectUUID
        const request = new Opc.CreateManagedAccountParams(
            managedAccount,
            ownerId,
            managedName,
            currency,
            issueProvider
        );
        const response = await apiManaged.managedAccountsIdCreate(correlationId, programmeKey, token, request)

        project = Object.assign({
            managedAccountId: response.id.id,
            managedAccountName: managedName,
            managedAccountCreated: response.creationTimestamp,
            uuid: projectUUID,
            organizationUUID: project.organizationUUID
        }, project)

        // TODO save all data with project ID in noSQL database
        console.log(project);

        return res.send(project)
    } catch (err) {
        console.error(err)
        return res.status(409).send(err)
    }
})

// get managed accounts
router.get('/list', async(req, res) => {
    try {

      const {token} = await getToken()
      const correlationId = uuid()

      const api = new Opc.ManagedAccountsApi()
      const request = new Opc.ManagedAccountsFilter({
        profileId: managedAccount,
        programmeId,
        ownerId
      });

      const response = await api.managedAccountsGet(correlationId, programmeKey, token, request)

      let projects = response.accounts.map((item, index) => {
          return {
            name: item.friendlyName,
            balance: {
              available: item.balances.available,
              reserved: item.balances.reserved,
              actual: item.balances.actual
            },
            created: item.creationTimestamp,
            id: item.id.id,
            cards: 12
          }
        }
      )

      return res.send(projects);
    } catch (err) {
        console.error(err)
        return res.send(err)
    }
})

module.exports = router;
