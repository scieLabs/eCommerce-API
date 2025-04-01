const express = require('express');
const router = express.Router();
const { Shipment } = require('../models/Shipment');
const Joi = require('joi');
const sequelize = require('../db'); // Ensure Sequelize is initialized

// Validation schema
const shipmentSchema = Joi.object({
  orderId: Joi.number().integer().required(),
  trackingNumber: Joi.string().required(),
  carrier: Joi.string().required(),
  status: Joi.string().valid('pending', 'shipped', 'delivered', 'returned').required(),
  estimatedDelivery: Joi.date().required()
});

// Create a new shipment
router.post('/', async (req, res) => {
  try {
    const { error } = shipmentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const shipment = await Shipment.create(req.body);
    res.status(201).json(shipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all shipments
router.get('/', async (req, res) => {
  try {
    const shipments = await Shipment.findAll();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a shipment by tracking number
router.get('/tracking/:trackingNumber', async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ where: { trackingNumber: req.params.trackingNumber } });
    if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update shipment status
router.put('/:id', async (req, res) => {
  try {
    const { error } = shipmentSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const shipment = await Shipment.findByPk(req.params.id);
    if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
    
    await shipment.update(req.body);
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a shipment record
router.delete('/:id', async (req, res) => {
  try {
    const shipment = await Shipment.findByPk(req.params.id);
    if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
    
    await shipment.destroy();
    res.json({ message: 'Shipment record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
