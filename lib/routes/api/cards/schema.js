const Joi = require('lib/util/joi_extended')

exports.card = function (obj) {
  const schema = Joi.object().keys({
    pid: Joi.string().stripHtml().required(),
    uid: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.delete = function (obj) {
  const schema = Joi.object().keys({
    cid: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.updateStatus = function (obj) {
  const schema = Joi.object().keys({
    cid: Joi.string().stripHtml().required(),
    status: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.transfer = function (obj) {
  const schema = Joi.object().keys({
    amount: Joi.number().positive().required(),
    cid: Joi.string().stripHtml().required(),
    pid: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.detail = function (obj) {
  const schema = Joi.object().keys({
    cid: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
