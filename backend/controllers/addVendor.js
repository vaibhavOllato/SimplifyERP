import Vendor from "../models/vendorModel.js";
import { v4 as uuidv4 } from "uuid";
// import bcrypt from "bcrypt";

export const addVendor = async (req, res) => {
  try {
    const {
      shopId,
      vendorName,
      businessName,
      email,
      phone,
      address,
      businessDetails,
      banking,
      operations,
    } = req.body;

    // Check if vendor already exists by email
    const exists = await Vendor.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Vendor already exists with this email" });
    }

    // Generate unique vendor ID
    const vendorId = `VEND-${shopId}-${uuidv4().slice(0, 8).toUpperCase()}`;

   

    // Create vendor
    const newVendor = new Vendor({
      vendorId,
      shopId,
      vendorName,
      businessName,
      email,
      phone,
      address,
      businessDetails,
      banking,
      operations,
    });

    await newVendor.save();
    res.status(201).json({ message: "Vendor added successfully", vendorId });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};




export const getVendorsByShopId = async (req, res) => {
  try {
    const { shopId } = req.body; 

    if (!shopId) {
      return res.status(400).json({ message: "shopId is required" });
    }

    const vendors = await Vendor.find({ shopId });

    if (!vendors || vendors.length === 0) {
      return res.status(404).json({ message: 'No vendors found for this shop' });
    }

    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
