const Joi = require('joi');

// Middleware to validate request body based on schema
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

// Middleware to check authentication (placeholder example)
const authenticateUser = (req, res, next) => {
  // Authentication logic (e.g., JWT verification) would go here
  next();
};

module.exports = { validateRequest, errorHandler, authenticateUser };