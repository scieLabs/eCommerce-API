const express = require('express');
const router = express.Router();
const { Order } = require('../models/Order');
const Joi = require('joi');
const sequelize = require('../db'); // Ensure Sequelize is initialized

// Validation schema
const orderSchema = Joi.object({
  userId: Joi.number().integer().required(),
  totalAmount: Joi.number().positive().required(),
  status: Joi.string().valid('pending', 'shipped', 'delivered', 'canceled').required()
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an order
router.put('/:id', async (req, res) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    
    await order.update(req.body);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    
    await order.destroy();
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;