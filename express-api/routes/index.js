// const express = require('express');
// const userRouter = require('./routes/userRouter.js');
// const productRouter = require('./routes/productRouter.js');
// const categoryRouter = require('./routes/categoryRouter.js');
// const orderRouter = require('./routes/orderRouter.js');

import express from 'express';
import userRouter from './userRouter.js';
import productRouter from './productRouter.js';
import categoryRouter from './categoryRouter.js';
import orderRouter from './orderRouter.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/orders', orderRouter);

export default router;