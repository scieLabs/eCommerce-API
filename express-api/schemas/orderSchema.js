const Joi = require('joi');

const orderSchema = Joi.object({
    userId: Joi.number().integer().required(),
    productId: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required(),
    status: Joi.string().valid('pending', 'shipped', 'delivered').required()
  });

  module.exports = { userSchema, productSchema, categorySchema, orderSchema };