import { Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';
import User from './User.js';
import Product from './Product.js';
config();

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// const { DataTypes } = require('sequelize');
// const sequelize = require('../db/index.js');
// const User = require('./User.js');
// const Product = require('./Product.js');

// Order Model
const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  productId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Product, key: 'id' } },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'shipped', 'delivered'), allowNull: false }
});

// module.exports = Order;

sequelize.sync();

export default Order;