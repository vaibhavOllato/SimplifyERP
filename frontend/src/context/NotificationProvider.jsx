// import React, { createContext, useState, useContext } from "react";
// import Notification from "../components/Notification";

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);

//   const triggerNotification = (message, type) => {
//     const id = Date.now(); // Unique ID for each notification
//     setNotifications((prev) => [...prev, { id, message, type }]);

//     // Remove notification after 3 seconds with fade-out effect
//     setTimeout(() => {
//       setNotifications((prev) => prev.filter((n) => n.id !== id));
//     }, 3000);
//   };

//   return (
//     <NotificationContext.Provider value={{ triggerNotification }}>
//       {children}
//       <div className="notification-container">
//         {notifications.map((n) => (
//           <Notification
//             key={n.id}
//             message={n.message}
//             type={n.type}
//             onClose={() => setNotifications((prev) => prev.filter((nt) => nt.id !== n.id))}
//           />
//         ))}
//       </div>
//     </NotificationContext.Provider>
//   );
// };

// export const useNotification = () => useContext(NotificationContext);


import React, { createContext, useContext, useState } from "react";
import Notification from "../components/Notification";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const triggerNotification = ({ type = "success", message }) => {
    setNotification({ type, message });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const closeNotification = () => setNotification(null);

  return (
    <NotificationContext.Provider value={{ triggerNotification }}>
      {children}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};
