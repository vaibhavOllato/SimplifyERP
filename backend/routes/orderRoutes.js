import express from 'express';
import { createOrder, getAllOrders } from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/', getAllOrders);

export default router;
