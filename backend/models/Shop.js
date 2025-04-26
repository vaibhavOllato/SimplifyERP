// models/Shop.js
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const taxRateSchema = new mongoose.Schema({
  category: { type: String, required: true },
  rate: { type: Number, required: true },
});

// const socialLinksSchema = new mongoose.Schema({
//   instagram: { type: String },
//   facebook: { type: String },
//   twitter: { type: String },
// });

// const locationSchema = new mongoose.Schema({
//   lat: { type: Number },
//   lng: { type: Number },
// });

// const managerSchema = new mongoose.Schema({
//   name: { type: String },
//   phone: { type: String },
//   email: { type: String },
// });

const shopSchema = new mongoose.Schema({
  shopId: { type: String, unique: true },

  userId: {
    required: true,
    type: String,
    ref: "User",
  },
  shopName: { type: String, required: true },
  shopType: { type: String, required: true },
  secondaryCategories: [{ type: String }],
  // logo: { type: String }, 
  address: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  website: { type: String },
  // socialLinks: socialLinksSchema,
  // location: locationSchema,
  openingTime: { type: String },
  closingTime: { type: String },
  // paymentMethods: [{ type: String }], 
  gstNumber: { type: String },
  taxRates: [taxRateSchema],
  // status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  verified: { type: Boolean, default: false },
  // manager: managerSchema,
  createdAt: { type: Date, default: Date.now },
});

// 👉 Pre-save hook to generate unique shopId
shopSchema.pre("save", function (next) {
  if (!this.shopId) {
    this.shopId = `SHOP-${uuidv4().slice(0, 8).toUpperCase()}`;
  }
  next();
});

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
