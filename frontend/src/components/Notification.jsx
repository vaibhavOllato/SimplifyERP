import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../styles/Notification.css";
import { MdCancel } from "react-icons/md";

const Notification = ({ message, type = "success", onClose }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFade(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!message) return null;

  const notificationStyles = {
    success: { className: "notification-success", color: "#00B078" },
    error: { className: "notification-error", color: "#D9534F" },
    info: { className: "notification-info", color: "#007BFF" },
  };

  const { className, color } = notificationStyles[type] || notificationStyles.success;

  return (
    <div className={`notification ${className} ${fade ? "fade-out" : ""}`} role="alert" aria-live="assertive">
      <span className="icon">
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none">
          <circle cx={10} cy={10} r={10} fill={color} />
          {type === "success" && (
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.1203 6.78954C14.3865 7.05581 14.3865 7.48751 14.1203 7.75378L9.12026 12.7538C8.85399 13.02 8.42229 13.02 8.15602 12.7538L5.88329 10.4811C5.61703 10.2148 5.61703 9.78308 5.88329 9.51682C6.14956 9.25055 6.58126 9.25055 6.84753 9.51682L8.63814 11.3074L13.156 6.78954C13.4223 6.52328 13.854 6.52328 14.1203 6.78954Z"
              fill="white"
            />
          )}
          {type === "error" && (
            <path d="M10 4.5C10.5523 4.5 11 4.94772 11 5.5V10C11 10.5523 10.5523 11 10 11C9.44772 11 9 10.5523 9 10V5.5C9 4.94772 9.44772 4.5 10 4.5ZM10 12.5C10.5523 12.5 11 12.9477 11 13.5C11 14.0523 10.5523 14.5 10 14.5C9.44772 14.5 9 14.0523 9 13.5C9 12.9477 9.44772 12.5 10 12.5Z" fill="white" />
          )}
          {type === "info" && (
            <path d="M10 5C10.5523 5 11 5.44772 11 6C11 6.55228 10.5523 7 10 7C9.44772 7 9 6.55228 9 6C9 5.44772 9.44772 5 10 5ZM10 8C10.5523 8 11 8.44772 11 9V13C11 13.5523 10.5523 14 10 14C9.44772 14 9 13.5523 9 13V9C9 8.44772 9.44772 8 10 8Z" fill="white" />
          )}
        </svg>
      </span>
      <span>{message}</span>
      {onClose && (
        <button className="close-button" onClick={onClose} aria-label="Close notification">
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
