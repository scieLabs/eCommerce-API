// const { Sequelize } = require('sequelize');
// require('dotenv').config();

import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
//   host: process.env.DB_HOST,
//   dialect: 'postgres',
//   logging: false,
// });

// Initialize Sequelize
export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
  });

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const syncDatabase = async () => {
    try {
      console.log('Syncing database in correct order...');
  
    //   await sequelize.sync({ force: true }); // WARNING: This will drop and recreate tables
  
      console.log('Database synced successfully.');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  };
  
  syncDatabase();

// module.exports = { sequelize, connectDB };