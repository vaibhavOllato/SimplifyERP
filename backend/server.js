// import express from 'express';
// import session from "express-session";
// import MongoStore from "connect-mongo";

// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import userRoutes from './routes/userRoutes.js';
// import shopRoutes from './routes/shopRoutes.js';
// // import dotenv from 'dotenv';
// // dotenv.config();
// dotenv.config();

// const app = express();


// const allowedOrigins = ["http://localhost:5173"];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true, // this is needed to allow cookies/sessions
// }));


// // Middleware
// // app.use(cors());
// app.use(express.json());


// app.use(session({
//   secret: process.env.SESSION_SECRET || 'fallbackSecret', // ✅ Set your secret here
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
//     sameSite: 'lax', // recommended for login sessions
//     secure: false,   // set to true if using HTTPS
//   },
//   store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
// }));

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/shops', shopRoutes);


// // MongoDB Connect
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('🖥️ MongoDB connected'))
//   .catch((err) => console.log('MongoDB connection error:', err));

  

// // Start Server
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));



import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import shopRoutes from './routes/shopRoutes.js';

dotenv.config();

const app = express();

// CORS config to allow frontend communication
const allowedOrigins = ["http://localhost:5173"];
app.use(cors({
  origin: allowedOrigins,
  credentials: true, // Allow cookies from frontend
}));

// Middleware
app.use(express.json()); // Parses incoming JSON

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallbackSecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions',
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
    secure: false, // Set to true in production with HTTPS
  }
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('🖥️  MongoDB connected'))
.catch(err => console.log('❌ MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
