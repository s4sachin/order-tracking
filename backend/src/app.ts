import express from 'express';
import cors from 'cors';
import { Order } from './models/order.model';

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Server is running...');
});



// Order Routes
app.get('/api/orders', async (req, res) => {
  const orders = await Order.find();
  res.status(200).json(orders);
});

// Export the app for use in the server
export default app;
