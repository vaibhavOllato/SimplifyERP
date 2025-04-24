import crypto from "crypto"; // built-in module
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import User from "../models/User"; 
import User from "../models/User.js";
import sendWelcomeEmail from '../services/emailService.js';

const generateUserId = () => {
  return "SimplifyERP" + Math.floor(100000 + Math.random() * 900000); // e.g., USR456783
};

// Replace this with your actual secret and store it in .env
const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  const { firstName, lastName, phone, email, password, confirmPassword } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !phone ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match." });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    let userId = generateUserId();
    // Ensure uniqueness
    while (await User.findOne({ userId })) {
      userId = generateUserId();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userId,
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    });

    await newUser.save();

     // Send the welcome email
     await sendWelcomeEmail(email, firstName);

    res.status(201).json({ message: "User registered successfully.", userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // ✅ Set session data safely
    req.session.user = {
      userId: user.userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone
    };

    console.log("Session after setting user:", req.session);

    return res.status(200).json({
      message: "Login successful.",
      user: req.session.user, // returning from session
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};


// In controllers/userController.js
export const checkLoginStatus = (req, res) => {
  if (req.session.user) {
    res.status(200).json({ loggedIn: true, user: req.session.user });
  } else {
    res.status(200).json({ loggedIn: false });
  }
};



export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // adjust cookie name if customized
    res.json({ message: "Logged out successfully" });
  });
};