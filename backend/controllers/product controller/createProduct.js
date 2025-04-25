import Product from '../../models/productSchema.js'; 
import Shop from '../../models/Shop.js';  

export const createProduct = async (req, res) => {
  const { productName, productCode, category, price, quantity, shopId } = req.body;

  // Check if the provided shopId is valid
  try {
    // const shop = await Shop.findById(shopId);
    const shop = await Shop.findOne({ shopId });  // Find by the string shopId
    if (!shop) {
      return res.status(400).json({ message: 'Shop not found' });
    }

    // Initialize size and color based on category
    let size, color;
    switch (category.toLowerCase()) {
      case 'shirt':
        size = ['S', 'M', 'L', 'XL'];
        color = ['White', 'Blue', 'Black'];
        break;
      case 'pant':
        size = ['28', '30', '32', '34'];
        color = ['Black', 'Grey', 'Blue'];
        break;
      case 'jeans':
        size = ['28', '30', '32', '34'];
        color = ['Indigo', 'Black', 'Grey'];
        break;
      case 'tshirt':
        size = ['S', 'M', 'L'];
        color = ['Red', 'Blue', 'Green'];
        break;
      default:
        return res.status(400).json({ message: 'Invalid category' });
    }

    // Create a new product and associate it with the shopId
    const product = new Product({
      productName,
      productCode,
      category,
      size,
      color,
      quantity,
      price,
      status: quantity > 0 ? 'Available' : 'Out of Stock',
      shopId, // Store the shopId
    });

    // Save the product to the database
    await product.save();

    return res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    return res.status(500).json({ message: 'Error creating product', error });
  }
};

