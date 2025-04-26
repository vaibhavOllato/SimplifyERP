import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold text-cyan-600">
          Simplify<span className="text-gray-800">ERP</span>
        </Link>

        {/* Center: Navigation Links */}
        <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-700">
          {/* Scrolling Links */}
          <li>
            <a href="#hero" className="hover:text-cyan-600">
              Home
            </a>
          </li>
          <li>
            <a href="#future-increments" className="hover:text-cyan-600">
              Future
            </a>
          </li>
          <li>
            <a href="#why-us" className="hover:text-cyan-600">
              Why Us
            </a>
          </li>
          <li>
            <a href="#getting-started" className="hover:text-cyan-600">
              Getting Started
            </a>
          </li>
          <li>
            <a href="#mission" className="hover:text-cyan-600">
              Mission
            </a>
          </li>
          <li>
            <a href="#try-it-now" className="hover:text-cyan-600">
              Try Now
            </a>
          </li>
        </ul>

        {/* Right: Login & Sign Up */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/login"
            className="text-sm text-cyan-600 border border-cyan-600 rounded-full px-6 py-2 hover:underline hover:text-cyan-800 transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-2 bg-cyan-600 text-white text-sm rounded-full hover:bg-cyan-700 transition duration-300 shadow-md transform hover:scale-105"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl text-gray-700"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          <ul className="space-y-3 text-cyan-700 text-sm font-medium">
            {/* Scrolling Links */}
            <li>
              <a href="#hero" onClick={toggleMenu}>
                Home
              </a>
            </li>
            <li>
              <a href="#future-increments" onClick={toggleMenu}>
                Future
              </a>
            </li>
            <li>
              <a href="#why-us" onClick={toggleMenu}>
                Why Us
              </a>
            </li>
            <li>
              <a href="#getting-started" onClick={toggleMenu}>
                Getting Started
              </a>
            </li>
            <li>
              <a href="#mission" onClick={toggleMenu}>
                Mission
              </a>
            </li>
            <li>
              <a href="#try-it-now" onClick={toggleMenu}>
                Try Now
              </a>
            </li>

            {/* Login & Sign Up */}
            <li>
              <Link to="/login" onClick={toggleMenu}>
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="block bg-cyan-600 text-white text-center py-2 rounded-md"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
