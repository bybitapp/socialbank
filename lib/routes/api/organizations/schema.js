const Joi = require('joi')

exports.organization = function (obj) {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(255).required(),
    number: Joi.number().integer().required(),
    address: Joi.string().min(6).required(),
    postcode: Joi.string().regex(/^[a-zA-Z]{1,2}([0-9]{1,2}|[0-9][a-zA-Z])\s*[0-9][a-zA-Z]{2}$/).required(),
    city: Joi.string().min(3).required()
  })

  return Joi.validate(obj, schema)
}
