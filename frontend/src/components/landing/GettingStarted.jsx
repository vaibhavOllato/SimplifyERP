// import { FaUserPlus, FaTools, FaChartBar } from "react-icons/fa";

// const steps = [
//   {
//     title: "Create Your Account",
//     icon: <FaUserPlus size={24} />,
//     desc: "Sign up with your email and business details to get started instantly.",
//   },
//   {
//     title: "Set Up Your Store",
//     icon: <FaTools size={24} />,
//     desc: "Add products, customers, staff, and set your inventory preferences.",
//   },
//   {
//     title: "Start Managing",
//     icon: <FaChartBar size={24} />,
//     desc: "Track sales, inventory, and performance — all from your dashboard.",
//   },
// ];

// const GettingStarted = () => {
//   return (
//     <section className="py-20 bg-white">
//       <div className="max-w-6xl mx-auto px-4 text-center">
//         <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//           Get Started in <span className="text-cyan-600">3 Easy Steps</span>
//         </h2>
//         <p className="text-gray-500 max-w-xl mx-auto mb-12 text-lg">
//           Setting up SimplifyERP is quick, simple, and designed for everyone.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
//           {steps.map((step, index) => (
//             <div
//               key={index}
//               className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100 group"
//             >
//               <div className="flex items-center justify-center w-14 h-14 mb-6 mx-auto text-white bg-cyan-600 rounded-full group-hover:scale-110 transition">
//                 {step.icon}
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">
//                 Step {index + 1}: {step.title}
//               </h3>
//               <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GettingStarted;



import { FaUserPlus, FaTools, FaChartBar } from "react-icons/fa";

const steps = [
  {
    title: "Create Your Account",
    icon: <FaUserPlus size={26} />,
    desc: "Sign up with your email and business info to get started in minutes.",
  },
  {
    title: "Set Up Your Store",
    icon: <FaTools size={26} />,
    desc: "Add your products, team, and inventory preferences with ease.",
  },
  {
    title: "Start Managing",
    icon: <FaChartBar size={26} />,
    desc: "Track sales, stock, and growth from a smart, intuitive dashboard.",
  },
];

const GettingStarted = () => {
  return (
    <section className="bg-cyan-600 py-20 px-6">
      <div className="max-w-6xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Get Started in <span className="underline decoration-white/50">3 Easy Steps</span>
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto text-lg mb-14">
          SimplifyERP is designed to make onboarding a breeze — no tech skills needed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
            >
              <div className="w-14 h-14 mb-4 mx-auto flex items-center justify-center text-white bg-cyan-600 rounded-full shadow-md">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">Step {index + 1}: {step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
