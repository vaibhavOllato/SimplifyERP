import express from 'express';
import { createProduct } from '../../controllers/product controller/createProduct.js'; // Using `.js` extension in imports

const router = express.Router();

// POST route to create a new product
router.post('/create', createProduct);

export default router;
