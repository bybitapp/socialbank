const Joi = require('joi')

exports.bank = function (obj) {
  const schema = Joi.object().keys({
    id: Joi.string(),
    owner: Joi.string().min(3).required(),
    bankName: Joi.string().min(3).required(),
    ibanCode: Joi.string().regex(/^[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}$/).required(),
    swiftCode: Joi.string().regex(/^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/).required()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}

exports.remove = function (obj) {
  const schema = Joi.object().keys({
    bid: Joi.string()
  })

  return Joi.validate(obj, schema, {stripUnknown: true})
}
