import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Check login status using session
  const checkSession = async () => {
    try {
      const res = await axios.get(`${apiUrl}/users/ls`, {
        withCredentials: true,
      });

      console.log("Session check response:", res.data);

      if (res.data.loggedIn) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking login session:", error);
      setUser(null);
    } finally {
      setLoading(false); // Done loading
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = (userData) => {
    // optional if you handle login via redirect or already set session
    setUser(userData);
    // setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post(
        `${apiUrl}/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
