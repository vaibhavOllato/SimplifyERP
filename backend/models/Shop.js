import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Tax Rate Schema
const taxRateSchema = new mongoose.Schema({
  category: { type: String, required: true },
  rate: { type: Number, required: true },
});

// Shop Schema
const shopSchema = new mongoose.Schema({
  // shopId: { type: String, unique: true }, // Unique Shop Identifier
  shopId: { type: String, unique: true },

  userId: {
    type: String, // UserId is of type String to match your custom format.
    required: true,
    ref: "User", // Reference to User collection
  },

  shopName: { type: String, required: true },
  shopType: { type: String, required: true }, // Category or Type of Shop
  secondaryCategories: [{ type: String }], // Additional categories for the shop
  address: { type: String, required: true }, // Shop Address
  phone: { type: String }, // Shop Phone Number
  email: { type: String }, // Shop Email
  website: { type: String }, // Shop Website

  openingTime: { type: String }, // Shop Opening Time
  closingTime: { type: String }, // Shop Closing Time

  gstNumber: { type: String }, // GST Number

  taxRates: [taxRateSchema], // Array of tax rate objects

  verified: { type: Boolean, default: false }, // Shop Verification Status
  ownerName: { type: String, required: true }, // Shop Owner Name
  createdAt: { type: Date, default: Date.now }, // Date of Shop Creation

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
    // ✅ Add this line
  isActive: { type: Boolean, default: false },
});

// Pre-save Hook to Generate Unique ShopId
shopSchema.pre("save", function (next) {
  if (!this.shopId) {
    this.shopId = `SiERP-SHOP-${uuidv4().slice(0, 8).toUpperCase()}`; // Generates unique ShopId
  }
  next();
});

// Create and Export the Shop Model
const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
