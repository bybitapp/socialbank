const Joi = require('joi')

exports.register = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    charityName: Joi.string().min(3).max(255).required(),
    charityNumber: Joi.number().integer().required(),
    address: Joi.string().min(6).required(),
    postcode: Joi.string().regex(/^[a-zA-Z]{1,2}([0-9]{1,2}|[0-9][a-zA-Z])\s*[0-9][a-zA-Z]{2}$/).required(),
    city: Joi.string().min(3).required(),
    accountOwner: Joi.string().min(3).required(),
    bankName: Joi.string().min(3).required(),
    ibanCode: Joi.string().regex(/^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/).required(),
    swiftCode: Joi.string().regex(/^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/).required(),
    accepted: Joi.boolean(),
  })

  return Joi.validate(obj, schema)
}

exports.login = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
  })

  return Joi.validate(obj, schema)
}
