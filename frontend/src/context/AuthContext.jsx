// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   // Initialize user from localStorage
//   const [user, setUser] = useState(() => {
//     try {
//       const savedUser = localStorage.getItem("user");
//       return savedUser ? JSON.parse(savedUser) : null;
//     } catch (error) {
//       console.error("Failed to parse user data from localStorage:", error);
//       return null;
//     }
//   });

//   // Loading state (can be extended for async initialization)
//   const [loading, setLoading] = useState(true);

//   // Simulate loading for async effects (if needed)
//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   // Update user verification status and persist to localStorage
//   const updateUserVerification = () => {
//     const updatedUser = { ...user, isVerified: true };
//     localStorage.setItem("user", JSON.stringify(updatedUser));
//     setUser(updatedUser); // Update the state to reflect the changes immediately
//   };

//   // Update user profile with new data and persist to localStorage
//   const updateUserProfile = (updatedData) => {
//     const updatedUser = { ...user, ...updatedData };
//     localStorage.setItem("user", JSON.stringify(updatedUser)); // Persist updated user data
//     setUser(updatedUser); // Update state
//   };

//   // Get user ID
//   const getUserId = () => {
//     return user?.userId || null; // Ensure fallback to null if userId is not available
//   };

//   // Login function
//   const login = ({
//     first_name,
//     last_name,
//     id,
//     token,
//     phone,
//     userId,
//     // dateOfBirth,
//     role,
//     email,
//     // profile_picture,
//     // isVerified,
//     // payment_status,
//     // gender,
//   }) => {
//     const userData = {
//       first_name,
//       last_name,
//       id,
//       phone,
//       userId,
//     //   dateOfBirth,
//     //   role,
//       email,
//     //   profile_picture,
//     //   isVerified,
//     //   payment_status,
//     //   gender,
//     };

//     try {
//       // Save token and user data in localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(userData));
//       setUser(userData);
//     } catch (error) {
//       console.error("Failed to save user data to localStorage:", error);
//     }
//   };

//   // Logout function to clear user and token
//   const logout = () => {
//     try {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       setUser(null);
//     } catch (error) {
//       console.error("Failed to remove user data from localStorage:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         getUserId,
//         loading,
//         updateUserVerification,
//         updateUserProfile,
//         isAuthenticated: !!user, // If user exists, authenticated
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      return null;
    }
  });

  const login = ({ first_name, last_name, id, token, phone, userId, email }) => {
    const userData = {
      first_name,
      last_name,
      id,
      phone,
      userId,
    //   dateOfBirth,
    //   role,
      email,
    //   profile_picture,
    //   isVerified,
    //   payment_status,
    //   gender,
      token,
    };

    try {
      localStorage.setItem("user", JSON.stringify(userData)); // Store user data
      localStorage.setItem("token", token); // Store token
      setUser(userData); // Update context state
    } catch (error) {
      console.error("Failed to save user data to localStorage:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user"); // Remove user data
      localStorage.removeItem("token"); // Remove token
      setUser(null); // Clear context state
    } catch (error) {
      console.error("Failed to remove user data from localStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
