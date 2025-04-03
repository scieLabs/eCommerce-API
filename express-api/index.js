// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const { connectDB } = require('./db/index');
// const userRouter = require('./routes/userRouter');
// const productRouter = require('./routes/productRouter');
// const categoryRouter = require('./routes/categoryRouter');
// const orderRouter = require('./routes/orderRouter');
// const { errorHandler } = require('./middleware');

import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { connectDB } from './db/index.js';
import userRouter from './routes/userRouter.js'
import productRouter from './routes/productRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import orderRouter from './routes/orderRouter.js'
// import { userRouter, productRouter, categoryRouter, orderRouter } from './routes/index.js'
import { errorHandler } from './middleware/middleware.js';

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/orders', orderRouter);

// Error handling middleware
app.use(errorHandler);

// Connect to database and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Database connection failed:', error);
});


// // Sync Database & Start Server
// const PORT = process.env.PORT || 5000;
// sequelize.sync().then(() => {
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch(err => console.error('Database sync error:', err));