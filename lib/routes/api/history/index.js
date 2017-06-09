'use strict';

const express = require('express');
const uuid = require('uuid/v1');

const router = express.Router();

// get list of organizations
router.get('/list/p/:projectId', async(req, res) => {
  try {

    // get managed account (project) statement
    // get list of cards assigned to project
    // merge both lists and order by date
    // return proper information about transaction

    return res.send();
  } catch (err) {
    console.error(err)
    return res.send(err)
  }
})

module.exports = router;
