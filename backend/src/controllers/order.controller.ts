import { Request, Response } from 'express';
import { Order } from '../models/order.model';
import { Server } from 'socket.io';


// Create Order

export const createOrder = async (req: Request, res: Response, io: Server) => {
  try {
    const order = new Order(req.body);
    await order.save();
    
    // Emit event to notify about the new order
    io.emit('newOrder', order);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};



// Get all Orders

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find();
    if(!orders){
        res.status(404).json({ message: 'No Orders found'})
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Get Single Order by ID
export const getOrder = async (req: Request, res: Response) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

// Update Order

export const updateOrderStatus = async (req: Request, res: Response, io: Server) => {
  try {
    const { id } = req.params;
    const updatedProperties  = req.body;
    const order = await Order.findByIdAndUpdate(id, updatedProperties, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Emit event to notify about the order status update
    io.emit('orderUpdated', order);

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


//DELETE Order

export const deleteOrder = async (req: Request, res: Response, io: Server) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Emit event to notify about the order deletion
    io.emit('orderDeleted', id);

    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
