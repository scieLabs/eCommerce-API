import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

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