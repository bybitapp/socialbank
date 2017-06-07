const Joi = require('joi')

exports.project = function (obj) {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).required(),
    description: Joi.string(),
    access: Joi.string(),
    orgId: Joi.string()
  })

  return Joi.validate(obj, schema)
}
