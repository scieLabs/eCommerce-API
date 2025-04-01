import { Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';
import Category from './Category.js';
config();

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// const { DataTypes } = require('sequelize');
// const sequelize = require('../db/index');
// const Category = require('./Category.js');

// Product Model
const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  categoryId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Category, key: 'id' } }
});

// module.exports = Product;

sequelize.sync();

export default Product;