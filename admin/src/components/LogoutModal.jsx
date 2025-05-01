import { useState } from "react";

const LogoutModal = ({ isOpen, closeModal, handleLogout }) => {
  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-xl font-semibold text-center mb-4">Are you sure you want to log out?</h3>
          <div className="flex justify-between">
            <button
              onClick={closeModal}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default LogoutModal;
