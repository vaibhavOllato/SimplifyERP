// import { generateShopId } from "../utils/generateShopId.js";
// import Shop from "../models/Shop.js";

// // Function to create a shop
// export const createShop = async (req, res) => {
//   try {
//     const shopId = generateShopId(req.body.shopName);
//     console.log("Shop data:", req.body);

//     // Get userId from session
//     const userId = req.session.user?.userId;

//     // If no user is found in session, return unauthorized
//     if (!userId) {
//       return res.status(401).json({ message: "User is not authenticated." });
//     }

//     // Add userId to the shop details
//     const newShop = new Shop({ ...req.body, shopId, userId });
//     await newShop.save();

//     // Clear any existing shopId first
//     delete req.session.shopId;

//     // Store the shopId in the session after shop creation
//     req.session.shopId = newShop.shopId; // Store shopId in session
//     console.log("✅ New Shop ID set in session:", newShop.shopId);
//     //  await req.session.save();
//     await req.session.save((err) => {
//       if (err) {
//         console.error("❌ Error saving session:", err);
//       } else {
//         console.log("✅ Session saved with new shopId:", req.session.shopId);
//       }
//     });
//     console.log("Session data after storing shopId:", req.session);

//     // res.status(201).json({ message: "Shop created successfully", shop: newShop,   shopId: newShop.shopId, });
//     res.status(201).json({
//       message: "Shop created successfully",
//       shop: newShop,
//       shopId: newShop.shopId, // Optionally return shopId
//     });
//   } catch (error) {
//     console.error("Error creating shop:", error);
//     res.status(500).json({ message: "Server error while creating shop" });
//   }
// };

// // Function to get shops of the logged-in user
// export const getMyShops = async (req, res) => {
//   try {
//     const userId = req.session.user?.userId;
//     console.log("Before setting shopId:", req.session);
//     const shopId = req.session.shopId;
//     console.log("User ID from Session:", userId);
//     console.log("Shop ID from Session:", shopId);

//     if (!userId) {
//       return res.status(401).json({ message: "User is not authenticated." });
//     }

//     const shops = await Shop.find({ userId });

//     if (shops.length === 0) {
//       return res.status(404).json({ message: "No shops found for this user." });
//     }

//     res.status(200).json(shops);
//   } catch (error) {
//     console.error("Error fetching shops:", error);
//     res.status(500).json({ message: "Failed to fetch shop details." });
//   }
// };



import Shop from "../models/Shop.js";

// Controller to Register a Shop for a User
export const registerShop = async (req, res) => {
  const {
    userId, // Custom userId (Not Mongo's _id)
    shopName,
    shopType,
    secondaryCategories,
    address,
    phone,
    email,
    website,
    openingTime,
    closingTime,
    gstNumber,
    taxRates,
  } = req.body;

  if (
    !userId ||
    !shopName ||
    !shopType ||
    !address ||
    !gstNumber ||
    !taxRates || 
    !Array.isArray(taxRates)
  ) {
    return res.status(400).json({ message: "All required fields must be provided." });
  }

  try {
    // Create new Shop instance
    const newShop = new Shop({
      userId,
      // userId: req.session.user.userId,
      shopName,
      shopType,
      secondaryCategories,
      address,
      phone,
      email,
      website,
      openingTime,
      closingTime,
      gstNumber,
      taxRates,
    });

    // Save the shop
    await newShop.save();

    return res.status(201).json({ message: "Shop registered successfully", shop: newShop, });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Controller to Fetch Shop Details for a User
// export const getShopDetails = async (req, res) => {
//   const { userId } = req.params;  // Assuming userId is passed as a URL parameter

//   try {
//     // Find shop(s) linked to this userId
//     const shops = await Shop.find({ userId });

//     if (shops.length === 0) {
//       return res.status(404).json({ message: "No shops found for this user." });
//     }

//     return res.status(200).json({ shops });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };


// controllers/shopController.js

// import Shop from "../models/Shop.js";

// Controller to Fetch Shop Details for a User
export const getShopDetails = async (req, res) => {
  const { userId } = req.params;  // Get userId from URL parameters

  // Validate if userId exists
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    // Find all shops linked to the given userId
    const shops = await Shop.find({ userId });

    // If no shops found, send 404
    if (shops.length === 0) {
      return res.status(404).json({ message: "No shops found for this user." });
    }

    // If shops found, send them with 200 OK
    return res.status(200).json({ shops });
  } catch (error) {
    console.error("Error fetching shop details:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};


// Controller to Update Shop Details (if necessary)
export const updateShop = async (req, res) => {
  const { shopId } = req.params;  // ShopId passed in the URL
  const {
    shopName,
    shopType,
    secondaryCategories,
    address,
    phone,
    email,
    website,
    openingTime,
    closingTime,
    gstNumber,
    taxRates,
  } = req.body;

  try {
    // Find the shop by shopId
    const shop = await Shop.findOne({ shopId });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found." });
    }

    // Update the shop details
    shop.shopName = shopName || shop.shopName;
    shop.shopType = shopType || shop.shopType;
    shop.secondaryCategories = secondaryCategories || shop.secondaryCategories;
    shop.address = address || shop.address;
    shop.phone = phone || shop.phone;
    shop.email = email || shop.email;
    shop.website = website || shop.website;
    shop.openingTime = openingTime || shop.openingTime;
    shop.closingTime = closingTime || shop.closingTime;
    shop.gstNumber = gstNumber || shop.gstNumber;
    shop.taxRates = taxRates || shop.taxRates;

    // Save the updated shop
    await shop.save();

    return res.status(200).json({ message: "Shop details updated successfully.", shop });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Controller to Delete a Shop (if necessary)
export const deleteShop = async (req, res) => {
  const { shopId } = req.params;  // ShopId passed in the URL

  try {
    const shop = await Shop.findOneAndDelete({ shopId });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found." });
    }

    return res.status(200).json({ message: "Shop deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};
