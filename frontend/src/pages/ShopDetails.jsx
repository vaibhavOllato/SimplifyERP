// import React from 'react';

// const ShopDetails = ({ shop }) => {
//   return (
//     <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
//       <div className="flex flex-col items-center bg-white shadow-xl p-8 rounded-lg max-w-4xl mx-auto">
//         {/* Shop Logo */}
//         <img
//           src={shop.logo}
//           alt={`${shop.shopName} Logo`}
//           className="w-40 h-40 rounded-full object-cover mb-6 shadow-lg"
//         />

//         {/* Shop Name */}
//         <h1 className="text-4xl font-extrabold text-gray-800 mb-2 text-center">{shop.shopName}</h1>

//         {/* Shop Type */}
//         <p className="text-xl text-gray-600 mb-4 text-center">{shop.shopType}</p>

//         {/* Shop Details Section */}
//         <div className="w-full space-y-4">
//           <h2 className="text-2xl font-semibold text-gray-700">Shop Details</h2>

//           <div className="space-y-2 text-gray-700">
//             <p><strong>Address: </strong>{shop.address}</p>
//             <p><strong>Phone: </strong>{shop.phone}</p>
//             <p><strong>Email: </strong>{shop.email}</p>
//             <p><strong>Website: </strong>
//               <a href={shop.website} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">
//                 {shop.website}
//               </a>
//             </p>
//           </div>

//           {/* Social Links */}
//           <div className="mt-6">
//             <h3 className="text-xl font-semibold text-gray-700">Follow Us</h3>
//             <div className="flex space-x-6 justify-center mt-2">
//               <a href={shop.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
//                 <i className="fab fa-instagram text-3xl text-pink-600 hover:text-pink-800 transition-all"></i>
//               </a>
//               <a href={shop.socialLinks.facebook} target="_blank" rel="noopener noreferrer">
//                 <i className="fab fa-facebook text-3xl text-blue-600 hover:text-blue-800 transition-all"></i>
//               </a>
//               <a href={shop.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
//                 <i className="fab fa-twitter text-3xl text-blue-400 hover:text-blue-600 transition-all"></i>
//               </a>
//             </div>
//           </div>

//           {/* Opening and Closing Time */}
//           <div className="mt-6">
//             <p className="text-gray-700"><strong>Opening Time: </strong>{shop.openingTime}</p>
//             <p className="text-gray-700"><strong>Closing Time: </strong>{shop.closingTime}</p>
//           </div>

//           {/* Payment Methods */}
//           <div className="mt-6">
//             <h3 className="text-xl font-semibold text-gray-700">Accepted Payment Methods</h3>
//             <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
//               {shop.paymentMethods.map((method, index) => (
//                 <li key={index} className="text-lg">{method}</li>
//               ))}
//             </ul>
//           </div>

//           {/* GST Number */}
//           <div className="mt-6">
//             <p className="text-gray-700"><strong>GST Number: </strong>{shop.gstNumber}</p>
//           </div>
//         </div>

//         {/* Manager Information */}
//         <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md w-full">
//           <h3 className="text-2xl font-semibold text-gray-700">Manager Details</h3>
//           <div className="space-y-2 text-gray-700 mt-4">
//             <p><strong>Name: </strong>{shop.manager.name}</p>
//             <p><strong>Phone: </strong>{shop.manager.phone}</p>
//             <p><strong>Email: </strong>{shop.manager.email}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopDetails;

import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Clock, Sun, Moon } from "lucide-react";
import { CreditCard, Wallet, Banknote } from "lucide-react";

const ShopDetails = ({ shop }) => {
  const paymentIcons = {
    Cash: <Banknote className="w-5 h-5 text-green-600" />,
    Card: <CreditCard className="w-5 h-5 text-indigo-600" />,
    UPI: <Wallet className="w-5 h-5 text-blue-600" />,
  };
  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Main Shop Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 ">
          <div className="flex items-center justify-between space-x-6">
            {/* Shop Logo */}
            <div className="flex items-center space-x-6">
              <img
                src={shop.logo}
                alt={`${shop.shopName} Logo`}
                className="w-28 h-28 rounded-full shadow-2xl border-4 border-cyan-500"
              />
              <div>
                <h1 className="text-4xl font-semibold text-gray-800">
                  {shop.shopName}
                </h1>
                <p className="text-lg text-gray-600">{shop.shopType}</p>
              </div>
            </div>

            {/* Shop Status */}
            <div className="text-sm text-gray-500">
              <span className="bg-green-100 text-green-800 py-2 px-4 rounded-lg text-xs font-semibold">
                {shop.status}
              </span>
            </div>
          </div>

          {/* Shop Details */}
          <div className="mt-8 text-gray-700 space-y-4">
            <div className="flex items-center space-x-3">
              <FaMapMarkerAlt className="text-cyan-500 text-xl" />
              <span>{shop.address}</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-cyan-500 text-xl" />
              <a
                href={`tel:${shop.phone}`}
                className="hover:text-cyan-600 transition-all"
              >
                {shop.phone}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-cyan-500 text-xl" />
              <a
                href={`mailto:${shop.email}`}
                className="hover:text-cyan-600 transition-all"
              >
                {shop.email}
              </a>
            </div>
            <p className="mt-2">
              <strong>Website: </strong>
              <a
                href={shop.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-500 hover:text-cyan-600 transition-all"
              >
                {shop.website}
              </a>
            </p>
          </div>

           {/* GST Number */}
           <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-600">
              <strong>GST Number: </strong>
              {shop.gstNumber}
            </p>
          </div>

          {/* Opening & Closing Times */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-cyan-100 p-3 rounded-full">
                  <Clock className="text-cyan-600 w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Operating Hours
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 p-2 rounded-full">
                    <Sun className="text-yellow-500 w-5 h-5" />
                  </div>
                  <p className="text-gray-700 font-medium">
                    <strong>Opens:</strong> {shop.openingTime}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Moon className="text-purple-500 w-5 h-5" />
                  </div>
                  <p className="text-gray-700 font-medium">
                    <strong>Closes:</strong> {shop.closingTime}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="bg-gray-50 p-4 rounded-xl shadow">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
                <CreditCard className="w-5 h-5 mr-2 text-cyan-600" />
                Payment Methods
              </h3>
              <div className="flex flex-wrap gap-4">
                {shop.paymentMethods.map((method, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow text-gray-700"
                  >
                    {paymentIcons[method] || (
                      <Wallet className="w-5 h-5 text-gray-500" />
                    )}
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

         
        </div>

        {/* Manager Information */}
        <div className="bg-white rounded-lg shadow-xl p-8 ">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Manager Details
          </h3>
          <div className="text-gray-700">
            <p>
              <strong>Name: </strong>
              {shop.manager.name}
            </p>
            <div className="flex items-center space-x-3">
              <FaPhoneAlt className="text-cyan-500 text-xl" />
              <a
                href={`tel:${shop.manager.phone}`}
                className="hover:text-cyan-600 transition-all"
              >
                {shop.manager.phone}
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <FaEnvelope className="text-cyan-500 text-xl" />
              <a
                href={`mailto:${shop.manager.email}`}
                className="hover:text-cyan-600 transition-all"
              >
                {shop.manager.email}
              </a>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-8 mt-6">
          <a
            href={shop.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-pink-600 hover:text-pink-800 transition-all"
          >
            <FaInstagram />
          </a>
          <a
            href={shop.socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-blue-600 hover:text-blue-800 transition-all"
          >
            <FaFacebook />
          </a>
          <a
            href={shop.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl text-blue-400 hover:text-blue-600 transition-all"
          >
            <FaTwitter />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;
