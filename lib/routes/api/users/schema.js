const Joi = require('joi')

exports.add = function (obj) {
  const schema = Joi.object().keys({
    uid: Joi.string(),
    name: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string().email().required(),
    access: Joi.string().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.remove = function (obj) {
  const schema = Joi.object().keys({
    uid: Joi.string().required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
