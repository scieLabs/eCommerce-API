import { Sequelize, DataTypes } from "sequelize";
import { config } from "dotenv";

config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
});

const PRODUCT = sequelize.define(
  "PRODUCT",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notNull: {
          msg: "Name is required",
        },
        len: {
          args: [3, 255],
          msg: "Name must be at least 3 characters long",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true, 
      validate: {
        isPositive(value) {
          if (value !== null && value <= 0) {
            throw new Error("Price must be a positive number");
          }
        },
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      validate: {
        isInt: {
          msg: "Category ID must be an integer",
        },
      },
    },
  },
  {
    tableName: "products",
    timestamps: false,
  }
);

export default PRODUCT;
