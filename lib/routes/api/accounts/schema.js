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

exports.updateAccount = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(6).required()
  })

  return Joi.validate(obj, schema)
}

exports.updatePassword = function (obj) {
  const schema = Joi.object().keys({
    oldPassword: Joi.string().min(6).required(),
    newPassword: Joi.string().min(6).required(),
    repeatPassword: Joi.string().min(6)
  })

  return Joi.validate(obj, schema)
}
