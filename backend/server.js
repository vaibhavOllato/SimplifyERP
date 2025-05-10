// import express from "express";
// import session from "express-session";
// import MongoStore from "connect-mongo";
// import mongoose from "mongoose";
// import cors from "cors";
// import http from "http";
// import { Server } from "socket.io";
// import dotenv from "dotenv";
// import multer from "multer";
// import cloudinary from "cloudinary";
// import { uploadProfilePicture } from "./controllers/profileController.js";
// import userRoutes from "./routes/userRoutes.js";
// import shopRoutes from "./routes/shopRoutes.js";
// import profileRoutes from "./routes/updateProfileRoute.js";
// import productRoutes from "./routes/product routes/productRoutes.js";
// import customerRoutes from "./routes/customerRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import shopAdminRoutes from "./routes/adminShopRoutes.js";
// import vendorRoutes from './routes/vendorRoutes.js';
// import billRoutes from './routes/billRoutes.js';

// dotenv.config();

// const app = express();

// // CORS setup to allow requests from your frontend (make sure this is before any routes or middleware)
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:5174"], // Allow both origins
//     credentials: true, // Allows sending cookies (session ID)
//   })
// );

// // Middleware
// app.use(express.json()); // Parse incoming JSON

// // Session setup
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET || "fallbackSecret",
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI,
//       collectionName: "sessions",
//     }),
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
//       sameSite: "lax", // Controls how cookies are sent with cross-origin requests
//       secure: false, // Set to `true` for production (with HTTPS)
//       httpOnly: true, // Only accessible by the server
//     },
//   })
// );

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Initialize multer for file uploads
// const upload = multer({ dest: "uploads/" });

// // Logout route
// app.post("/api/logout", (req, res) => {
//   req.session.destroy((err) => {
//     if (err) {
//       return res.status(500).send("Failed to clear session.");
//     }
//     res.clearCookie("connect.sid", { path: "/" });
//     res.status(200).send("Logged out");
//   });
// });

// // API Routes
// app.use("/api/users", userRoutes);
// app.use("/api/shops", shopRoutes);
// app.post("/api/upload-profile", upload.single("image"), uploadProfilePicture);
// app.use("/api/profile", profileRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/customers", customerRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/admin", shopAdminRoutes);

// app.use('/api/vendors', vendorRoutes);

// app.use('/api/bills', billRoutes);

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("🖥️  MongoDB connected"))
//   .catch((err) => console.log("❌ MongoDB connection error:", err));

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });

import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
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
import shopAdminRoutes from "./routes/adminShopRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import billRoutes from "./routes/billRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app); // 👈 Create custom HTTP server
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Attach io to req
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());

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
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: false,
      httpOnly: true,
    },
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = multer({ dest: "uploads/" });

app.post("/api/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Failed to clear session.");
    res.clearCookie("connect.sid", { path: "/" });
    res.status(200).send("Logged out");
  });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/shops", shopRoutes); // 👈 Make sure this can access `req.io`
app.post("/api/upload-profile", upload.single("image"), uploadProfilePicture);
app.use("/api/profile", profileRoutes);
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", shopAdminRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/bills", billRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("🖥️  MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Start HTTP server with Socket.IO
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running with Socket.IO on port ${PORT}`);
});

// Optional: Listen for socket connections (for debugging)
io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});
