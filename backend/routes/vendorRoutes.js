// import express from 'express';
// import {addVendor, getVendorsByShopId} from '../controllers/addVendor.js';

// const router = express.Router();

// router.post('/register-vendor', addVendor);

// // router.get('/shop/:shopId', getVendorsByShopId);
// router.post('/shop', getVendorsByShopId);


// // export default router;
// export default addVendor;


import express from 'express';
import { addVendor, getVendorsByShopId } from '../controllers/addVendor.js';

const router = express.Router();

router.post('/register-vendor', addVendor);
router.post('/shop', getVendorsByShopId);

// ✅ Export the router, not the controller
export default router;
