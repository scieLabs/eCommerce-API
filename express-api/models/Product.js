import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

try {
  await sequelize.authenticate();
  console.log('Database connected');
} catch (error) {
  console.error('Database connection error:', error);
}

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true, 
    validate: {
      min: 0
    }
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  }
}, {
  timestamps: true
});

export default Product;
