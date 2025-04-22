// const Header = () => (
//     <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
//       <h1 className="text-xl font-semibold text-cyan-600">Welcome to SimplifyERP</h1>
//       <p className="text-sm text-gray-500">User: admin@example.com</p>
//     </header>
//   );
  
//   export default Header;
  


import React from "react";
import { useAuth } from "../context/AuthContext"; // adjust path as needed

const Header = () => {
  const { user } = useAuth(); // assumes user contains firstName, lastName, email

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-cyan-600">Welcome to SimplifyERP</h1>
      {user ? (
        <div className="text-sm text-gray-600 text-right">
          <p>{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-500">User not logged in</p>
      )}
    </header>
  );
};

export default Header;
