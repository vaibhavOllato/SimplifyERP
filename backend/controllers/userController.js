import crypto from "crypto"; // built-in module
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendWelcomeEmail from '../services/emailService.js';
import sendResetPasswordEmail from '../services/sendResetPasswordEmail.js';
import Shop from '../models/Shop.js'; 

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


// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required." });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: "Invalid credentials." });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials." });
//     }

//     // ✅ Set session data safely
//     req.session.user = {
//       userId: user.userId,
//       email: user.email,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       phone: user.phone,
//       imageUrl: user.imageUrl || null, 
//     };

//     console.log("Session after setting user:", req.session);

//     return res.status(200).json({
//       message: "Login successful.",
//       user: req.session.user, // returning from session
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     return res.status(500).json({ message: "Server error. Please try again later." });
//   }
// };

// import Shop from '../models/Shop.js'; 

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

    // ✅ Set session user data
    req.session.user = {
      userId: user.userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      imageUrl: user.imageUrl || null, 
    };

    // 🛠️ NOW: Also find shop and set shopId into session
    
    const shops = await Shop.find({ userId: user._id });
console.log("Shops found for user:", shops);

    if (shops.length > 0) {
      req.session.shopId = shops[0].shopId; // taking first shop
      console.log("✅ Shop ID set after login:", req.session.shopId);
    } else {
      console.log("⚠️ No shops found for user");
    }

    await req.session.save(); // 🧠 Always save after setting

    console.log("Session after setting user + shopId:", req.session);

    return res.status(200).json({
      message: "Login successful.",
      user: req.session.user,
      shopId: req.session.shopId || null, // send shopId too if needed
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


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User with this email does not exist.' });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordExpire = Date.now() + 3600000; // 1 hour expiration

    // Save the token and expiration in the user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    // Send the email with the reset token
    const resetPasswordLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    await sendResetPasswordEmail(user.email, resetPasswordLink);

    res.status(200).json({
      message: 'Password reset email sent. Please check your inbox.',
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};



export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  console.log('Token from URL:', token);

  console.log('🔐 Reset Password Endpoint Hit');
  // console.log('Token:', token);
  console.log('Password:', password);

  try {
    // Find the user by reset password token and ensure it is not expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }, // Token must not have expired
    });

    console.log('User Found:', user);

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token.' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update the user's password and clear the reset token and expiration
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      message: 'Password reset successful! You can now log in with your new password.',
    });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};