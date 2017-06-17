const Joi = require('joi')

exports.card = function (obj) {
  const schema = Joi.object().keys({
    name: Joi.string().min(5).max(30).required(),
    pid: Joi.string().required(),
    cid: Joi.string(),
    status: Joi.string()
  })

  return Joi.validate(obj, schema)
}

exports.delete = function (obj) {
  const schema = Joi.object().keys({
    cid: Joi.string().required()
  })

  return Joi.validate(obj, schema)
}

exports.updateStatus = function (obj) {
  const schema = Joi.object().keys({
    cid: Joi.string().required(),
    status: Joi.string().required()
  })

  return Joi.validate(obj, schema)
}

exports.transfer = function (obj) {
  const schema = Joi.object().keys({
    amount: Joi.number().positive().required(),
    cid: Joi.string().required(),
    pid: Joi.string().required()
  })

  return Joi.validate(obj, schema)
}
