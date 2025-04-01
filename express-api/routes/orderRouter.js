// const express = require('express');
// const OrderController = require('../controllers/OrderController.js');

import express from 'express';
import OrderController from '../controllers/OrderController.js'

const router = express.Router();

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);

export default router;