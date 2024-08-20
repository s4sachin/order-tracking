import express from 'express';
import { createOrder, getOrders, updateOrderStatus, deleteOrder, getOrder } from '../controllers/order.controller';
import { Server } from 'socket.io';

const router = express.Router();

export default (io: Server) => {
  router.post('/orders', (req, res) => createOrder(req, res, io));
  router.get('/orders', getOrders);
  router.get('/orders/:id', getOrder);
  router.put('/orders/:id', (req, res) => updateOrderStatus(req, res, io));
  router.delete('/orders/:id', (req, res) => deleteOrder(req, res, io));

  return router;
};