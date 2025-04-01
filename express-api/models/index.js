// const { sequelize } = require('../db/index.js');
// const User = require('./User.js');
// const Product = require('./Product.js');
// const Category = require('./Category.js');
// const Order = require('./Order.js');

import { Sequelize } from 'sequelize';
import User from './User.js';
import Product from './Product.js';
import Category from './Category.js';
import Order from './Order.js';

// Define associations
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Product.hasMany(Order, { foreignKey: 'productId' });
Order.belongsTo(Product, { foreignKey: 'productId' });

export default { Sequelize, User, Product, Category, Order };