const express = require('express');
const router = express.Router();
const { Payment } = require('../models/Payment');
const Joi = require('joi');
const sequelize = require('../db'); // Ensure Sequelize is initialized

// Validation schema
const paymentSchema = Joi.object({
  userId: Joi.number().integer().required(),
  orderId: Joi.number().integer().required(),
  amount: Joi.number().positive().required(),
  status: Joi.string().valid('pending', 'completed', 'failed').required()
});

// Process a payment
router.post('/', async (req, res) => {
  try {
    const { error } = paymentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a payment by ID
router.get('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update payment status
router.put('/:id', async (req, res) => {
  try {
    const { error } = paymentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    
    await payment.update(req.body);
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a payment record
router.delete('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    
    await payment.destroy();
    res.json({ message: 'Payment record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;