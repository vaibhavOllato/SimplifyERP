const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🖥️ MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
