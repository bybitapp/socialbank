const Joi = require('joi')

exports.register = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.number().integer().required(),
    accepted: Joi.boolean()
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
