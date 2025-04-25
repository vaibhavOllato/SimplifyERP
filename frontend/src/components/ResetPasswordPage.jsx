import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams
import axios from "axios";
import Navbar from "./landing/Navbar";
import Footer from "./landing/Footer";
import { useNotification } from "../context/NotificationProvider";

const ResetPasswordPage = () => {
  const { triggerNotification } = useNotification(); // Use the notification hook
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const { token } = useParams(); // Extract token from the URL
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Add frontend validation
    if (!password || password.trim().length < 8) {
      setMessage("Password must be at least 6 characters long.");
      setMessageType("error");
      triggerNotification(
        "Password must be at least 6 characters long.",
        "error"
      );
      return;
    }

    try {
      const res = await axios.post(`${apiUrl}/users/reset-password/${token}`, {
        password,
      });
      setMessage(res.data.message);
      setMessageType("success");
      triggerNotification(res.data.message, "success");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage(
        "Error: " + (err.response?.data?.message || "Something went wrong")
      );
      setMessageType("error");
      triggerNotification(
        "Error: " + (err.response?.data?.message || "Something went wrong"),
        "error"
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          {/* <h1 className="text-3xl font-bold text-center text-cyan-600 mb-4">
            Simplifly ERP
          </h1> */}
          <h2 className="text-xl font-semibold text-center text-cyan-600 mb-6">
            Reset Your Password
          </h2>

          {message && (
            <div
              className={`mt-3 text-sm px-4 py-2 rounded ${
                messageType === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm text-gray-600 mb-2"
              >
                New Password
              </label>
              {/* <input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              /> */}

              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                minLength={6}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-600 text-white py-3 rounded-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Reset Password
            </button>
          </form>

          {/* {message && (
            <p
              className={`mt-4 text-center text-sm ${
                message.includes("Error") ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )} */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPasswordPage;
