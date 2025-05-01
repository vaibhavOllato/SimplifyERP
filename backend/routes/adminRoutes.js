import express from 'express';
import { adminLogin, getDashboardStats } from '../controllers/admin/adminController.js';
// import adminAuth from '../middlewares/adminAuth.js';
import adminAuth from "../middleware/adminAuth.js";


const router = express.Router();

router.post('/login', adminLogin);
router.get('/dashboard-stats', adminAuth, getDashboardStats);

export default router;
