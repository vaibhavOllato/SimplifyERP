import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import cloudinary from "cloudinary";
import { uploadProfilePicture } from "./controllers/profileController.js";
import userRoutes from "./routes/userRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import profileRoutes from './routes/updateProfileRoute.js'; // Add the .js extension here
dotenv.config();

const app = express();

// CORS config to allow frontend communication
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies from frontend
  })
);
// Middleware
app.use(express.json()); // Parses incoming JSON

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize multer middleware for handling image uploads
const upload = multer({ dest: "uploads/" });

// POST endpoint to upload profile picture
app.post("/upload-profile", upload.single("image"), uploadProfilePicture);

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallbackSecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      secure: false, // Set to true in production with HTTPS
    },
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);

// Use the profile routes
app.use("/api/profile", profileRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🖥️  MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
