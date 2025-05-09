import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema(
  {
    shopId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      unique: true, // Ensure uniqueness
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Customer', customerSchema);
