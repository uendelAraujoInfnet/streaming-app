import React, { useState } from "react";
import { Rating, Box, Typography } from "@mui/material";

const RatingComponent = ({ id }) => {
  const [rating, setRating] = useState(0);

  // Função para manipular a mudança de avaliação
  const handleRatingChange = (event, newValue) => {
    if (newValue !== null) {
      setRating(newValue);
      console.log(`Avaliação salva para o item ${id}: ${newValue}`);
      saveRating(id, newValue); // Salva a avaliação
    }
  };

  // Função para salvar a avaliação no localStorage
  const saveRating = (id, rating) => {
    try {
      const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
      storedRatings[id] = rating;
      localStorage.setItem("ratings", JSON.stringify(storedRatings));
      console.log("Avaliação salva no localStorage:", storedRatings);
    } catch (error) {
      console.error("Erro ao salvar a avaliação:", error);
    }
  };

  // Recupera a avaliação armazenada ao carregar o componente
  React.useEffect(() => {
    try {
      const storedRatings = JSON.parse(localStorage.getItem("ratings")) || {};
      if (storedRatings[id]) {
        setRating(storedRatings[id]);
        console.log(`Avaliação carregada para o item ${id}: ${storedRatings[id]}`);
      }
    } catch (error) {
      console.error("Erro ao carregar a avaliação:", error);
    }
  }, [id]);

  return (
    <Box>
      <Typography variant="h6">Sua Avaliação:</Typography>
      <Rating
        name={`rating-${id}`}
        value={rating} // Vinculado ao estado
        onChange={handleRatingChange} // Manipula a mudança
        precision={0.5} // Passo de 0.5
      />
    </Box>
  );
};

export default RatingComponent;
