import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => console.log('✅ Connected to PostgreSQL via Sequelize'))
  .catch((err) => console.error('❌ Database connection error:', err));

export default sequelize;  // ✅ Use default export
