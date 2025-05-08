import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const vendorSchema = new mongoose.Schema(
  {
    vendorId: {
      type: String,
      unique: true,
      default: () => `VEND-${uuidv4()}`,
    },
    shopId: {
      type: String, // ← changed from ObjectId to String
      ref: "Shop",
      required: false,
    },

    vendorName: { type: String, required: true },
    businessName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },

    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },

    businessDetails: {
      businessType: String,
      category: String,
      gstin: String,
      panNumber: String,
      registrationNumber: String,
      yearsInOperation: Number,
    },

    banking: {
      accountHolderName: String,
      accountNumber: String,
      ifscCode: String,
      bankName: String,
      branchName: String,
      upiId: String,
    },

    operations: {
      inventoryTypes: [String],
      shippingMethods: [String],
      paymentTerms: String,
      deliveryTimeline: String,
      returnPolicy: String,
      supportContact: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Vendor", vendorSchema);
