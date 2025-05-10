import express from "express";
import {
  getAllShops,
  getShopCount,
  getPendingShops,
  // approveShop,
  // notifyNewShop,
  activateShop,
} from "../controllers/admin/shopAdminController.js";
import {
  getAllUsers,
  getUserCount,
} from "../controllers/admin/usersAdminController.js";

import adminAuth from "../middleware/adminAuth.js";
const router = express.Router();

// Endpoint to fetch all shop details
router.get("/shops-admin", getAllShops);

router.get("/shop-count-admin", getShopCount);

router.get("/pending-shops", adminAuth, getPendingShops);

router.post("/activate-shop/:shopId", adminAuth, activateShop);

// router.put('/approve-shop/:id', adminAuth, approveShop);

// router.get('/notify-new-shop', adminAuth, notifyNewShop);

router.get("/admin-users", getAllUsers);

router.get("/users-count", getUserCount);

export default router;
