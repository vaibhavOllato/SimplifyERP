import express from 'express';
import { getAllShops, getShopCount } from '../controllers/admin/shopAdminController.js'; // Import the controller functions
import { getAllUsers, getUserCount } from '../controllers/admin/usersAdminController.js';
const router = express.Router();

// Endpoint to fetch all shop details
router.get('/shops-admin', getAllShops);

// Endpoint to fetch the count of registered shops
router.get('/shop-count-admin', getShopCount);

// @route   GET /api/users
// @desc    Get all users
router.get('/admin-users', getAllUsers);

// @route   GET /api/users/count
// @desc    Get user count
router.get('/users-count', getUserCount);

export default router;
