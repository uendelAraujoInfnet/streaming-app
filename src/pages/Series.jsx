import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Typography, CircularProgress, Button, Box } from "@mui/material";
import ContentCard from "../components/ContentCard";
import { fetchSeries } from "../services/api";
import styles from "./Series.module.css";

function Series() {
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1); // Total de páginas disponíveis

  // Manipulação de query string
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"), 10) || 1;

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchSeries(page) // Chama a API para buscar séries
      .then((data) => {
        setSeries(data.results || []);
        setTotalPages(data.total_pages); // Atualiza o total de páginas
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar séries:", err);
        setError("Não foi possível carregar as séries.");
        setLoading(false);
      });
  }, [page]); // Atualiza as séries ao alterar a página

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
    <div className={styles.seriesPage}>
      <Typography variant="h4" gutterBottom>
        Séries
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
            {series.map((serie) => (
              <Grid item xs={12} sm={6} md={4} key={serie.id}>
                <ContentCard
                  content={serie}
                  serie={serie}
                  title={serie.name || "Título Desconhecido"} // Usar `name` para séries
                  image={
                    serie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
                      : "/path/to/default-image.jpg"
                  }
                  rating={serie.vote_average || 0}
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

export default Series;
