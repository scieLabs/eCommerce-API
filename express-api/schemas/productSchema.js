const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    categoryId: Joi.number().integer().required()
  });

  module.exports = { userSchema, productSchema, categorySchema, orderSchema };