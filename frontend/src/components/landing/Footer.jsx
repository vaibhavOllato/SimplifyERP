import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-24">
      <div className="container mx-auto px-6 text-center md:text-left">
        <div className="flex flex-wrap justify-between">
          {/* Brand Logo */}
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl font-bold text-cyan-600">Simplify<span className="text-white">ERP</span></h1>
            <p className="text-gray-400 mt-4 max-w-xs mx-auto md:mx-0">
              A powerful ERP system to manage your inventory, sales, and customers.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6">
            <div>
              <h3 className="text-xl font-semibold text-cyan-600 mb-4">Quick Links</h3>
              <ul className="text-gray-400">
                <li><Link to="/" className="hover:text-cyan-600 transition">Home</Link></li>
                <li><Link to="/features" className="hover:text-cyan-600 transition">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-cyan-600 transition">Pricing</Link></li>
                <li><Link to="/contact" className="hover:text-cyan-600 transition">Contact</Link></li>
              </ul>
            </div>

            {/* Social Media Section */}
            <div>
              <h3 className="text-xl font-semibold text-cyan-600 mb-4">Follow Us</h3>
              <div className="flex space-x-4 justify-center md:justify-start">
                <a href="https://facebook.com" className="text-gray-400 hover:text-cyan-600 transition"><FaFacebookF size={20} /></a>
                <a href="https://twitter.com" className="text-gray-400 hover:text-cyan-600 transition"><FaTwitter size={20} /></a>
                <a href="https://instagram.com" className="text-gray-400 hover:text-cyan-600 transition"><FaInstagram size={20} /></a>
                <a href="https://linkedin.com" className="text-gray-400 hover:text-cyan-600 transition"><FaLinkedinIn size={20} /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-gray-400">
          <p>&copy; 2025 SimplifyERP. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
