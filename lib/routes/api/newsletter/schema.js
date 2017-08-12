const Joi = require('joi')

exports.contact = function (obj) {
  const schema = Joi.object().keys({
    email: Joi.string().email().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
