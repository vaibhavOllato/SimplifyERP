// import { useState } from "react";
// import {
//   ChevronLeft,
//   ChevronRight,
//   Home,
//   Package,
//   ShoppingCart,
//   Settings,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import LogoutModal from "./LogoutModal";

// const Sidebar = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const items = [
//     { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
//     { name: "Inventory", icon: <Package size={20} />, path: "/inventory" },
//     { name: "Orders", icon: <ShoppingCart size={20} />, path: "/orders" }, // You can build this later
//     { name: "Settings", icon: <Settings size={20} />, path: "/setting" },
//   ];
//   // Function to handle logout modal opening
//   const openLogoutModal = () => {
//     setIsModalOpen(true);
//   };

//   // Function to handle logout modal closing
//   const closeLogoutModal = () => {
//     setIsModalOpen(false);
//   };
//   return (
//     <div>
//       <aside
//         className={`h-screen bg-white shadow-md p-4 transition-all duration-300 ${
//           collapsed ? "w-20" : "w-64"
//         }`}
//       >
//         <div className="flex items-center justify-between">
//           {!collapsed && (
//             <h2 className="text-2xl font-bold text-cyan-600 whitespace-nowrap">
//               SimplifyERP
//             </h2>
//           )}
//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="p-1 hover:bg-gray-100 rounded transition"
//           >
//             {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
//           </button>
//         </div>

//         <ul className="mt-6 space-y-2">
//           {items.map(({ name, icon, path }) => (
//             <li key={name}>
//               <NavLink
//                 to={path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-3 py-2 rounded-md transition ${
//                     isActive
//                       ? "bg-cyan-600 text-white"
//                       : "hover:bg-gray-100 text-gray-700"
//                   }`
//                 }
//               >
//                 <span>{icon}</span>
//                 {!collapsed && <span>{name}</span>}
//               </NavLink>
//             </li>
//           ))}
//         </ul>
//         {/* Logout Button */}
//         <div
//           className="mt-auto flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-100 text-gray-700"
//           onClick={openLogoutModal}
//         >
//           <span className="text-red-500">
//             <i className="fa fa-sign-out-alt" />
//           </span>
//           {!collapsed && <span className="text-red-500">Log Out</span>}
//         </div>
//       </aside>
//       {/* Logout Modal */}
//       <LogoutModal open={isModalOpen} handleClose={closeLogoutModal} />
//     </div>
//   );
// };

// export default Sidebar;

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Package,
  ShoppingCart,
  Settings,
  Users ,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Importing the Logout icon
import LogoutModal from "./LogoutModal"; // Import the LogoutModal

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to handle modal visibility

  const items = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Inventory", icon: <Package size={20} />, path: "/inventory" },
    { name: "Orders", icon: <ShoppingCart size={20} />, path: "/orders" }, // You can build this later
    { name: "Settings", icon: <Settings size={20} />, path: "/setting" },
    { name: "Customer list", icon: <Users size={20} />, path: "/customers" },
  ];

  // Function to handle logout modal opening
  const openLogoutModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle logout modal closing
  const closeLogoutModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <aside
        className={`h-screen bg-white shadow-md p-4 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h2 className="text-2xl font-bold text-cyan-600 whitespace-nowrap">
              SimplifyERP
            </h2>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-gray-100 rounded transition"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <ul className="mt-6 space-y-2">
          {items.map(({ name, icon, path }) => (
            <li key={name}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                    isActive
                      ? "bg-cyan-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                <span>{icon}</span>
                {!collapsed && <span>{name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout Button with Icon */}
        <div
          className="mt-5 flex ml-1 bg-cyan-600 items-center justify-center gap-3 px-4 py-2 rounded-md cursor-pointer hover:bg-cyan-700 text-white transition duration-200"
          onClick={openLogoutModal}
        >
          <FaSignOutAlt size={20} className="text-white" /> {/* Logout Icon */}
          {!collapsed && <span className="text-white">Log Out</span>}
        </div>
      </aside>

      {/* Logout Modal */}
      <LogoutModal open={isModalOpen} handleClose={closeLogoutModal} />
    </div>
  );
};

export default Sidebar;
