import { useEffect, useState } from "react";
import { fetchPopularMovies } from "../services/api.js";
import ContentCard from "../components/ContentCard";
import { Grid , Typography} from "@mui/material";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchPopularMovies().then((results) => {
      setMovies(results);
    });
  }, []);

  return (
    <div style={{marginTop: 80}}>
      <Typography variant="h4" gutterBottom marginBottom={-5}>
        Filmes Populares
      </Typography>
      <Grid container spacing={2} justifyContent="center" marginTop={"50px"}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie.id}>
            <ContentCard
              content={movie}
              movie={movie}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              rating={movie.vote_average}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;
