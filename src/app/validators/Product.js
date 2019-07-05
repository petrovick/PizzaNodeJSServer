const Joi = require('joi')

module.exports = {
  body: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    time: Joi.number()
      .integer()
      .required()
  }
}
