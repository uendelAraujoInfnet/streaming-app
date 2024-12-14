import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails, fetchMovieVideos, fetchMovieCredits } from "../services/api";
import { Typography, Box, CircularProgress, Grid, CardMedia, Paper, Button } from "@mui/material";
import styles from "./MovieDetails.module.css";
import { useAuth } from "../context/AuthContext";
import FavoriteButton from "../components/FavoriteButton";
import RatingComponent from "../components/RatingComponent";



function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, sessionId } = useAuth();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const movieData = await fetchMovieDetails(id, sessionId);
        setMovie(movieData);

        const videos = await fetchMovieVideos(id, sessionId);
        const trailerVideo = videos.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(trailerVideo ? `https://www.youtube.com/embed/${trailerVideo.key}` : null);

        const credits = await fetchMovieCredits(id, sessionId);
        setCast(credits.cast.slice(0, 6));
      } catch (error) {
        console.error("Erro ao carregar dados do filme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isAuthenticated, sessionId, navigate]);

  if (loading) {
    return (
      <Box className={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box className={styles.errorContainer}>
        <Typography variant="h5" align="center">
          Filme não encontrado.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.movieDetailsContainer} p={3}>
      <Grid container spacing={4}>
        {/* Poster do Filme */}
        <Grid item xs={12} md={6} display={"flex"} justifyContent={"center"}>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.moviePoster}
          />
        </Grid>

        {/* Detalhes do Filme */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom className={styles.movieTitle}>
            {movie.title}
          </Typography>
          <Typography variant="body1" gutterBottom className={styles.movieOverview}>
            {movie.overview}
          </Typography>
          <Typography variant="h6" className={styles.movieInfo}>
            Data de Lançamento: {movie.release_date}
          </Typography>
          <Typography variant="h6" className={styles.movieInfo}>
            Orçamento:{" "}
            {movie.budget ? `$${movie.budget.toLocaleString()}` : "Informação não disponível"}
          </Typography>
          <Typography variant="h6" className={styles.movieInfo}>
            Faturamento:{" "}
            {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "Informação não disponível"}
          </Typography>
          <Typography variant="h6" className={styles.movieInfo}>
            IMDB:{" "}
            {movie.vote_average ? `${movie.vote_average.toFixed(1)}` : "Informação não disponível"}
          </Typography>

          {/* Botão de Favoritar */}
          <Box mt={2}>
            <FavoriteButton id={id} isFavorite={movie.favorite || false} />
          </Box>

          {/* Componente de Avaliação */}
          <Box mt={2}>
            <Typography variant="h6" className={styles.sectionTitle}>
              Avalie este Filme
            </Typography>
            <RatingComponent id={id} />
          </Box>
        </Grid>
      </Grid>

      {/* Trailer do Filme */}
      {trailer && (
        <Box mt={4} className={styles.trailerContainer}>
          <Typography variant="h5" className={styles.sectionTitle}>
            Trailer
          </Typography>
          <Box className={styles.trailerVideoContainer}>
            <iframe
              width="100%"
              height="400"
              src={trailer}
              title="Trailer do filme"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.trailerVideo}
            ></iframe>
          </Box>
        </Box>
      )}

      {/* Elenco */}
      <Box mt={4} className={styles.castContainer}>
        <Typography variant="h5" className={styles.sectionTitle}>
          Elenco
        </Typography>
        <Grid container spacing={2}>
          {cast.map((actor) => (
            <Grid item xs={6} sm={4} md={2} key={actor.id}>
              <Paper className={styles.castCard}>
                <Typography variant="body1">{actor.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  como {actor.character}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default MovieDetails;
