import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Typography, CircularProgress, Button, Box } from "@mui/material";
import ContentCard from "../components/ContentCard";
import { fetchMovies } from "../services/api";
import styles from "./Movies.module.css";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1); // Total de páginas disponíveis

  // Manipulação de query string
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"), 10) || 1;

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchMovies(page) // Chama a API para buscar apenas filmes
      .then((data) => {
        setMovies(data.results || []);
        setTotalPages(data.total_pages); // Atualiza o total de páginas
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar filmes:", err);
        setError("Não foi possível carregar os filmes.");
        setLoading(false);
      });
  }, [page]); // Atualiza os filmes ao alterar a página

  const handleNextPage = () => {
    if (page < totalPages) {
      setSearchParams({ page: page + 1 });
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setSearchParams({ page: page - 1 });
    }
  };

  return (
    <div className={styles.moviesPage}>
      <Typography variant="h4" gutterBottom>
        Filmes
      </Typography>
      {error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={2}>
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <ContentCard
                  content={movie}
                  movie={movie}
                  title={movie.title}
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  rating={movie.vote_average}
                />
              </Grid>
            ))}
          </Grid>
          {/* Controles de Paginação */}
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Button
              variant="contained"
              onClick={handlePreviousPage}
              disabled={page === 1}
              className={styles.paginationButton}
            >
              Página Anterior
            </Button>
            <Typography
              variant="body1"
              className={styles.pageIndicator}
              margin="0 16px"
            >
              Página {page} de {totalPages}
            </Typography>
            <Button
              variant="contained"
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={styles.paginationButton}
            >
              Próxima Página
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}

export default Movies;
