import styles from "./ContentCard.module.css";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";

const ContentCard = ({ content }) => {
  if (!content || !content.id) {
    console.error("Dados do conteúdo ausentes:", content);
    return <Typography>Conteúdo indisponível</Typography>;
  }

  const isMovie = content.title !== undefined;
  const title = isMovie ? content.title : content.name;
  const linkPath = isMovie ? `/movies/${content.id}` : `/series/${content.id}`;

  const posterPath = content.poster_path
    ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
    : "/assets/images/default-image.jpg";

  return (
    <Card className={styles.contentCard}>
      <Link to={linkPath}>
        <CardMedia
          component="img"
          image={posterPath}
          alt={title}
          className={styles.cardMedia}
        />
        <CardContent className={styles.cardContent}>
          <Typography variant="h6">{title}</Typography>
          <Rating
            name="read-only"
            value={content.vote_average / 2}
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
