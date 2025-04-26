// import express from 'express';
// // import { createShop, getAllShops } from '../controllers/createShopController.js';
// import { registerShop, getShopDetails, deleteShop, updateShop } from '../controllers/createShopController.js';

// import  authMiddleware  from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.post("/shop-register", createShop);
// // router.get('/all-shops', getAllShops); 


// router.post('/create', authMiddleware, createShop);
// // router.get('/all', protect, getAllShops);
// router.get('/myShop', authMiddleware, getMyShops);
// export default router;  // This ensures default export is provided


import express from "express";
import {
  registerShop,
  getShopDetails,
  updateShop,
  deleteShop,
} from "../controllers/createShopController.js";

const router = express.Router();

// Route to register a new shop
router.post("/register", registerShop);

// Route to get shop details for a specific userId
router.get("/user/:userId", getShopDetails);

// Route to update shop details by shopId
router.put("/update/:shopId", updateShop);

// Route to delete a shop by shopId
router.delete("/delete/:shopId", deleteShop);

export default router;
