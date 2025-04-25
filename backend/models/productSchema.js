import mongoose from "mongoose";

// Define the product schema
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productCode: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,  
  },
  size: [String],  // Sizes will be an array of strings, e.g., ['S', 'M', 'L']
  color: [String],  // Array of colors, e.g., ['Red', 'Blue', 'Black']
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Out of Stock'],
    default: 'Available',
  },
  shopId: {  // Custom shopId field
    type: String,
    required: true,
    unique: true,
  },
});

// Create the product model
const Product = mongoose.model('Product', productSchema);

export default Product;
