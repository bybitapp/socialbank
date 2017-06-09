const Joi = require('joi')

exports.card = function (obj) {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).max(30).required(),
    projectId: Joi.string().required()
  })

  return Joi.validate(obj, schema)
}
