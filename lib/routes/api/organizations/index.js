'use strict';

const config = require('config');

const express = require('express');
const { Org, Project } = require('lib/models')
const { getProjects } = require('lib/util/functions')
const uuid = require('uuid/v1');
const Joi = require('joi')
const router = express.Router();

// get list of organizations
router.get('/list', async(req, res, next) => {
  const orgList = await Org.find({}).exec()
  let organizations = orgList
    .filter(org => {
      return (org.location && org.location.lat && org.location.lng)
    })
    .map(org => {
      return {
        id: org.id,
        name: org.name,
        number: org.number,
        funds: '£0',
        icon: 'place',
        lat: org.location.lat,
        lng: org.location.lng,
        address: org.location.address,
        city: org.location.city,
        postcode: org.location.postcode
      }
    }
  )

  return res.send(organizations);
})

// get organization
router.get('/o/:id', async(req, res, next) => {

  const org = await Org.findOne({_id: req.params.id}).exec()
  if (org) {
    const projects = await getProjects(org.id, 'public')
    return res.send({
      id: org.id,
      name: org.name,
      number: org.number,
      funds: '£0',
      icon: 'place',
      address: org.location.address,
      city: org.location.city,
      postcode: org.location.postcode,
      projects
    })
  }
  return res.send()

})

module.exports = router;
