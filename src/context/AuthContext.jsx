import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Criação do contexto
export const AuthContext = createContext();

// Provedor do contexto
export const AuthProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSessionId = localStorage.getItem("session_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newSessionId) => {
    setSessionId(newSessionId);
    setIsAuthenticated(true);
    localStorage.setItem("session_id", newSessionId);
  };

  const logout = () => {
    setSessionId(null);
    setIsAuthenticated(false);
    localStorage.removeItem("session_id");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ sessionId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
