const Joi = require('joi')

module.exports = {
  body: {
    description: Joi.string().required(),
    url: Joi.string().required(),
    price: Joi.number().required(),
    product_type_id: Joi.number()
      .integer()
      .required()
  }
}
