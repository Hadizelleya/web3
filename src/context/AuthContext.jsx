import { createContext, useEffect, useState } from "react";
import { createSessionId, getAccountDetails, logout } from "../services/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const sessionId = localStorage.getItem("session_id");
        if (sessionId) {
          const userData = await getAccountDetails(sessionId);
          if (userData) {
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(userData));
          } else {
            logout();
          }
        }
      } catch (error) {
        console.log(error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async () => {
    try {
      const sessionId = await createSessionId();
      if (sessionId) {
        const userData = await getAccountDetails(sessionId);
        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(userData));
          return true;
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}> {children}</AuthContext.Provider>;
};

export default AuthContext;
