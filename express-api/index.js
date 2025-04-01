import express from 'express';
import sequelize from './db/index.js';  // Ensure this path is correct
import productRoutes from './Routers/productRouter.js';  // Correct casing and extension

const app = express();

app.use(express.json());
app.use('/products', productRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log('✅ Database connected');
  app.listen(5000, () => console.log('🚀 Server running on port 5000'));
});
