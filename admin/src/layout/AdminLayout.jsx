// import { Link, Outlet, useLocation } from "react-router-dom";
// import LogoutModal from "../components/LogoutModal";
// import { useState } from "react";
// import { LogOut } from "lucide-react"; // Optional icon if you use lucide

// const AdminLayout = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const location = useLocation();

//   const openLogoutModal = () => setIsModalOpen(true);
//   const closeLogoutModal = () => setIsModalOpen(false);
//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     window.location.href = "/admin/login";
//   };

//   const navLinks = [
//     { path: "/admin/dashboard", label: "Dashboard" },
//     { path: "/admin/manage-shops", label: "Manage Shops" },
//     { path: "/admin/manage-users", label: "Manage Users" },
//     { path: "/admin/reports", label: "Reports & Analytics" },
//   ];

//   return (
//     <div className="flex min-h-screen text-gray-800">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white flex flex-col justify-between py-6 px-4">
//         <div>
//           <h2 className="text-2xl font-bold mb-8 text-cyan-400">SimplifyERP</h2>
//           <nav>
//             <ul className="space-y-3">
//               {navLinks.map((link) => (
//                 <li key={link.path}>
//                   <Link
//                     to={link.path}
//                     className={`block px-3 py-2 rounded-lg ${
//                       location.pathname === link.path
//                         ? "bg-cyan-600 text-white"
//                         : "hover:bg-gray-700"
//                     }`}
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </div>

//         {/* Logout button */}
//         <div>
//           <button
//             onClick={openLogoutModal}
//             className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-red-600 hover:bg-red-700 text-white"
//           >
//             <LogOut size={18} /> Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6 bg-gray-50 overflow-y-auto">
//         <Outlet />
//       </main>

//       {/* Logout Modal */}
//       <LogoutModal
//         isOpen={isModalOpen}
//         closeModal={closeLogoutModal}
//         handleLogout={handleLogout}
//       />
//     </div>
//   );
// };

// export default AdminLayout;


import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import LogoutModal from "../components/LogoutModal";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLogoutModal = () => setIsModalOpen(true);
  const closeLogoutModal = () => setIsModalOpen(false);
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <div className="h-screen w-64 flex-shrink-0">
        <Sidebar openLogoutModal={openLogoutModal} />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={isModalOpen}
        closeModal={closeLogoutModal}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default AdminLayout;
