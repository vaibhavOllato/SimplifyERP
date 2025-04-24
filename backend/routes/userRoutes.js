// const express = require('express');
import express from 'express';

// const { registerUser, loginUser } = require('../controllers/userController');
// import { registerUser, loginUser } from '../controllers/userController';
import { registerUser, loginUser, checkLoginStatus, logoutUser } from '../controllers/userController.js'; // Notice the .js extension


// const { loginUser } = require("../controllers/");

const router = express.Router();

router.post('/register', registerUser);
// In routes/userRoutes.js
router.get("/ls", checkLoginStatus);
router.post("/login", loginUser);


// Add to routes
router.post("/logout", logoutUser);

// module.exports = router;
export default router;  // This ensures default export is provided

