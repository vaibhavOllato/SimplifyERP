import express from 'express';
import { createBill, getBills } from '../controllers/billController.js';

const router = express.Router();

// POST /api/bills/create
router.post('/create-bill', createBill);
router.get('/get-bill', getBills); 

export default router;
