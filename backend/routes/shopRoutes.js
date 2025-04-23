import express from 'express';
// import { createShop, getAllShops } from '../controllers/createShopController.js';
import { createShop, getMyShops } from '../controllers/createShopController.js';

import  authMiddleware  from '../middleware/authMiddleware.js';

const router = express.Router();

router.post("/shop-register", createShop);
// router.get('/all-shops', getAllShops); 


router.post('/create', authMiddleware, createShop);
// router.get('/all', protect, getAllShops);
router.get('/myShop', authMiddleware, getMyShops);
export default router;  // This ensures default export is provided
