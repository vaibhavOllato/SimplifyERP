import { Link, useLocation } from "react-router-dom";
import { LogOut } from "lucide-react";

const Sidebar = ({ openLogoutModal }) => {
  const location = useLocation();
  const navLinks = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/manage-shops", label: "Manage Shops" },
    { path: "/admin/manage-users", label: "Manage Users" },
    { path: "/admin/reports", label: "Reports & Analytics" },
  ];

  return (
    // <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between py-6 px-4">
    <aside className="h-full bg-gray-900 text-white flex flex-col justify-between py-6 px-4">
      <div>
        <h2 className="text-2xl font-bold mb-8 text-cyan-400">SimplifyERP</h2>
        <nav>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block px-3 py-2 rounded-lg ${
                    location.pathname === link.path
                      ? "bg-cyan-600 text-white"
                      : "hover:bg-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div>
        <button
          onClick={openLogoutModal}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
