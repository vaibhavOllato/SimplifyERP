import Order from '../models/Order.js';
import { v4 as uuidv4 } from 'uuid';

// Create new order
export const createOrder = async (req, res) => {
  try {
    const {
        shopId,
      productName,
      productCode,
      size,
      customerName,
      mobile,
      email,
      address,
      total,
    } = req.body;

    // Generate a unique order ID (e.g. ORD-20240430-xxxx)
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const uniqueCode = uuidv4().split('-')[0].toUpperCase(); // short UUID
    const orderId = `ORD-${date}-${uniqueCode}`;

    const newOrder = new Order({
        shopId,
      orderId,
      productName,
      productCode,
      size,
      customer: {
        name: customerName,
        mobile,
        email,
        address,
      },
      total,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders', details: err.message });
  }
};
