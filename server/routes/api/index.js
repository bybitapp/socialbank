'use strict'

const router = require('express').Router();

const requireDirectory = require('require-directory'),
  whitelist = /routes.js$/,
  hash = requireDirectory(module, {include: whitelist});

const routes = requireDirectory(module, '.')
for (var r in routes) {
  if (routes.hasOwnProperty(r)) {
    router.use(`/${r}`, require(`./${r}/routes.js`))
  }
}

module.exports = router
