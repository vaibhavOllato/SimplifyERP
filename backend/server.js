import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
// import cors from "cors";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import cloudinary from "cloudinary";
import { uploadProfilePicture } from "./controllers/profileController.js";
import userRoutes from "./routes/userRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import profileRoutes from "./routes/updateProfileRoute.js";
import productRoutes from "./routes/product routes/productRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import shopAdminRoutes from './routes/adminShopRoutes.js';
dotenv.config();

const app = express();

// CORS config to allow frontend communication
const allowedOrigins = ["http://localhost:5174"];
// const allowedOrigins = ["http://localhost:5175"];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Initialize multer middleware for handling image uploads
const upload = multer({ dest: "uploads/" });

// POST endpoint to upload profile picture

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallbackSecret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
    },
  })
);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies from frontend
  })
);

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, origin); // ✅ Must return the exact origin, not true
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // ✅ Necessary for cookies/session
//   })
// );

// ✅ Add logout route here
app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to clear session.");
      console.error("❌ Error destroying session:", err);
      // return res.status(500).send("Could not log out.");
    }
    res.clearCookie("connect.sid", { path: "/" }); // make sure you clear the right cookie
    console.log("✅ Logged out successfully and cookie cleared");
    res.status(200).send("Logged out");
  });
});

// Middleware
app.use(express.json()); // Parses incoming JSON

// Routes
app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes);
app.post("/api/upload-profile", upload.single("image"), uploadProfilePicture);
app.use("/api/profile", profileRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", shopAdminRoutes);


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
