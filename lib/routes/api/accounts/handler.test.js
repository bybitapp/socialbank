const should = require('should')

const accountHandler = require('./handler')
const accountSchema = require('./schema')

describe('handler:login', () => {
  describe('#login', () => {
    it('should throw a ValidationError with empty data', async function () {
      try {
        const req = {body: {email: 'aaa@aaa.com', password: 'aAA11!!'}}
        await accountHandler.login(req)
      } catch (error) {
        should.equal(error.httpCode, 400)
        should.equal(error.data, undefined)
        should.equal(error.errors, undefined)
        should(error.message).be.a.String()
      }
    })
  })
})

describe('schema:login', () => {
  describe('#login', () => {
    it('should return an error message', async function () {
      const {error} = accountSchema.login({email: 'aaa@aaa.com', password: 'aAA11!!'})
      should(error.message).be.a.String()
    })
  })
})
