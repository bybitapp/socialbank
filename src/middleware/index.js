'use strict'

const { lower } = require('src/util/camel_case')
const requireDir = require('require-directory')

module.exports = requireDir(module, {
  rename: lower
})
