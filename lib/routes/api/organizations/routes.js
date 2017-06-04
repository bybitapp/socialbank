'use strict';

const config = require('config');

const express = require('express');
const uuid = require('uuid/v1');
const Joi = require('joi')
const router = express.Router();

// get list of organizations
router.get('/list', async(req, res) => {
  try {

    let organizations = [
      {id: 1, name: 'Human Rights Watch', description: '', funds: '£14.000', icon: 'functions', lat: 51.522, lng: -0.089},
      {id: 2, name: 'Do Something', description: '', funds: '£55.000', icon: 'person', lat: 51.52, lng: -0.08},
      {id: 3, name: 'World Wildlife Fund', description: '', funds: '£22.000', icon: 'star', lat: 51.52, lng: -0.082},
      {id: 4, name: 'Caritas', description: '', funds: '£5.000', icon: 'star', lat: 51.523, lng: -0.085}
    ];

    return res.send(organizations);
  } catch (err) {
    console.error(err)
    return res.send(err)
  }
})

module.exports = router;
