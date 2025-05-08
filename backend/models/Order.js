import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  shopId: {
    type: String, // ← changed from ObjectId to String
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productCode: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  customer: {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  total: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
