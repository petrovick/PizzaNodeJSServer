const Joi = require('joi')

module.exports = {
  body: {
    name: Joi.string().required(),
    url: Joi.string().required(),
    product_id: Joi.number().integer()
  }
}
