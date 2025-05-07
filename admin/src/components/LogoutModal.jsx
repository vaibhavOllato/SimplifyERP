import { FaSignOutAlt, FaTimes } from "react-icons/fa";

const LogoutModal = ({ isOpen, closeModal, handleLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-3xl w-full max-w-lg p-8 transform scale-95 transition-all duration-500 ease-in-out shadow-2xl">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-700 hover:text-gray-500 transition"
        >
          <FaTimes size={24} />
        </button>

        {/* Icon & Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-cyan-600 p-4 rounded-full mb-4 shadow-xl">
            <FaSignOutAlt size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">Log Out</h2>
          <p className="text-lg text-gray-600 opacity-80">
            Are you sure you want to log out of your account?
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-6">
          <button
            onClick={closeModal}
            className="px-6 py-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
