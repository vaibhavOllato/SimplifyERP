import { createContext, useState, useEffect, useContext } from "react";

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
      email,
      token,
    };

    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
      setUser(userData);
    } catch (error) {
      console.error("Failed to save user data to localStorage:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
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

// ✅ Export useAuth hook so it can be used in components
export const useAuth = () => useContext(AuthContext);
