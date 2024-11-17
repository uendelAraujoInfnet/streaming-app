import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Typography, CircularProgress, Button, Box } from "@mui/material";
import ContentCard from "../components/ContentCard";
import { fetchReleases } from "../services/api";
import styles from "./Releases.module.css";

function Releases() {
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
    fetchReleases(page)
      .then((data) => {
        console.log("Filmes Recebidos:", data.results); // Verifica os dados recebidos
        setMovies(data.results || []);
        setTotalPages(data.total_pages); // Define o total de páginas disponíveis
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Não foi possível carregar os lançamentos.");
        setLoading(false);
      });
  }, [page]); // Atualiza os dados quando a página muda

  // FUnção para realizar a ação de proxima página
  const handleNextPage = () => {
    if (page < totalPages) {
      setSearchParams({ page: page + 1 });
    }
  };

  //FUnção para realizar a ação de retorceder a página
  const handlePreviousPage = () => {
    if (page > 1) {
      setSearchParams({ page: page - 1 });
    }
  };

  return (
    <div className={styles.releasesPage}>
      <Typography variant="h4" gutterBottom>
        Lançamentos Recentes
      </Typography>
      {error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : loading ? (
        <CircularProgress />
      ) : movies.length > 0 ? (
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
              variant="outlined"
              onClick={() => setPage(1)}
              disabled={page === 1}
              className={styles.paginationButton}
              style={{ marginRight: 10}}
            >
              Primeira Página
            </Button>
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
            <Button
              variant="outlined"
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className={styles.paginationButton}
              style={{ marginLeft: 10}}
            >
              Última Página
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="body1">Nenhum lançamento encontrado.</Typography>
      )}
    </div>
  );
}

export default Releases;
