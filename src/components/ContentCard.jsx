import React from "react";
import styles from './ContentCard.module.css';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";

const ContentCard = ({ title, image, rating }) => {

  const defaultImage = '/path/to/default-image.jpg'; // Substitua pelo caminho da sua imagem padrão
  
  return (
    <Card className={styles.contentCard}>
      <CardMedia
        component="img"
        image={image || defaultImage}
        alt={title}
        className={styles.cardMedia}
      />
      <CardContent className={styles.cardContent}>
        <Typography variant="h6" component="div" className={styles.cardTitle}>
          {title}
        </Typography>
        <Rating
          name="read-only"
          value={rating / 2}
          readOnly
          precision={0.5}
          className={styles.cardRating}
        />
      </CardContent>
    </Card>
  );
};

export default ContentCard;
