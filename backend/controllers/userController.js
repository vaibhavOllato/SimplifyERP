const crypto = require("crypto"); // built-in module
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const generateUserId = () => {
  return "SimplifyERP" + Math.floor(100000 + Math.random() * 900000); // e.g., USR456783
};

// Replace this with your actual secret and store it in .env
const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
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

    res.status(201).json({ message: "User registered successfully.", userId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }
  
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials." });
      }
  
      // Generate token (optional)
      const token = jwt.sign({ userId: user.userId, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
  
      res.status(200).json({
        message: "Login successful.",
        token,
        user: {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };


module.exports = { registerUser, loginUser };
