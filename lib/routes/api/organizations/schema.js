const Joi = require('lib/util/joi_extended')

exports.organization = function (obj) {
  const schema = Joi.object().keys({
    id: Joi.string().stripHtml(),
    name: Joi.string().stripHtml().min(3).max(255).required(),
    number: Joi.number().integer().required(),
    address: Joi.string().stripHtml().min(6).required(),
    postcode: Joi.string().stripHtml().regex(/^[a-zA-Z]{1,2}([0-9]{1,2}|[0-9][a-zA-Z])\s*[0-9][a-zA-Z]{2}$/).required(),
    city: Joi.string().stripHtml().min(3).required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
