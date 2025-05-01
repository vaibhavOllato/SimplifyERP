import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";
import dotenv from 'dotenv';
dotenv.config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit if error occurs
  }
};

const createAdmin = async () => {
  try {
    // Check if admin already exists
    const adminExists = await Admin.findOne({ email: "admin@simplifyERP.com" });
    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    // Hash password
    const password = "12345678";
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    const admin = new Admin({
      email: "admin@simplifyERP.com",
      password: hashedPassword,
      role: "admin",
    });

    // Save the admin to the database
    await admin.save();
    console.log("Admin created successfully!");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    mongoose.connection.close();
  }
};

(async () => {
  await connectDB();
  await createAdmin();
})();
