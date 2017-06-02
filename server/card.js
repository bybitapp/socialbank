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

router.get('/list', async(req, res) => {
  console.log('GET api/cards');
  return res.send([{'test': "test text"}]);
})

module.exports = router;
