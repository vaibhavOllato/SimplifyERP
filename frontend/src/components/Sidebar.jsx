import { useState } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  Settings,
  Users,
  Store,
  LifeBuoy,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import LogoutModal from "./LogoutModal";
import { PanelsTopLeft } from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mainItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Inventory", icon: <Package size={20} />, path: "/inventory" },
    { name: "Orders", icon: <ShoppingCart size={20} />, path: "/orders" },
    { name: "Customer list", icon: <Users size={20} />, path: "/customers" },
    { name: "Purchases", icon: <Users size={20} />, path: "/purchases" },
  ];

  const bottomItems = [
    { name: "Account", icon: <Settings size={20} />, path: "/setting" },
    { name: "Help Center", icon: <LifeBuoy size={20} />, path: "/helpCenter" },
  ];

  const openLogoutModal = () => {
    setIsModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex h-screen">
      <aside
        className={`flex flex-col justify-between bg-white shadow-md p-4 transition-all duration-300 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Top Section */}
        <div>
          <div className="flex items-center justify-between">
            {!collapsed && (
              <h2 className="text-2xl font-bold text-cyan-600 whitespace-nowrap">
                SimplifyERP
              </h2>
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 bg-gray-100 hover:bg-gray-100 rounded transition"
            >
              <PanelsTopLeft size={24} />
            </button>
          </div>

          {/* Main Menu Items */}
          <ul className="mt-6 space-y-2">
            {mainItems.map(({ name, icon, path }) => (
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

            {/* Shop Menu Item */}
            <li>
              <NavLink
                to="/my-shop"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                    isActive
                      ? "bg-cyan-600 text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                <Store size={20} />
                {!collapsed && <span className="font-medium">My Shop</span>}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="space-y-2">
          {/* Help Center and Settings */}
          <ul className="mb-4">
            {bottomItems.map(({ name, icon, path }) => (
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

          {/* Logout Button */}
          <div
            className="flex items-center gap-3 px-4 py-2 rounded-md cursor-pointer hover:bg-cyan-700 hover:text-white text-red-600 transition duration-200"
            onClick={openLogoutModal}
          >
            <FaSignOutAlt size={20} />
            {!collapsed && <span>Log Out</span>}
          </div>
        </div>
      </aside>

      {/* Logout Modal */}
      <LogoutModal open={isModalOpen} handleClose={closeLogoutModal} />
    </div>
  );
};

export default Sidebar;
