import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken, createSession } from "../services/api";
import {
  Box,
  Button,
  Typography,
  Paper,
  Container,
  TextField,
} from "@mui/material";
import styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const requestToken = query.get("request_token");

    if (requestToken) {
      createSession(requestToken).then((data) => {
        if (data.session_id) {
          localStorage.setItem("session_id", data.session_id);
          navigate("/");
        } else {
          console.error("Erro ao criar sessão.");
        }
      });
    }
  }, [navigate]);

  const handleLogin = async () => {
    const { request_token } = await fetchToken();
    if (request_token) {
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=https://streaming-app-rust.vercel.app/login`;
    } else {
      console.error("Erro ao obter request_token.");
    }
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
          color="primary"
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
