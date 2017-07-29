const Joi = require('joi')

// Password regex:
// ^                         Start anchor
// (?=.*[A-Z])               Ensure string has one uppercase letters.
// (?=.*[!@#$&*])            Ensure string has one special case letter.
// (?=.*[0-9])               Ensure string has one digits.
// (?=.*[a-z])               Ensure string has one lowercase letters.
// .{8,30}                   Ensure string length between 8 and 30.
// $                         End anchor.
exports.register = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/).required(),
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

exports.forgotPassword = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required()
  })

  return Joi.validate(obj, schema)
}
