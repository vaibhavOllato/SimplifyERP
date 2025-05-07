import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MdCancel } from "react-icons/md";
import {
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineCloseCircle,
} from "react-icons/ai";

const Notification = ({ message, type = "success", onClose }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const typeStyles = {
    success: {
      icon: <AiOutlineCheckCircle className="text-green-600 text-2xl" />,
      bg: "bg-green-100 border-green-500 text-green-800",
    },
    error: {
      icon: <AiOutlineCloseCircle className="text-red-600 text-2xl" />,
      bg: "bg-red-100 border-red-500 text-red-800",
    },
    info: {
      icon: <AiOutlineInfoCircle className="text-blue-600 text-2xl" />,
      bg: "bg-blue-100 border-blue-500 text-blue-800",
    },
  };

  const { icon, bg } = typeStyles[type] || typeStyles.success;

  return (
    <div
      className={`fixed top-9 left-1/2 transform -translate-x-1/2 z-[1000] w-80 max-w-md px-5 py-4 rounded-lg shadow-lg border-l-4 flex items-start gap-3 transition-all duration-500 ${bg} ${
        fade ? "opacity-0 -translate-y-5" : "opacity-100 translate-y-0"
      }`}
      role="alert"
    >
      {icon}
      <span className="flex-1 text-sm font-semibold">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close notification"
          className="text-2xl text-gray-500 hover:text-gray-700 transition-transform duration-200"
        >
          <MdCancel />
        </button>
      )}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "info"]),
  onClose: PropTypes.func,
};

export default Notification;
