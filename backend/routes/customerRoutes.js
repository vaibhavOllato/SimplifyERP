import express from 'express';
import { createCustomer, getAllCustomers, getCustomerCountsByShop } from '../controllers/customerController.js';

const router = express.Router();

router.post('/create', createCustomer);
router.get('/all', getAllCustomers);
router.get('/counts-by-shop', getCustomerCountsByShop); 

export default router;
