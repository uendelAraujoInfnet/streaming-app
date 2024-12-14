import React, { useState } from "react";
import { toggleFavorite } from "../services/api";
import { Button, Box } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

const FavoriteButton = ({ id, isFavorite }) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavorite = async () => {
    const session_id = localStorage.getItem("session_id");
    if (!session_id) {
      alert("Faça login para adicionar aos favoritos.");
      return;
    }

    await toggleFavorite(id, !favorite, session_id);
    setFavorite(!favorite);
  };

  return (
    <Button
      variant="contained"
      color={isFavorite ? "secondary" : "primary"}
      onClick={handleFavorite}
    >
      {isFavorite ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
    </Button>
  );
};

export default FavoriteButton;
