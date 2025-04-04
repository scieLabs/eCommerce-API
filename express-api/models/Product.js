import { Sequelize, DataTypes } from 'sequelize';


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
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
    allowNull: true
  }
}, {
  timestamps: true
});

export default Product; // ✅ Use export default
