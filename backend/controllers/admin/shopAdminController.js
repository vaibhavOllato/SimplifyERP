import Shop from "../../models/Shop.js"; // Import the Shop model

// Controller to fetch all shop details
export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find(); // Fetch all shops
    res.json(shops); // Send the data as JSON response
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ error: "Failed to fetch shops" });
  }
};


export const activateShop = async (req, res) => {
  const { shopId } = req.params;

  try {
    const shop = await Shop.findById(shopId);
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    shop.isActive = true;
    await shop.save();

    // Emit activation event
    req.io.emit("shopActivated", shop);

    return res.status(200).json({ message: "Shop activated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Controller to fetch only pending (unapproved) shops
export const getPendingShops = async (req, res) => {
  try {
    const pendingShops = await Shop.find({ isActive: false });
    res.json(pendingShops);
  } catch (error) {
    console.error("Error fetching pending shops:", error);
    res.status(500).json({ error: "Failed to fetch pending shops" });
  }
};

// export const approveShop = async (req, res) => {
//   const { shopId } = req.params;

//   // Ensure req.admin is populated
//   if (!req.admin || !req.admin.email) {
//     return res
//       .status(403)
//       .json({ message: "Access denied. Admin not authenticated." });
//   }

//   try {
//     const shop = await Shop.findOne({ shopId: shopId });

//     if (!shop) {
//       return res.status(404).json({ message: "Shop not found" });
//     }

//     shop.status = "approved";
//     shop.approvedBy = req.admin.email; // Use req.admin.email here
//     shop.approvalMessage = "Approved by super admin";

//     await shop.save();

//     res.status(200).json({
//       message: "Shop approved successfully",
//       shop,
//     });
//   } catch (error) {
//     console.error("Error approving shop:", error);
//     res.status(500).json({ message: "Failed to approve shop" });
//   }
// };

// export const notifyNewShop = async (req, res) => {
//   try {
//     const newShop = await Shop.findOne({ status: "pending" }).sort({
//       createdAt: -1,
//     }); // Get the most recent pending shop
//     if (!newShop) {
//       return res
//         .status(404)
//         .json({ message: "No new shops pending verification" });
//     }

//     res.json({
//       newShop: { shopId: newShop.shopId, shopName: newShop.shopName },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// Controller to fetch the number of registered shops
export const getShopCount = async (req, res) => {
  try {
    const shopCount = await Shop.countDocuments(); // Count all shops
    res.json({ count: shopCount });
  } catch (error) {
    console.error("Error counting shops:", error);
    res.status(500).json({ error: "Failed to count shops" });
  }
};
