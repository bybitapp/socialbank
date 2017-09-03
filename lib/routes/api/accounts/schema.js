const Joi = require('lib/util/joi_extended')

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
    name: Joi.string().stripHtml().required(),
    email: Joi.string().stripHtml().email().required(),
    phone: Joi.number().integer().required(),
    role: Joi.string().stripHtml().required(),
    employees: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.login = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().stripHtml().email().required(),
    password: Joi.string().stripHtml().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/).required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.updateAccount = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().stripHtml().email().required(),
    phone: Joi.string().stripHtml().min(6).required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.updatePassword = function (obj) {
  const schema = Joi.object().keys({
    oldPassword: Joi.string().stripHtml().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/).required(),
    newPassword: Joi.string().stripHtml().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/).required(),
    repeatPassword: Joi.string().stripHtml().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/).required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.forgotPassword = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().stripHtml().email().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.resetPassword = function (obj) {
  const schema = Joi.object().keys({
    password: Joi.string().stripHtml().regex(/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,30}$/).required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
