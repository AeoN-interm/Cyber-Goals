import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const login = (jwt) => {
    localStorage.setItem("token", jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const isAuthenticated = !!token;

  // Register function to handle user registration
  const register = async (username, password) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/auth/register`;
      const res = await axios.post(url, { username, password });
      console.log("Registration successful:", res.data);
      login(res.data.token); // Store the token and login automatically
      return { success: true, message: "Registration successful." };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, message: error.response?.data?.message || "Registration failed." };
    }
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
