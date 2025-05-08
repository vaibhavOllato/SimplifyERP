// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";
// import LogoutModal from "../components/LogoutModal";
// import { Outlet } from "react-router-dom";
// import { useState } from "react";

// const AdminLayout = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openLogoutModal = () => setIsModalOpen(true);
//   const closeLogoutModal = () => setIsModalOpen(false);
//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     window.location.href = "/admin/login";
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Fixed Sidebar */}
//       <div className="h-screen w-64 flex-shrink-0">
//         <Sidebar openLogoutModal={openLogoutModal} />
//       </div>

//       {/* Main Area */}
//       <div className="flex-1 flex flex-col h-screen overflow-hidden">
//         <Header />
//         <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
//           <Outlet />
//         </main>
//       </div>

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openLogoutModal = () => setIsModalOpen(true);
  const closeLogoutModal = () => setIsModalOpen(false);
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Sidebar (absolute positioning so it doesn't affect the content) */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } fixed top-0 left-0 z-40 h-screen bg-gray-900 text-white transition-all duration-300`}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          openLogoutModal={openLogoutModal}
        />
      </div>

      {/* Main Content Area */}
      <div
        className={`${
          isSidebarOpen ? "pl-64" : "pl-16"
        } transition-all duration-300`}
      >
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>

      {/* Logout modal */}
      <LogoutModal
        isOpen={isModalOpen} // Pass the modal state here
        closeModal={closeLogoutModal} // Pass close function
        handleLogout={handleLogout} // Pass logout handler
      />
    </div>
  );
};

export default AdminLayout;
