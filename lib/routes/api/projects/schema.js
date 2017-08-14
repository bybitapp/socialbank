const Joi = require('lib/util/joi_extended')

exports.project = function (obj) {
  const schema = Joi.object().keys({
    name: Joi.string().stripHtml().min(5).required(),
    description: Joi.string().stripHtml().required(),
    pid: Joi.string().stripHtml()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.delete = function (obj) {
  const schema = Joi.object().keys({
    pid: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.deposit = function (obj) {
  const schema = Joi.object().keys({
    amount: Joi.number().required(),
    pid: Joi.string().stripHtml().required(),
    bid: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
