import { generateShopId } from "../utils/generateShopId.js";
import Shop from "../models/Shop.js";

// Function to create a shop
export const createShop = async (req, res) => {
  try {
    const shopId = generateShopId(req.body.shopName);
    console.log("Shop data:", req.body);

    // Get userId from session
    const userId = req.session.user?.userId;

    // If no user is found in session, return unauthorized
    if (!userId) {
      return res.status(401).json({ message: "User is not authenticated." });
    }

    // Add userId to the shop details
    const newShop = new Shop({ ...req.body, shopId, userId });
    await newShop.save();

    // Clear any existing shopId first
    delete req.session.shopId;

    // Store the shopId in the session after shop creation
    req.session.shopId = newShop.shopId; // Store shopId in session
    console.log("✅ New Shop ID set in session:", newShop.shopId);
    //  await req.session.save();
    await req.session.save((err) => {
      if (err) {
        console.error("❌ Error saving session:", err);
      } else {
        console.log("✅ Session saved with new shopId:", req.session.shopId);
      }
    });
    console.log("Session data after storing shopId:", req.session);

    // res.status(201).json({ message: "Shop created successfully", shop: newShop,   shopId: newShop.shopId, });
    res.status(201).json({
      message: "Shop created successfully",
      shop: newShop,
      shopId: newShop.shopId, // Optionally return shopId
    });
  } catch (error) {
    console.error("Error creating shop:", error);
    res.status(500).json({ message: "Server error while creating shop" });
  }
};

// Function to get shops of the logged-in user
export const getMyShops = async (req, res) => {
  try {
    const userId = req.session.user?.userId;
    console.log("Before setting shopId:", req.session);
    const shopId = req.session.shopId;
    console.log("User ID from Session:", userId);
    console.log("Shop ID from Session:", shopId);

    if (!userId) {
      return res.status(401).json({ message: "User is not authenticated." });
    }

    const shops = await Shop.find({ userId });

    if (shops.length === 0) {
      return res.status(404).json({ message: "No shops found for this user." });
    }

    res.status(200).json(shops);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({ message: "Failed to fetch shop details." });
  }
};
