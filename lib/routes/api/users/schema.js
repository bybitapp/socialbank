const Joi = require('joi')

exports.add = function (obj) {
  const schema = Joi.object().keys({
    uid: Joi.string(),
    email: Joi.string().email().required(),
    access: Joi.string().required()
  })

  return Joi.validate(obj, schema)
}

exports.remove = function (obj) {
  const schema = Joi.object().keys({
    uid: Joi.string().required()
  })

  return Joi.validate(obj, schema)
}
