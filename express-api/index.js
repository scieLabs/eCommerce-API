import express from 'express';
import sequelize from './db/index.js';  // 
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import categoryRouter from './routes/categoryRouter.js'
import { errorHandler } from './middleware/middleware.js';
import cors from 'cors';
import { config } from 'dotenv';

const app = express();
const PORT = process.env.PORT || 5000;
// app.use('/products', productRoutes);

 sequelize.sync().then(() => {
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Database sync error:', err));


app.use(express.json());


config();



// Middleware
app.use(cors());

app.use('/uploads', express.static('uploads'));

// Routes
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/orders', orderRouter);

// Error handling middleware
app.use(errorHandler);