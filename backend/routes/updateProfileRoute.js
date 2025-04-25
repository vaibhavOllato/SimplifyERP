import express from 'express';
import { updateProfile } from '../controllers/updateProfileController.js';  // Correct import

const router = express.Router();

// Route to update profile
router.put('/update-profile-details', updateProfile);

export default router; // Default export
