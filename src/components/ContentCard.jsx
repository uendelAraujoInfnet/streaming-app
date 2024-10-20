import styles from "./ContentCard.module.css";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";

const ContentCard = ({ movie }) => {
  
  // Verifica se os dados do filme e o id estão presentes
  if (!movie || !movie.id) {
    return null; // Não renderiza o componente se os dados não estiverem disponíveis
  }

  return (
    <Card className={styles.contentCard}>
      <Link to={`/movie/${movie.id}`}>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="h6">{movie.title}</Typography>
          <Rating
            name="read-only"
            value={movie.vote_average / 2}
            readOnly
            precision={0.5}
            className={styles.cardRating}
          />
        </CardContent>
      </Link>
    </Card>
  );
};

export default ContentCard;
