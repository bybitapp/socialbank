const Joi = require('lib/util/joi_extended')

exports.add = function (obj) {
  const schema = Joi.object().keys({
    uid: Joi.string().stripHtml(),
    name: Joi.string().stripHtml().required(),
    role: Joi.string().stripHtml().required(),
    email: Joi.string().stripHtml().email().required(),
    access: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.remove = function (obj) {
  const schema = Joi.object().keys({
    uid: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
