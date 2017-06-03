'use strict';

const config = require('../config');
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

// TEMPORARY: START
const projectCards =  [
  {projectId:1, cardsId:[1, 2, 3]},
  {projectId:2, cardsId:[2]},
  {projectId:3, cardsId:[3]},
  {projectId:4, cardsId:[2,3]},
  {projectId:5, cardsId:[1,2]}
]

// TEMPORARY: END
router.get('/list', async(req, res) => {
  return res.send(projectCards);
})

module.exports = router;
