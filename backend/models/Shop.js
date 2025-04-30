// // models/Shop.js
// import mongoose from "mongoose";
// import { v4 as uuidv4 } from "uuid";

// const taxRateSchema = new mongoose.Schema({
//   category: { type: String, required: true },
//   rate: { type: Number, required: true },
// });

// // const socialLinksSchema = new mongoose.Schema({
// //   instagram: { type: String },
// //   facebook: { type: String },
// //   twitter: { type: String },
// // });

// // const locationSchema = new mongoose.Schema({
// //   lat: { type: Number },
// //   lng: { type: Number },
// // });

// // const managerSchema = new mongoose.Schema({
// //   name: { type: String },
// //   phone: { type: String },
// //   email: { type: String },
// // });

// const shopSchema = new mongoose.Schema({
//   shopId: { type: String, unique: true },

//   userId: {
//     required: true,
//     type: String,
//     ref: "User",
//   },
//   shopName: { type: String, required: true },
//   shopType: { type: String, required: true },
//   secondaryCategories: [{ type: String }],
//   // logo: { type: String }, 
//   address: { type: String, required: true },
//   phone: { type: String },
//   email: { type: String },
//   website: { type: String },
//   // socialLinks: socialLinksSchema,
//   // location: locationSchema,
//   openingTime: { type: String },
//   closingTime: { type: String },
//   // paymentMethods: [{ type: String }], 
//   gstNumber: { type: String },
//   taxRates: [taxRateSchema],
//   // status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
//   verified: { type: Boolean, default: false },
//   // manager: managerSchema,
//   createdAt: { type: Date, default: Date.now },
// });

// // 👉 Pre-save hook to generate unique shopId
// shopSchema.pre("save", function (next) {
//   if (!this.shopId) {
//     this.shopId = `SHOP-${uuidv4().slice(0, 8).toUpperCase()}`;
//   }
//   next();
// });

// const Shop = mongoose.model("Shop", shopSchema);
// export default Shop;



import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

// Tax Rate Schema
const taxRateSchema = new mongoose.Schema({
  category: { type: String, required: true },
  rate: { type: Number, required: true },
});

// Shop Schema
const shopSchema = new mongoose.Schema({
  shopId: { type: String, unique: true }, // Unique Shop Identifier
  
  userId: {
    type: String, // UserId is of type String to match your custom format.
    required: true,
    ref: "User",  // Reference to User collection
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
  
  createdAt: { type: Date, default: Date.now }, // Date of Shop Creation
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
