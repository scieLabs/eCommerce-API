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

// Order Model
const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' } },
  productId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Product, key: 'id' } },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  total: { type: DataTypes.INTEGER, allowNull: false }
});

sequelize.sync();

export default Order;