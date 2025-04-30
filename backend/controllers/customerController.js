import Customer from '../models/customerSchema.js';

export const createCustomer = async (req, res) => {
  try {
    const { name, phone, email, shopId } = req.body;

    if (!shopId) {
      return res.status(400).json({ message: 'shopId is required' });
    }

    const exists = await Customer.findOne({ email, shopId });
    if (exists) {
      return res.status(400).json({ message: 'Customer already exists with this email for the shop' });
    }

    // Count existing customers for this shop
    const count = await Customer.countDocuments({ shopId });

     // Generate new customerId
     const customerId = `${shopId}-CUST${String(count + 1).padStart(3, '0')}`;

    const customer = new Customer({ name, phone, email, shopId, customerId });
    await customer.save();

    res.status(201).json({ message: 'Customer created successfully', customer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const { shopId } = req.query;

    if (!shopId) {
      return res.status(400).json({ message: 'shopId is required' });
    }

    const customers = await Customer.find({ shopId }).sort({ createdAt: -1 });
    res.status(200).json({ customers });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch customers' });
  }
};
