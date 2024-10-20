const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

//Realiza a busca de filmes de acordo com o que o usuário digita
export const fetchSearchResults = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/multi?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};

//Busca os filmes mais populares para mostrar na tela inicial
export const fetchPopularMovies = async () => {
  console.log('Fetching foi chamado');
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`
  );
  const data = await response.json();
  return data.results;
};

// Busca detalhes do filme
export const fetchMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  return data;
};

// Busca os vídeos/trailers do filme
export const fetchMovieVideos = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  return data;
};

// Busca o elenco do filme
export const fetchMovieCredits = async (id) => {
  const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=pt-BR`);
  const data = await response.json();
  return data;
};