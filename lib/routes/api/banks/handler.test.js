const should = require('should')

const banksHandler = require('./handler')

describe('api:banks', () => {
  describe('#find', () => {
    it('should have a method find', async function () {
      should(banksHandler.find).be.not.undefined()
    })
  })

  describe('#create', () => {
    it('should have a method create', async function () {
      should(banksHandler.create).be.not.undefined()
    })
  })
})
