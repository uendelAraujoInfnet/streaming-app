import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAccountDetails } from "../services/api"; // Função para buscar detalhes do usuário no TMDb

// Criação do contexto
export const AuthContext = createContext();

// Provedor do contexto
export const AuthProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Armazena os detalhes do usuário
  const [loading, setLoading] = useState(true); // Estado para verificar o carregamento inicial
  const navigate = useNavigate();

  // Efeito para verificar se há uma sessão armazenada no localStorage
  useEffect(() => {
    const storedSessionId = localStorage.getItem("session_id");
    if (storedSessionId) {
      setSessionId(storedSessionId);
      setIsAuthenticated(true);
      setLoading(true);

      // Busca os detalhes do usuário
      fetchAccountDetails(storedSessionId)
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar detalhes do usuário:", error);
          logout(); // Limpa a sessão em caso de erro
        });
    } else {
      setLoading(false); // Carregamento concluído caso não haja sessão
    }
  }, []);

  // Função de login
  const login = (newSessionId) => {
    setSessionId(newSessionId);
    setIsAuthenticated(true);
    localStorage.setItem("session_id", newSessionId);

    // Busca os detalhes do usuário após o login
    fetchAccountDetails(newSessionId)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do usuário após login:", error);
        logout();
      });
  };

  // Função de logout
  const logout = () => {
    setSessionId(null);
    setIsAuthenticated(false);
    setUser(null); // Limpa os dados do usuário
    localStorage.removeItem("session_id");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ sessionId, isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
  return useContext(AuthContext);
};
