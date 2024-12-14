import { useEffect, useState } from "react";
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
          setResults(data || []); // Garante que results sempre será um array
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
      <Typography variant="h4" gutterBottom style={{ marginTop: "80px" }}>
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
          {results.map((content) => (
            <Grid item xs={12} sm={6} md={4} key={content.id}>
              <ContentCard content={content} /> {/* Atualizado */}
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" style={{ marginTop: "80px" }}>
          Nenhum resultado encontrado.
        </Typography>
      )}
    </div>
  );
}

export default Search;
