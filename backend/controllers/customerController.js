import Customer from "../models/customerSchema.js";

export const createCustomer = async (req, res) => {
  try {
    const { name, phone, email, shopId } = req.body;

    if (!shopId) {
      return res.status(400).json({ message: "shopId is required" });
    }

    const exists = await Customer.findOne({ email, shopId });
    if (exists) {
      return res
        .status(400)
        .json({
          message: "Customer already exists with this email for the shop",
        });
    }

    // Count existing customers for this shop
    const count = await Customer.countDocuments({ shopId });

    // Generate new customerId
    const customerId = `${shopId}-CUST${String(count + 1).padStart(3, "0")}`;

    const customer = new Customer({ name, phone, email, shopId, customerId });
    await customer.save();

    res
      .status(201)
      .json({ message: "Customer created successfully", customer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const { shopId } = req.query;

    if (!shopId) {
      return res.status(400).json({ message: "shopId is required" });
    }

    const customers = await Customer.find({ shopId }).sort({ createdAt: -1 });
    res.status(200).json({ customers });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch customers" });
  }
};

// // ✅ Get total customers grouped by shopId
// export const getCustomerCountsByShop = async (req, res) => {
//   try {
//     const shopCustomerCounts = await Customer.aggregate([
//       {
//         $group: {
//           _id: "$shopId",
//           totalCustomers: { $sum: 1 }
//         }
//       },
//       {
//         $project: {
//           shopId: "$_id",
//           totalCustomers: 1,
//           _id: 0
//         }
//       }
//     ]);

//     res.status(200).json({ shopCustomerCounts });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Failed to count customers' });
//   }
// };

export const getCustomerCountsByShop = async (req, res) => {
  try {
    const shopId = req.query.shopId; // Getting shopId from query params

    if (!shopId) {
      return res.status(400).json({ message: "Shop ID is required" });
    }

    const shopCustomerCounts = await Customer.aggregate([
      {
        $match: {
          shopId: shopId, // Ensure the shopId is being passed and matched correctly
        },
      },
      {
        $group: {
          _id: "$shopId",
          totalCustomers: { $sum: 1 }, // Count the number of customers per shopId
        },
      },
      {
        $project: {
          shopId: "$_id",
          totalCustomers: 1,
          _id: 0, // Exclude the _id field from the result
        },
      },
    ]);

    // Check the result of the aggregation
    if (shopCustomerCounts.length === 0) {
      return res
        .status(200)
        .json({ message: "No customers found for this shop." });
    }

    res.status(200).json({ shopCustomerCounts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to count customers" });
  }
};
