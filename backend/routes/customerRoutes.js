import express from 'express';
import { createCustomer, getAllCustomers } from '../controllers/customerController.js';

const router = express.Router();

router.post('/create', createCustomer);
router.get('/all', getAllCustomers);

export default router;
