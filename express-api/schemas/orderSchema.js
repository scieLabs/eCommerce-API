// const Joi = require('joi');
import Joi from 'joi';

export const orderSchema = Joi.object({
  userId: Joi.number().integer().required(),
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
  totalPrice: Joi.number().positive().required(),
  status: Joi.string().valid('pending', 'shipped', 'delivered', 'cancelled').default('pending')
});

// module.exports = orderSchema;