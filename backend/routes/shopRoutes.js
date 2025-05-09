import express from "express";
import {
  registerShop,
  getShopDetails,
  updateShop,
  deleteShop,
  // approveShop ,
} from "../controllers/createShopController.js";
// import { isAdmin } from '../middleware/authMiddleware.js'; 
// import isAdmin  from '../middleware/adminAuth.js';

const router = express.Router();

// Route to register a new shop
router.post("/shop-register", registerShop);

// router.patch('/approve/:shopId', isAdmin, approveShop);

// Route to get shop details for a specific userId
router.get("/user/:userId", getShopDetails);

// Route to update shop details by shopId
router.put("/update/:shopId", updateShop);

// Route to delete a shop by shopId
router.delete("/delete/:shopId", deleteShop);

export default router;
