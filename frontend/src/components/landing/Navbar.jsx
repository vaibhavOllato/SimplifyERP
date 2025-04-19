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
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/features" className="hover:text-blue-600">Features</Link></li>
          <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
          <li><Link to="/pricing" className="hover:text-blue-600">Pricing</Link></li>
        </ul>

        {/* Right: Login & Sign Up */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login" className="text-sm text-blue-600 border border-black p-2  hover:underline">
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-cyan-600 text-white text-sm rounded-md hover:bg-cyan-700 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-xl text-gray-700" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4">
          <ul className="space-y-3 text-gray-700 text-sm font-medium">
            <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/features" onClick={toggleMenu}>Features</Link></li>
            <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
            <li><Link to="/pricing" onClick={toggleMenu}>Pricing</Link></li>
            <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
            <li>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="block bg-red-600 text-white text-center py-2 rounded-md"
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
