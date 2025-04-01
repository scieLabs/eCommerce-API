import express from 'express';
import { config } from 'dotenv';
import multer from 'multer'
import Sequelize from 'sequelize';
import fs from 'fs';
import Joi from 'joi';
import cors from 'cors';
import userRouter from './routes/userRouter.js'
import categoryRouter from './routes/categoryRouter.js'
import orderRouter from './routes/orderRouter.js'
import productRouter from './routes/productRouter.js'
import { errorHandler } from './middleware/middleware.js';


const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./db/index.js');
const userRouter = require('./routes/userRouter.js');
const productRouter = require('./routes/productRouter.js');
const categoryRouter = require('./routes/categoryRouter.js');
const orderRouter = require('./routes/orderRouter.js');
const { errorHandler } = require('./middleware/middleware.js');


// Load environment variables
require('dotenv').config();
dotenv.config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Sequelize } = require('sequelize');
const fs = require('fs');
const Joi = require('joi');

// Initialize Express
const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Load Models
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');

User.init(
    {
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
    },
    { sequelize, modelName: 'user' }
);

Product.init(
    {
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING },
      price: { type: Sequelize.FLOAT, allowNull: false },
      categoryId: { type: Sequelize.INTEGER, allowNull: false },
    },
    { sequelize, modelName: 'product' }
);

Category.init(
    {
      name: { type: Sequelize.STRING, allowNull: false },
    },
    { sequelize, modelName: 'category' }
);

Order.init(
    {
      userId: { type: Sequelize.INTEGER, allowNull: false },
      products: { type: Sequelize.JSON, allowNull: false },
      total: { type: Sequelize.FLOAT, allowNull: false },
    },
    { sequelize, modelName: 'order' }
);


// Associations
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Order.belongsTo(User, { foreignKey: 'userId' });
Order.hasMany(Product, { foreignKey: 'id' });

// Routes
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const categoryRouter = require('./routers/categoryRouter');
const orderRouter = require('./routers/orderRouter');

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/orders', orderRouter);

// Error handling middleware
app.use(errorHandler);

// Server Start
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, async () => {
//   await sequelize.sync();
//   console.log(`Server running on port ${PORT}`);
// });

// Sync Database & Start Server
const PORT = process.env.PORT || 5000;
sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Database sync error:', err));
