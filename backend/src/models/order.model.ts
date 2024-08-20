import { Schema, model, Document } from 'mongoose';

interface IOrder extends Document {
  orderName: string;
  orderItems: string[];
  status: string;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  orderName: { type: String, required: true },
  orderItems: { type: [String], required: true },
  status: { type: String, default: 'pending' }
}, 
{timestamps: true});

export const Order = model<IOrder>('Order', orderSchema);