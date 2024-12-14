import { useEffect, useState } from "react";
import { Typography, CircularProgress, Grid, Box } from "@mui/material";
import { fetchFavorites } from "../services/api";
import ContentCard from "../components/ContentCard";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Exemplo de como pegar o ID do usuário logado
    if (userId) {
      fetchFavorites(userId)
        .then((data) => {
          setFavorites(data.results || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar favoritos:", error);
          setLoading(false);
        });
    } else {
      console.error("Usuário não autenticado.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (favorites.length === 0) {
    return <Typography variant="h5">Nenhum favorito encontrado.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Meus Favoritos
      </Typography>
      <Grid container spacing={2}>
        {favorites.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <ContentCard
              id={item.id}
              title={item.name || item.title || "Sem título"}
              image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              rating={item.vote_average || 0}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Favorites;
