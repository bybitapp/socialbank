const Joi = require('joi')

exports.card = function (obj) {
  const schema = Joi.object().keys({
    pid: Joi.string().required(),
    uid: Joi.string().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.delete = function (obj) {
  const schema = Joi.object().keys({
    cid: Joi.string().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.updateStatus = function (obj) {
  const schema = Joi.object().keys({
    cid: Joi.string().required(),
    status: Joi.string().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.transfer = function (obj) {
  const schema = Joi.object().keys({
    amount: Joi.number().positive().required(),
    cid: Joi.string().required(),
    pid: Joi.string().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.detail = function (obj) {
  const schema = Joi.object().keys({
    cid: Joi.string().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
