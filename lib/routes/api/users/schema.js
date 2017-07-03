const Joi = require('joi')

exports.remove = function (obj) {
  const schema = Joi.object().keys({
    uid: Joi.string()
  })

  return Joi.validate(obj, schema)
}
