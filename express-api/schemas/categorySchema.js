// const Joi = require('joi');

import Joi from 'joi';

export const categorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(255)
});

// export default categorySchema;