import { createContext, useEffect, useState } from "react";
import {
  createSessionId,
  getAccountDetails,
  logout,
  fetchToken,
} from "../services/auth";

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
        } else {
          // If we were redirected back from TMDB with an approved token, create the session automatically
          const token = localStorage.getItem("request_token");
          if (token) {
            const newSessionId = await createSessionId();
            if (newSessionId) {
              const newUser = await getAccountDetails(newSessionId);
              if (newUser) {
                setUser(newUser);
                setIsAuthenticated(true);
                localStorage.setItem("user", JSON.stringify(newUser));
              }
            }
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
      // If we already have a session, try to use it
      const existingSession = localStorage.getItem("session_id");
      if (existingSession) {
        const existingUser = await getAccountDetails(existingSession);
        if (existingUser) {
          setUser(existingUser);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(existingUser));
          return true;
        }
      }

      // Try to create a session with an approved token
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

      // No session and/or token not approved yet → start approval flow
      await fetchToken();
      return false;
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
