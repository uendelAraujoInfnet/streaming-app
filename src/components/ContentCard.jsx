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
  // Verifica se os dados do conteúdo (filme ou série) estão presentes
  if (!content || !content.id) {
    return null; // Não renderiza o componente se os dados não estiverem disponíveis
  }

  // Define se é um filme ou uma série
  const isMovie = content.title !== undefined;

  // Determina o título, rota e imagem com base no tipo de conteúdo
  const title = isMovie ? content.title : content.name; // `title` para filmes, `name` para séries
  const linkPath = isMovie ? `/movie/${content.id}` : `/serie/${content.id}`; // Rota específica
  const posterPath = content.poster_path
    ? `https://image.tmdb.org/t/p/w500${content.poster_path}`
    : "/path/to/default-image.jpg"; // Substitua pela URL da sua imagem padrão

  return (
    <Card className={styles.contentCard}>
      <Link to={linkPath}>
        <CardMedia
          component="img"
          image={posterPath}
          alt={title}
          className={styles.cardMedia}
        />
        <CardContent>
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
