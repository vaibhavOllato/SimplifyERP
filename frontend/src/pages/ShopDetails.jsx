// import React from "react";
// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaInstagram,
//   FaFacebook,
//   FaTwitter,
//   FaMapMarkerAlt,
//   FaGlobe,
//   FaRegClock,
//   FaMoneyBillWave,
//   FaBuilding,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaCalendarAlt,
//   FaTags,
//   FaUser,
//   FaIdBadge,
// } from "react-icons/fa";
// import { Banknote, CreditCard, Wallet } from "lucide-react";

// const ShopDetails = ({ shop }) => {
//   const socialLinks = shop?.socialLinks || {};
//   const paymentIcons = {
//     Cash: <FaMoneyBillWave className="w-5 h-5 text-green-500" />,
//     Card: <CreditCard className="w-5 h-5 text-indigo-500" />,
//     UPI: <Wallet className="w-5 h-5 text-blue-500" />,
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
//         {/* Header */}
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <FaBuilding className="text-cyan-600 w-8 h-8" />
//             <div>
//               <h1 className="text-2xl font-bold text-cyan-800">
//                 {shop.shopName}
//               </h1>
//               <p className="text-sm text-gray-500">{shop.shopType}</p>
//             </div>
//           </div>
//           <span
//             className={`text-xs font-semibold px-3 py-1 rounded-full ${
//               shop.status === "Active"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-red-100 text-red-600"
//             }`}
//           >
//             {shop.status || "Inactive"}
//           </span>
//         </div>

//         {/* Basic Info */}
//         <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
//           <div className="flex items-center gap-2">
//             <FaUser className="text-orange-500" />
//             <span>User ID: {shop.userId}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <FaIdBadge className="text-indigo-500" />
//             <span>Shop ID: {shop.shopId}</span>
//           </div>
//         </div>

//         {/* Contact Info */}
//         <div className="space-y-3 text-gray-700 text-sm">
//           <div className="flex items-center gap-2">
//             <FaMapMarkerAlt className="text-red-500" />
//             <span>{shop.address}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <FaPhoneAlt className="text-green-500" />
//             <a href={`tel:${shop.phone}`} className="hover:underline">
//               {shop.phone}
//             </a>
//           </div>
//           <div className="flex items-center gap-2">
//             <FaEnvelope className="text-blue-500" />
//             <a href={`mailto:${shop.email}`} className="hover:underline">
//               {shop.email}
//             </a>
//           </div>
//           {shop.website && (
//             <div className="flex items-center gap-2">
//               <FaGlobe className="text-purple-500" />
//               <a
//                 href={shop.website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:underline"
//               >
//                 {shop.website}
//               </a>
//             </div>
//           )}
//         </div>

//         {/* Timings & GST */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
//           <div>
//             <h2 className="font-medium mb-2 flex items-center gap-2">
//               <FaRegClock className="text-yellow-500 w-5 h-5" /> Shop opening
//               time
//             </h2>
//             <p className="ml-6">Opens: {shop.openingTime}</p>
//             <p className="ml-6">Closes: {shop.closingTime}</p>
//           </div>
//           <div className="flex items-center gap-2 text-sm">
//             <FaBuilding className="text-cyan-500 w-5 h-5" />
//             <h2 className="font-medium">GST Number:</h2>
//             <span className="text-gray-700 font-semibold">
//               {shop.gstNumber || "Not Provided"}
//             </span>
//           </div>
//         </div>

//         {/* Tax Rates */}
//         {shop.taxRates?.length > 0 && (
//           <div>
//             <h2 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
//               <FaTags className="text-pink-500" /> Tax Rates
//             </h2>
//             <ul className="list-disc ml-6 space-y-1 ">
//               {shop.taxRates.map((tax) => (
//                 <li key={tax._id}>
//                   {tax.category}: {tax.rate}%
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Secondary Categories */}
//         {shop.secondaryCategories?.length > 0 && (
//           <div>
//             <h2 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
//               <FaTags className="text-yellow-500" /> Secondary Categories:
//             </h2>
//             <div className="flex flex-wrap gap-2 ml-6">
//               {shop.secondaryCategories.map((cat, idx) => (
//                 <span
//                   key={idx}
//                   className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
//                 >
//                   {cat}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Payment Methods */}
//         {shop.paymentMethods?.length > 0 && (
//           <div>
//             <h2 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
//               <FaMoneyBillWave className="text-green-500 w-5 h-5" /> Accepted
//               Payment Methods
//             </h2>
//             <div className="flex flex-wrap gap-3">
//               {shop.paymentMethods.map((method, idx) => (
//                 <span
//                   key={idx}
//                   className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
//                 >
//                   {paymentIcons[method] || <Wallet className="w-5 h-5" />}
//                   {method}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Verification Status */}
//         <div className="flex items-center gap-2 text-sm text-gray-700">
//           {shop.verified ? (
//             <FaCheckCircle className="text-green-500" />
//           ) : (
//             <FaTimesCircle className="text-red-500" />
//           )}
//           <span>{shop.verified ? "Verified Shop" : "Not Verified"}</span>
//         </div>

//         {/* Created Date */}
//         <div className="flex items-center gap-2 text-sm text-gray-600">
//           <FaCalendarAlt className="text-gray-500" />
//           Created At: {new Date(shop.createdAt).toLocaleString()}
//         </div>

//         {/* Social Links */}
//         {(socialLinks.instagram ||
//           socialLinks.facebook ||
//           socialLinks.twitter) && (
//           <div className="flex items-center gap-5 mt-6">
//             {socialLinks.instagram && (
//               <a
//                 href={socialLinks.instagram}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-pink-500 hover:text-pink-700 text-2xl"
//               >
//                 <FaInstagram />
//               </a>
//             )}
//             {socialLinks.facebook && (
//               <a
//                 href={socialLinks.facebook}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 hover:text-blue-800 text-2xl"
//               >
//                 <FaFacebook />
//               </a>
//             )}
//             {socialLinks.twitter && (
//               <a
//                 href={socialLinks.twitter}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-sky-400 hover:text-sky-600 text-2xl"
//               >
//                 <FaTwitter />
//               </a>
//             )}
//           </div>
//         )}
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
  FaGlobe,
  FaRegClock,
  FaMoneyBillWave,
  FaBuilding,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaTags,
  FaUser,
  FaIdBadge,
} from "react-icons/fa";
import { Banknote, CreditCard, Wallet } from "lucide-react";

const ShopDetails = ({ shop }) => {
  if (!shop || Object.keys(shop).length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center text-gray-600">
        <p className="text-lg font-semibold mb-2">No Shop Registered</p>
        <p>Please register your shop to view details here.</p>
      </div>
    );
  }

  const socialLinks = shop?.socialLinks || {};
  const paymentIcons = {
    Cash: <FaMoneyBillWave className="w-5 h-5 text-green-500" />,
    Card: <CreditCard className="w-5 h-5 text-indigo-500" />,
    UPI: <Wallet className="w-5 h-5 text-blue-500" />,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FaBuilding className="text-cyan-600 w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold text-cyan-800">
                {shop.shopName}
              </h1>
              <p className="text-sm text-gray-500">{shop.shopType}</p>
            </div>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              shop.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {shop.status || "Inactive"}
          </span>
        </div>

        {/* Basic Info */}
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaUser className="text-orange-500" />
            <span>User ID: {shop.userId}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaIdBadge className="text-indigo-500" />
            <span>Shop ID: {shop.shopId}</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 text-gray-700 text-sm">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            <span>{shop.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-green-500" />
            <a href={`tel:${shop.phone}`} className="hover:underline">
              {shop.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-blue-500" />
            <a href={`mailto:${shop.email}`} className="hover:underline">
              {shop.email}
            </a>
          </div>
          {shop.website && (
            <div className="flex items-center gap-2">
              <FaGlobe className="text-purple-500" />
              <a
                href={shop.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {shop.website}
              </a>
            </div>
          )}
        </div>

        {/* Timings & GST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-700">
          <div>
            <h2 className="font-medium mb-2 flex items-center gap-2">
              <FaRegClock className="text-yellow-500 w-5 h-5" /> Shop opening time
            </h2>
            <p className="ml-6">Opens: {shop.openingTime}</p>
            <p className="ml-6">Closes: {shop.closingTime}</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <FaBuilding className="text-cyan-500 w-5 h-5" />
            <h2 className="font-medium">GST Number:</h2>
            <span className="text-gray-700 font-semibold">
              {shop.gstNumber || "Not Provided"}
            </span>
          </div>
        </div>

        {/* Tax Rates */}
        {shop.taxRates?.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
              <FaTags className="text-pink-500" /> Tax Rates
            </h2>
            <ul className="list-disc ml-6 space-y-1">
              {shop.taxRates.map((tax) => (
                <li className="font-normal text-gray-600" key={tax._id}>
                  {tax.category}: {tax.rate}%
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Secondary Categories */}
        {shop.secondaryCategories?.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
              <FaTags className="text-yellow-500" /> Secondary Categories:
            </h2>
            <div className="flex flex-wrap gap-2 ml-6">
              {shop.secondaryCategories.map((cat, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-gray-200 rounded-full text-sm text-gray-700"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Payment Methods */}
        {shop.paymentMethods?.length > 0 && (
          <div>
            <h2 className="text-sm font-medium text-gray-800 mb-2 flex items-center gap-2">
              <FaMoneyBillWave className="text-green-500 w-5 h-5" /> Accepted
              Payment Methods
            </h2>
            <div className="flex flex-wrap gap-3">
              {shop.paymentMethods.map((method, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {paymentIcons[method] || <Wallet className="w-5 h-5" />}
                  {method}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Verification Status */}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          {shop.verified ? (
            <FaCheckCircle className="text-green-500" />
          ) : (
            <FaTimesCircle className="text-red-500" />
          )}
          <span>{shop.verified ? "Verified Shop" : "Not Verified"}</span>
        </div>

        {/* Created Date */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaCalendarAlt className="text-gray-500" />
          Created At: {new Date(shop.createdAt).toLocaleString()}
        </div>

        {/* Social Links */}
        {(socialLinks.instagram ||
          socialLinks.facebook ||
          socialLinks.twitter) && (
          <div className="flex items-center gap-5 mt-6">
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700 text-2xl"
              >
                <FaInstagram />
              </a>
            )}
            {socialLinks.facebook && (
              <a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-2xl"
              >
                <FaFacebook />
              </a>
            )}
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-600 text-2xl"
              >
                <FaTwitter />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopDetails;
