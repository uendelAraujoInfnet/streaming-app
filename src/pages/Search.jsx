import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchSearchResults } from "../services/api";
import ContentCard from "../components/ContentCard";
import { Grid, Typography, CircularProgress } from "@mui/material";
import styles from "./Search.module.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search() {
  const query = useQuery();
  const searchTerm = query.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      setLoading(true);
      setError(null);
      fetchSearchResults(searchTerm)
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Ocorreu um erro ao buscar os resultados.");
          setLoading(false);
        });
    }
  }, [searchTerm]);

  return (
    <div style={{ padding: "16px" }} className={styles.searchPage}>
      <Typography variant="h4" gutterBottom>
        Resultados para "{searchTerm}"
      </Typography>
      {error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : loading ? (
        <CircularProgress />
      ) : results.length > 0 ? (
        <Grid container spacing={2}>
          {results.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <ContentCard
                title={item.title || item.name}
                image={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                    : "/path/to/default-image.jpg" // Substitua pelo caminho da imagem padrão
                }
                rating={item.vote_average}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">Nenhum resultado encontrado.</Typography>
      )}
    </div>
  );
}

export default Search;
