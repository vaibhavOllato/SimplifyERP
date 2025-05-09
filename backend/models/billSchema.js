// models/Bill.js
import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  customerEmail: String,
  customerAddress: String,
  customerId: String,
  shopId: String,
  shopOwnerName: String,
  shopEmail: String,
  businessName: String,
  products: [{ name: String, quantity: Number, price: Number }],
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Bill', billSchema);
