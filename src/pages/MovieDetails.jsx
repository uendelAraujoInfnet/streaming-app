import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieVideos, fetchMovieCredits } from '../services/api';
import { Typography, Box, CircularProgress, Grid, CardMedia, Paper } from '@mui/material';
import styles from './MovieDetails.module.css'; // Importação do CSS Module

function MovieDetails() {
  const { id } = useParams(); // Pega o ID do filme da URL
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    // Busca detalhes do filme
    fetchMovieDetails(id).then((data) => {
      setMovie(data);
      setLoading(false);
    });

    // Busca o trailer do filme
    fetchMovieVideos(id).then((videos) => {
      const trailerVideo = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      setTrailer(trailerVideo ? `https://www.youtube.com/embed/${trailerVideo.key}` : null);
    });

    // Busca o elenco do filme
    fetchMovieCredits(id).then((credits) => {
      setCast(credits.cast.slice(0, 6)); // Exibe apenas os 6 primeiros membros do elenco
    });
  }, [id]);

  if (loading) {
    return <CircularProgress className={styles.loadingSpinner} />;
  }

  if (!movie) {
    return <Typography variant="h5">Filme não encontrado</Typography>;
  }

  return (
    <Box className={styles.movieDetailsContainer} p={3}>
      {/* Título e Sinopse */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.moviePoster}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom className={styles.movieTitle}>{movie.title}</Typography>
          <Typography variant="body1" gutterBottom className={styles.movieOverview}>{movie.overview}</Typography>
          <Typography variant="h6" className={styles.movieInfo}>
            Data de Lançamento: {movie.release_date}
          </Typography>
          <Typography variant="h6" className={styles.movieInfo}>
            Orçamento: {movie.budget ? `$${movie.budget.toLocaleString()}` : 'Informação não disponível'}
          </Typography>
          <Typography variant="h6" className={styles.movieInfo}>
            Faturamento: {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'Informação não disponível'}
          </Typography>
          <Typography variant="h6" className={styles.movieInfo}>
            IMDB: {movie.revenue ? `${(movie.vote_average).toFixed(1)}` : 'Informação não disponível'}
          </Typography>
        </Grid>
      </Grid>

      {/* Trailer do Filme */}
      {trailer && (
        <Box mt={4} className={styles.trailerContainer}>
          <Typography variant="h5" className={styles.sectionTitle}>Trailer</Typography>
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
        <Typography variant="h5" className={styles.sectionTitle}>Elenco</Typography>
        <Grid container spacing={2}>
          {cast.map((actor) => (
            <Grid item xs={6} sm={4} md={2} key={actor.id}>
              <Paper className={styles.castCard}>
                <Typography variant="body1">{actor.name}</Typography>
                <Typography variant="body2" color="textSecondary">como {actor.character}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default MovieDetails;
