// import { FaBolt, FaCloud, FaLock, FaSmile } from "react-icons/fa";

// const reasons = [
//   {
//     title: "Fast & Reliable",
//     icon: <FaBolt size={24} />,
//     desc: "Optimized performance for seamless business operations and lightning-fast processing.",
//   },
//   {
//     title: "Cloud Powered",
//     icon: <FaCloud size={24} />,
//     desc: "Access anywhere, anytime. All your business data secured on the cloud.",
//   },
//   {
//     title: "Data Security",
//     icon: <FaLock size={24} />,
//     desc: "Enterprise-grade security to keep your data private and protected.",
//   },
//   {
//     title: "User Friendly",
//     icon: <FaSmile size={24} />,
//     desc: "Simple, intuitive UI designed for non-tech-savvy users and teams.",
//   },
// ];

// const WhyUs = () => {
//   return (
//     <section className="bg-white py-20 px-6">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-gray-800 mb-4">
//           Why Choose <span className="text-cyan-600">SimplifyERP?</span>
//         </h2>
//         <p className="text-gray-500 max-w-xl mx-auto mb-12">
//           We simplify your business processes so you can focus on what matters — growing your business.
//         </p>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10">
//           {reasons.map((item, index) => (
//             <div
//               key={index}
//               className="bg-gray-50 hover:bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
//             >
//               <div className="w-12 h-12 flex items-center justify-center text-white bg-cyan-600 rounded-full mb-4 shadow">
//                 {item.icon}
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
//               <p className="text-gray-600 text-sm">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyUs;



import { FaBolt, FaCloud, FaLock, FaSmile } from "react-icons/fa";

const reasons = [
  {
    title: "Fast & Reliable",
    icon: <FaBolt size={28} />,
    desc: "Blazing fast performance and seamless uptime to keep your operations smooth 24/7.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Cloud Powered",
    icon: <FaCloud size={28} />,
    desc: "Access your ERP from anywhere, with real-time cloud syncing across devices.",
    color: "from-indigo-500 to-purple-500",
  },
  {
    title: "Data Security",
    icon: <FaLock size={28} />,
    desc: "End-to-end encryption ensures your data stays private and protected.",
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "User Friendly",
    icon: <FaSmile size={28} />,
    desc: "Built with simplicity in mind, so even non-tech users can master it quickly.",
    color: "from-green-500 to-emerald-500",
  },
];

const WhyUs = () => {
  return (
    <section id="features" className="bg-gradient-to-b from-white via-gray-50 to-white py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-4xl font-extrabold text-gray-500 mb-4">
          Why Choose <span className="text-cyan-600">SimplifyERP</span>?
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto mb-14 text-lg">
          Trusted by business owners to simplify inventory, sales, and growth.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10">
          {reasons.map((item, index) => (
            <div
              key={index}
              className="relative bg-white/70 backdrop-blur-xl border border-gray-100 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition duration-300 hover:-translate-y-1"
            >
              {/* Glowing Gradient Icon Ring */}
              <div
                className={`w-14 h-14 mb-4 flex items-center justify-center text-white rounded-full bg-gradient-to-r ${item.color} shadow-md ring-4 ring-white/30`}
              >
                {item.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>

              {/* Decorative Glow */}
              <div className="absolute top-[-80px] left-[-60px] w-40 h-40 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl opacity-40 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
