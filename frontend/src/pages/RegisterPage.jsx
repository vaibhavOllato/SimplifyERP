import React from "react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Centered Register Form */}
      <main className="flex-grow flex items-center justify-center px-4 mt-24">
        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
            Create Your Account
          </h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-600 focus:border-cyan-600 outline-none"
                placeholder="John"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-600 focus:border-cyan-600 outline-none"
                placeholder="Doe"
              />
            </div>

            {/* Phone Number */}
            <div className="md:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-600 focus:border-cyan-600 outline-none"
                placeholder="+91 9876543210"
              />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-600 focus:border-cyan-600 outline-none"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-600 focus:border-cyan-600 outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-600 focus:border-cyan-600 outline-none"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-md transition duration-300"
              >
                Register
              </button>
            </div>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-cyan-600 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default RegisterPage;
