import { Link, useLocation } from "react-router-dom";
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Box,
  User,
  BarChart,
} from "lucide-react";

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
        <div className="flex items-center justify-between p-4">
          {isOpen && (
            <h2 className="text-2xl font-bold text-cyan-400 transition-opacity duration-300">
              SimplifyERP
            </h2>
          )}

          <button
            className="ml-auto border-2 border-gray-600 p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
            onClick={toggleSidebar}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        <nav className="mt-4">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`flex items-center rounded-lg transition-all duration-300 ease-in-out
              ${isOpen ? "px-4 py-2 gap-3" : "p-3 justify-center"} 
              ${isActive ? "bg-cyan-700 shadow-md" : "hover:bg-gray-800"} 
              ${
                isActive
                  ? "border-l-4 border-[#d81159]"
                  : "border-l-4 border-transparent"
              }`}
                  >
                    <div className="text-white">{link.icon}</div>
                    <span
                      className={`text-sm text-white font-medium transition-all duration-300 ${
                        isOpen
                          ? "opacity-100 ml-1"
                          : "opacity-0 ml-0 w-0 overflow-hidden"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
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
