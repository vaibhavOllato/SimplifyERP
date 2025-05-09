import Customer from '../models/customerSchema.js';
import Shop from '../models/Shop.js';
import Bill from '../models/billSchema.js';

export const createBill = async (req, res) => {
  try {
    const {
      customerId,
      customerData,
      shopId,
      products,
      totalAmount,
    } = req.body;

    // 1. Get customer data from inline or DB
    let customer;
    if (customerData && customerData.name) {
      customer = {
        name: customerData.name,
        phone: customerData.phone,
        email: customerData.email,
        address: customerData.address,
        customerId: null,
      };
    } else if (customerId) {
      const existingCustomer = await Customer.findById(customerId);
      if (!existingCustomer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      customer = {
        name: existingCustomer.name,
        phone: existingCustomer.phone,
        email: existingCustomer.email,
        address: existingCustomer.address,
        customerId: existingCustomer._id,
      };
    } else {
      return res.status(400).json({ error: 'Customer data or ID required' });
    }

    // 2. Get shop data
    const shop = await Shop.findOne({ shopId });
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    // 3. Create bill
    const newBill = new Bill({
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      customerAddress: customer.address,
      customerId: customer.customerId,
      shopId,
      shopOwnerName: shop.ownerName,
      shopEmail: shop.email,
      businessName: shop.businessName,
      products,
      totalAmount,
    });

    const savedBill = await newBill.save();
    res.status(201).json(savedBill);
  } catch (error) {
    console.error('Error creating bill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getBills = async (req, res) => {
    try {
      const { shopId, customerId } = req.query;
  
      const query = {};
      if (shopId) query.shopId = shopId;
      if (customerId) query.customerId = customerId;
  
      const bills = await Bill.find(query).sort({ createdAt: -1 });
      res.status(200).json({ bills });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };