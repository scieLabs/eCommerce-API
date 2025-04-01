const express = require('express');
const router = express.Router();
const { Review } = require('../models/Review');
const Joi = require('joi');
const sequelize = require('../db'); // Ensure Sequelize is initialized

// Validation schema
const reviewSchema = Joi.object({
  userId: Joi.number().integer().required(),
  productId: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().optional()
});

// Create a new review
router.post('/', async (req, res) => {
  try {
    const { error } = reviewSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get reviews for a specific product
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.findAll({ where: { productId: req.params.productId } });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single review
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a review
router.put('/:id', async (req, res) => {
  try {
    const { error } = reviewSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    
    await review.update(req.body);
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a review
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });
    
    await review.destroy();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;