// const mongoose = require("mongoose");
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageUrl: String, 
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);


const User = mongoose.model("User", userSchema);
// module.exports = mongoose.model("User", userSchema);
export default User;
