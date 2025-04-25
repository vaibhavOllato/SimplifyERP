import { generateShopId } from '../utils/generateShopId.js';
import Shop from '../models/Shop.js';

// export const createShop = async (req, res) => {
//   try {
//     const shopId = generateShopId(req.body.shopName);
//     console.log('shop id',req.body);
    
//     const newShop = new Shop({ ...req.body, shopId });
//     await newShop.save();
//     res.status(201).json({ message: "Shop created successfully", shop: newShop });
//   } catch (error) {
//     console.error("Error creating shop:", error);
//     res.status(500).json({ message: "Server error while creating shop" });
//   }
// };
// // Inside the createShop controller






// // Function to get shops of the logged-in user
// export const getMyShops = async (req, res) => {
//     try {
//       // Fetch shops associated with the userId from the decoded token
//       // const userId = req.user.userId;
//       const userId = req.session.user?.userId; 


//        // If no user is found in the session, return unauthorized
//     if (!userId) {
//       return res.status(401).json({ message: "User is not authenticated." });
//     }


//       const shops = await Shop.find({ userId: req.user.userId }); // Filter by userId from JWT
//       console.log('User ID from Token:', userId);
//       console.log(shops);
      
//       if (shops.length === 0) {
//         return res.status(404).json({ message: "No shops found for this user." });
//       }
//       res.status(200).json(shops); // Return the list of shops
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Failed to fetch shop details." });
//     }
//   };



// Function to create a shop
export const createShop = async (req, res) => {
  try {
    const shopId = generateShopId(req.body.shopName);
    console.log('Shop data:', req.body);
    
    // Get userId from session
    const userId = req.session.user?.userId;
    
    // If no user is found in session, return unauthorized
    if (!userId) {
      return res.status(401).json({ message: "User is not authenticated." });
    }

    // Add userId to the shop details
    const newShop = new Shop({ ...req.body, shopId, userId });
    await newShop.save();

    res.status(201).json({ message: "Shop created successfully", shop: newShop });
  } catch (error) {
    console.error("Error creating shop:", error);
    res.status(500).json({ message: "Server error while creating shop" });
  }
};

// Function to get shops of the logged-in user
export const getMyShops = async (req, res) => {
  try {
    const userId = req.session.user?.userId;
    console.log("User ID from Session:", userId); // Check if userId is correctly fetched from the session

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

