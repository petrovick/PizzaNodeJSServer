const Joi = require('joi')

module.exports = {
  body: {
    date: Joi.date().required(),
    total_price: Joi.number().required(),
    obs: Joi.string().required(),
    zip: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.number().required(),
    neighborhood: Joi.string().required()
  }
}
