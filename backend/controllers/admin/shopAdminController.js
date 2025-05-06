import Shop from '../../models/Shop.js'; // Import the Shop model

// Controller to fetch all shop details
export const getAllShops = async (req, res) => {
  try {
    const shops = await Shop.find(); // Fetch all shops
    res.json(shops); // Send the data as JSON response
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Failed to fetch shops' });
  }
};

// Controller to fetch the number of registered shops
export const getShopCount = async (req, res) => {
  try {
    const shopCount = await Shop.countDocuments(); // Count all shops
    res.json({ count: shopCount });
  } catch (error) {
    console.error('Error counting shops:', error);
    res.status(500).json({ error: 'Failed to count shops' });
  }
};
