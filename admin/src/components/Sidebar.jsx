// import { Link, useLocation } from "react-router-dom";
// import { LogOut } from "lucide-react";

// const Sidebar = ({ openLogoutModal }) => {
//   const location = useLocation();
//   const navLinks = [
//     { path: "/admin/dashboard", label: "Dashboard" },
//     { path: "/admin/manage-shops", label: "Manage Shops" },
//     { path: "/admin/manage-users", label: "Manage Users" },
//     { path: "/admin/reports", label: "Reports & Analytics" },
//   ];

//   return (
//     // <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between py-6 px-4">
//     <aside className="h-full bg-gray-900 text-white flex flex-col justify-between py-6 px-4">
//       <div>
//         <h2 className="text-2xl font-bold mb-8 text-cyan-400">SimplifyERP</h2>
//         <nav>
//           <ul className="space-y-3">
//             {navLinks.map((link) => (
//               <li key={link.path}>
//                 <Link
//                   to={link.path}
//                   className={`block px-3 py-2 rounded-lg ${
//                     location.pathname === link.path
//                       ? "bg-cyan-600 text-white"
//                       : "hover:bg-gray-700"
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       <div>
//         <button
//           onClick={openLogoutModal}
//           className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white"
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
import { Link, useLocation } from "react-router-dom";
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Box,
  User,
  BarChart,
} from "lucide-react"; // Import relevant icons

const Sidebar = ({ isOpen, toggleSidebar, openLogoutModal }) => {
  const location = useLocation();

  const navLinks = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    {
      path: "/admin/manage-shops",
      label: "Manage Shops",
      icon: <Box size={18} />,
    },
    {
      path: "/admin/manage-users",
      label: "Manage Users",
      icon: <User size={18} />,
    },
    {
      path: "/admin/reports",
      label: "Reports & Analytics",
      icon: <BarChart size={18} />,
    },
  ];

  return (
    <aside
      className={`bg-gray-900 text-white flex flex-col justify-between transition-all duration-300 
      ${isOpen ? "w-64" : "w-16"} h-screen rounded-xl shadow-lg`} // Ensure the sidebar takes full height
    >
      <div>
        <div className="flex justify-end p-2">
          <button
            className={`border-2 border-gray-600 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none`}
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <h2
          className={`text-2xl font-bold mb-8 text-cyan-400 px-4 transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          SimplifyERP
        </h2>

        <nav>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === link.path
                      ? "bg-cyan-600"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <span className="mr-2">{link.icon}</span> {/* Icon here */}
                  <span className={`text-sm ${isOpen ? "block" : "hidden"}`}>
                    {link.label}
                  </span>{" "}
                  {/* Show text only when sidebar is open */}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="p-2">
        <button
          onClick={openLogoutModal}
          className="w-full flex items-center justify-center gap-2 py-2 px-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
        >
          <LogOut size={18} />
          <span className={`${isOpen ? "block" : "hidden"}`}>Logout</span>{" "}
          {/* Show text only when sidebar is open */}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
