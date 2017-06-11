const Joi = require('joi')

exports.contact = function (obj) {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    message: Joi.string().required()
  })

  return Joi.validate(obj, schema)
}
