import { Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';
config();


// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Category Model
const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

// Sync the model with the database
//sequelize.sync(); // Uncomment this line to create the table if it doesn't exist

export default Category;