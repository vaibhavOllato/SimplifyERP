// const FutureIncrements = () => {
//     const features = [
//       {
//         title: "Multi-Store Management",
//         description: "Manage multiple store branches from a single dashboard with real-time inventory syncing.",
//       },
//       {
//         title: "Advanced Analytics",
//         description: "Get deep insights and visual reports to track sales, expenses, customer trends, and performance.",
//       },
//       {
//         title: "Mobile App Integration",
//         description: "Seamlessly connect to mobile apps for on-the-go access to your ERP system.",
//       },
//       {
//         title: "Barcode & QR Scanning",
//         description: "Enhance inventory accuracy with integrated barcode and QR code support.",
//       },
//     ];
  
//     return (
//       <section className="bg-white py-16 px-4">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
//             Future Increments
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto mb-10">
//             Here’s what we’re working on to make <span className="text-cyan-600 font-semibold">SimplifyERP</span> even better for you.
//           </p>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
//               >
//                 <h3 className="text-xl font-semibold text-cyan-700 mb-2">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     );
//   };
  
//   export default FutureIncrements;
  
import { FaStore, FaChartBar, FaMobileAlt, FaQrcode } from "react-icons/fa";

const features = [
  {
    title: "Multi-Store Management",
    description: "Manage multiple branches in real-time with centralized control.",
    icon: <FaStore size={28} />,
    color: "from-cyan-400 to-blue-500",
  },
  {
    title: "Advanced Analytics",
    description: "Visualize key business data with smart charts & insights.",
    icon: <FaChartBar size={28} />,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Mobile App Integration",
    description: "Access and manage your system from anywhere, anytime.",
    icon: <FaMobileAlt size={28} />,
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Barcode & QR Scanning",
    description: "Speed up inventory with smart barcode & QR support.",
    icon: <FaQrcode size={28} />,
    color: "from-teal-400 to-green-500",
  },
];

const FutureIncrements = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          🚀 Future Increments
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mb-12 text-lg">
          Take a peek into the exciting features coming soon to{" "}
          <span className="text-cyan-600 font-semibold">SimplifyERP</span>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`bg-white/80 backdrop-blur-lg border border-gray-100 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden`}
            >
              {/* Gradient Icon Wrapper */}
              <div
                className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 text-white bg-gradient-to-r ${feature.color} shadow-md ring-4 ring-white/20`}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>

              {/* Glow Overlay */}
              <div className="absolute top-[-80px] left-[-80px] w-48 h-48 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FutureIncrements;



// import { FaStore, FaChartBar, FaMobileAlt, FaQrcode } from "react-icons/fa";

// const features = [
//   {
//     title: "Multi-Store Management",
//     description: "Manage multiple store branches from a single dashboard with real-time inventory syncing.",
//     icon: <FaStore size={32} className="text-white" />,
//     bg: "bg-gradient-to-r from-cyan-500 to-blue-500",
//   },
//   {
//     title: "Advanced Analytics",
//     description: "Visual reports for sales, expenses, and customer insights — all in one place.",
//     icon: <FaChartBar size={32} className="text-white" />,
//     bg: "bg-gradient-to-r from-purple-500 to-indigo-500",
//   },
//   {
//     title: "Mobile App Integration",
//     description: "Use your ERP system on the go with mobile app connectivity and real-time sync.",
//     icon: <FaMobileAlt size={32} className="text-white" />,
//     bg: "bg-gradient-to-r from-pink-500 to-rose-500",
//   },
//   {
//     title: "Barcode & QR Scanning",
//     description: "Simplify inventory tracking with barcode and QR code support across all devices.",
//     icon: <FaQrcode size={32} className="text-white" />,
//     bg: "bg-gradient-to-r from-teal-500 to-green-500",
//   },
// ];

// const FutureIncrements = () => {
//   return (
//     <section className="bg-gray-50 py-20 px-4">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-gray-800 mb-4">
//           🚀 Future Increments
//         </h2>
//         <p className="text-gray-600 max-w-xl mx-auto mb-12">
//           We’re constantly improving <span className="text-cyan-600 font-semibold">SimplifyERP</span>. Here’s a glimpse of what’s coming next!
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
//           {features.map((feature, idx) => (
//             <div
//               key={idx}
//               className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
//             >
//               <div className={`w-14 h-14 flex items-center justify-center rounded-full mb-4 ${feature.bg}`}>
//                 {feature.icon}
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
//               <p className="text-gray-600 text-sm">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FutureIncrements;
