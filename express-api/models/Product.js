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
    allowNull: true, // ✅ Name should not be null
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: true, // ✅ Price should not be null
    validate: {
      min: 0
    }
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: true, // If categories are optional, this is fine
  }
}, {
  timestamps: true
});

export default Product;
