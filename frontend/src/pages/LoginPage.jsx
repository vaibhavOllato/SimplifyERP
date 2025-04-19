import React from "react";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Centered Login Form */}
      <main className="flex-grow flex items-center justify-center mt-24 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
            Login to Your Account
          </h2>
          <form>
            <div className="mb-4">
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

            <div className="mb-6">
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

            <button
              type="submit"
              className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 rounded-md transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-cyan-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
