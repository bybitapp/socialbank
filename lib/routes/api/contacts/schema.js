const Joi = require('lib/util/joi_extended')

exports.contact = function (obj) {
  const schema = Joi.object().keys({
    name: Joi.string().stripHtml().required(),
    email: Joi.string().stripHtml().email().required(),
    message: Joi.string().stripHtml().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
