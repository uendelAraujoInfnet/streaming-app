import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchToken, createSession } from "../services/api";
import {
  Box,
  Button,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Obtém a rota de origem do estado ou redireciona para a home por padrão
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const requestToken = query.get("request_token");

    if (requestToken) {
      createSession(requestToken).then((data) => {
        localStorage.setItem("session_id", data.session_id);
        navigate(from, { replace: true }); // Redireciona para a página de origem após o login
      });
    }
  }, [navigate, from]);

  const handleLogin = async () => {
    const { request_token } = await fetchToken();
    // Configura a URL de autenticação do TMDb
    window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=https://streaming-app-rust.vercel.app/login`;
  };

  return (
    <Container className={styles.loginContainer} maxWidth="sm">
      <Paper elevation={6} className={styles.loginPaper}>
        <Typography variant="h4" gutterBottom className={styles.title}>
          Entrar na Conta
        </Typography>
        <Typography variant="body1" className={styles.subtitle}>
          Faça login com sua conta do TMDb para acessar funcionalidades exclusivas
        </Typography>
        <Button
          variant="contained"
          color="error"
          size="large"
          className={styles.loginButton}
          onClick={handleLogin}
        >
          Login com TMDb
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
