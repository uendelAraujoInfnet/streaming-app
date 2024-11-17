import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSerieDetails, fetchSerieVideos, fetchSerieCredits } from '../services/api';
import { Typography, Box, CircularProgress, Grid, CardMedia, Paper } from '@mui/material';
import styles from './SerieDetails.module.css'; // Importação do CSS Module

function SerieDetails() {
  const { id } = useParams(); // Pega o ID da série da URL
  const [serie, setSerie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    // Busca detalhes da série
    fetchSerieDetails(id).then((data) => {
      setSerie(data);
      setLoading(false);
    });

    // Busca o trailer da série
    fetchSerieVideos(id).then((videos) => {
      const trailerVideo = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      setTrailer(trailerVideo ? `https://www.youtube.com/embed/${trailerVideo.key}` : null);
    });

    // Busca o elenco da série
    fetchSerieCredits(id).then((credits) => {
      setCast(credits.cast.slice(0, 6)); // Exibe apenas os 6 primeiros membros do elenco
    });
  }, [id]);

  if (loading) {
    return <CircularProgress className={styles.loadingSpinner} />;
  }

  if (!serie) {
    return <Typography variant="h5">Série não encontrada</Typography>;
  }

  return (
    <Box className={styles.serieDetailsContainer} p={3}>
      {/* Título e Sinopse */}
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} display={'flex'} justifyContent={'center'}>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
            alt={serie.name}
            className={styles.seriePoster}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom className={styles.serieTitle}>{serie.name}</Typography>
          <Typography variant="body1" gutterBottom className={styles.serieOverview}>{serie.overview}</Typography>
          <Typography variant="h6" className={styles.serieInfo}>
            Data de Estreia: {serie.first_air_date}
          </Typography>
          <Typography variant="h6" className={styles.serieInfo}>
            Número de Temporadas: {serie.number_of_seasons}
          </Typography>
          <Typography variant="h6" className={styles.serieInfo}>
            Número de Episódios: {serie.number_of_episodes}
          </Typography>
          <Typography variant="h6" className={styles.serieInfo}>
            IMDB: {serie.vote_average ? `${(serie.vote_average).toFixed(1)}` : 'Informação não disponível'}
          </Typography>
        </Grid>
      </Grid>

      {/* Trailer da Série */}
      {trailer && (
        <Box mt={4} className={styles.trailerContainer}>
          <Typography variant="h5" className={styles.sectionTitle}>Trailer</Typography>
          <Box className={styles.trailerVideoContainer}>
            <iframe
              width="100%"
              height="400"
              src={trailer}
              title="Trailer da série"
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

export default SerieDetails;
