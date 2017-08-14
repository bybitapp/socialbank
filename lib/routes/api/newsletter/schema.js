const Joi = require('lib/util/joi_extended')

exports.contact = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().stripHtml().email().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
