const express = require('express');
const router = express.Router();
const { Address } = require('../models/Address');
const Joi = require('joi');
const sequelize = require('../db'); // Ensure Sequelize is initialized

// Validation schema
const addressSchema = Joi.object({
  userId: Joi.number().integer().required(),
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().required(),
  country: Joi.string().required()
});

// Create a new address
router.post('/', async (req, res) => {
  try {
    const { error } = addressSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const address = await Address.create(req.body);
    res.status(201).json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all addresses for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const addresses = await Address.findAll({ where: { userId: req.params.userId } });
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an address
router.put('/:id', async (req, res) => {
  try {
    const { error } = addressSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ error: 'Address not found' });
    
    await address.update(req.body);
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an address
router.delete('/:id', async (req, res) => {
  try {
    const address = await Address.findByPk(req.params.id);
    if (!address) return res.status(404).json({ error: 'Address not found' });
    
    await address.destroy();
    res.json({ message: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
