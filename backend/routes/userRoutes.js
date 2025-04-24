import express from 'express';
import { registerUser, loginUser, checkLoginStatus, logoutUser } from '../controllers/userController.js'; 
import { forgotPassword, resetPassword } from '../controllers/userController.js';


const router = express.Router();

router.post('/register', registerUser);
router.get("/ls", checkLoginStatus);
router.post("/login", loginUser);

// forget password 7 reset password
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.post("/logout", logoutUser);

export default router;  

