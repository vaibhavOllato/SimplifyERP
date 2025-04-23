// const express = require('express');
import express from 'express';

// const { registerUser, loginUser } = require('../controllers/userController');
// import { registerUser, loginUser } from '../controllers/userController';
import { registerUser, loginUser } from '../controllers/userController.js'; // Notice the .js extension


// const { loginUser } = require("../controllers/");

const router = express.Router();

router.post('/register', registerUser);

router.post("/login", loginUser);

// module.exports = router;
export default router;  // This ensures default export is provided

