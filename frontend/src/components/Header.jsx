import React from "react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, loading } = useAuth(); // Read from context

  if (loading) return <div className="flex justify-center items-center p-4">Loading...</div>;

  return (
    <header className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center rounded-b-xl">
      <h1 className="text-2xl font-bold text-white">Welcome to SimplifyERP</h1>

      {/* User Info Section */}
      {user ? (
        <div className="flex items-center space-x-3">
          {/* Optional Avatar */}
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold">
            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
          </div>

          <div className="text-sm text-right">
            <p className="font-semibold text-white">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-gray-200">{user.email}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-200">User not logged in</p>
      )}
    </header>
  );
};

export default Header;
