const Joi = require('joi')

// Password regex:
// ^                         Start anchor
// (?=.*[A-Z])               Ensure string has one uppercase letters.
// (?=.*[!@#$&*])            Ensure string has one special case letter.
// (?=.*[0-9])               Ensure string has one digits.
// (?=.*[a-z])               Ensure string has one lowercase letters.
// .{8,30}                   Ensure string length between 8 and 30.
// $                         End anchor.
exports.demo = function (obj) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().integer().required(),
    role: Joi.string().required(),
    employees: Joi.string().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.login = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/).required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.updateAccount = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).required(),
    phone: Joi.string().min(6).required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.updatePassword = function (obj) {
  const schema = Joi.object().keys({
    oldPassword: Joi.string().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/).required(),
    newPassword: Joi.string().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/).required(),
    repeatPassword: Joi.string().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/).required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.forgotPassword = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.resetPassword = function (obj) {
  const schema = Joi.object().keys({
    password: Joi.string().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/).required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
