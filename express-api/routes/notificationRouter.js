const express = require('express');
const router = express.Router();
const { Notification } = require('../models/Notification');
const Joi = require('joi');
const sequelize = require('../db'); // Ensure Sequelize is initialized

// Validation schema
const notificationSchema = Joi.object({
  userId: Joi.number().integer().required(),
  message: Joi.string().required(),
  status: Joi.string().valid('unread', 'read').required()
});

// Create a new notification
router.post('/', async (req, res) => {
  try {
    const { error } = notificationSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all notifications for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const notifications = await Notification.findAll({ where: { userId: req.params.userId } });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update notification status
router.put('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    
    await notification.update({ status: 'read' });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a notification
router.delete('/:id', async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: 'Notification not found' });
    
    await notification.destroy();
    res.json({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;