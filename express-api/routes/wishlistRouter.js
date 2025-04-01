const express = require('express');
const router = express.Router();
const { Wishlist } = require('../models/Wishlist');
const Joi = require('joi');
const sequelize = require('../db'); // Ensure Sequelize is initialized

// Validation schema
const wishlistSchema = Joi.object({
  userId: Joi.number().integer().required(),
  productId: Joi.number().integer().required()
});

// Add item to wishlist
router.post('/', async (req, res) => {
  try {
    const { error } = wishlistSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const wishlistItem = await Wishlist.create(req.body);
    res.status(201).json(wishlistItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all wishlist items for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const wishlistItems = await Wishlist.findAll({ where: { userId: req.params.userId } });
    res.json(wishlistItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove item from wishlist
router.delete('/:id', async (req, res) => {
  try {
    const wishlistItem = await Wishlist.findByPk(req.params.id);
    if (!wishlistItem) return res.status(404).json({ error: 'Wishlist item not found' });
    
    await wishlistItem.destroy();
    res.json({ message: 'Wishlist item removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;