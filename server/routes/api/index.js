'use strict'

const router = require('express').Router();

const requireDirectory = require('require-directory'),
  whitelist = /routes.js$/,
  hash = requireDirectory(module, {include: whitelist});

const routeModules = requireDirectory(module, '.')
const routes = []
for (var r in routeModules) {
  if (routeModules.hasOwnProperty(r)) {
    router.use(`/${r}`, require(`./${r}/routes.js`))
  }
}

module.exports = router
