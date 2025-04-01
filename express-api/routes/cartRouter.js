const express = require('express');
const router = express.Router();
const { Cart } = require('../models/Cart');
const Joi = require('joi');
const sequelize = require('../db'); // Ensure Sequelize is initialized

// Validation schema
const cartSchema = Joi.object({
  userId: Joi.number().integer().required(),
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required()
});

// Add item to cart
router.post('/', async (req, res) => {
  try {
    const { error } = cartSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const cartItem = await Cart.create(req.body);
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all items in the cart for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const cartItems = await Cart.findAll({ where: { userId: req.params.userId } });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update cart item quantity
router.put('/:id', async (req, res) => {
  try {
    const { error } = cartSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const cartItem = await Cart.findByPk(req.params.id);
    if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });
    
    await cartItem.update(req.body);
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove item from cart
router.delete('/:id', async (req, res) => {
  try {
    const cartItem = await Cart.findByPk(req.params.id);
    if (!cartItem) return res.status(404).json({ error: 'Cart item not found' });
    
    await cartItem.destroy();
    res.json({ message: 'Cart item removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;