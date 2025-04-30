import express from 'express';
import { createProduct, getProductsByShopId } from '../../controllers/product controller/createProduct.js'; // Using `.js` extension in imports

const router = express.Router();

// POST route to create a new product
router.post('/create', createProduct);

router.get("/by-shop/:shopId", getProductsByShopId);

export default router;
