import express from 'express';
import { getAllShops, getShopCount } from '../controllers/admin/shopAdminController.js'; // Import the controller functions

const router = express.Router();

// Endpoint to fetch all shop details
router.get('/shops-admin', getAllShops);

// Endpoint to fetch the count of registered shops
router.get('/shop-count-admin', getShopCount);

export default router;
