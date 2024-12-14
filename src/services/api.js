import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Autenticação
export const fetchToken = async () => {
  const response = await axios.get(`${BASE_URL}/authentication/token/new`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

export const createSession = async (request_token) => {
  const response = await axios.post(
    `${BASE_URL}/authentication/session/new`,
    { request_token },
    { params: { api_key: API_KEY } }
  );
  return response.data;
};

// Função para buscar favoritos
export const fetchFavorites = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/favorites?userId=${userId}&api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar favoritos");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Favoritos
export const toggleFavorite = async (id, favorite, session_id) => {
  const response = await axios.post(
    `${BASE_URL}/account/{account_id}/favorite`,
    {
      media_type: "movie", // ou "tv"
      media_id: id,
      favorite,
    },
    { params: { api_key: API_KEY, session_id } }
  );
  return response.data;
};

// Avaliações
export const submitRating = async (id, value, session_id) => {
  const response = await axios.post(
    `${BASE_URL}/movie/${id}/rating`, // ou `/tv/${id}/rating`
    { value: value * 2 },
    { params: { api_key: API_KEY, session_id } }
  );
  return response.data;
};

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

export const fetchReleases = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        language: "pt-BR",
        page, // SERVE PARA ADICIONAR UM NUMERO DE PAGINAS NA REQUISIÇÃO
      },
    });
    console.log("API Response:", response.data); // Verifica a resposta da API
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar lançamentos:", error);
    throw error;
  }
};

// Requisição que retorna apenas filmes
export const fetchMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: "pt-BR",
        page, // Controla a página da requisição
        sort_by: "popularity.desc", // Ordenar por popularidade
        include_adult: true, // Exclui conteúdos adultos
        include_video: false, // Exclui conteúdos de vídeo
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw error;
  }
};

// PARTE DO CÓDIGO QUE IRÁ RETORNAR AS INFORMAÇÕES SOBRE AS SÉRIES

// REQUISIÇÃO COM ENDPOINT PARA RETORNAR APENAS SERIADOS
export const fetchSeries = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        language: "pt-BR",
        page, // Controla a página da requisição
        sort_by: "popularity.desc", // Ordenar por popularidade
        include_null_first_air_dates: false, // Exclui séries sem data de estreia
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar séries:", error);
    throw error;
  }
};

// END POINT PARA RETORNAR OS DETALHES DAS SERIES 
export const fetchSerieDetails = async (serieId) => {
  const response = await axios.get(
    `${BASE_URL}/tv/${serieId}`,
    {
      params: {
        api_key: API_KEY,
        language: "pt-BR",
      },
    }
  );
  return response.data;
};

// END POINT PARA OBTER OS TRAILERS DE UMA SERIE
export const fetchSerieVideos = async (serieId) => {
  const response = await axios.get(
    `${BASE_URL}/tv/${serieId}/videos`,
    {
      params: {
        api_key: API_KEY,
        language: "pt-BR",
      },
    }
  );
  return response.data;
};

// END POINT PARA OBTER OS CRÉDITOS DE UMA SÉRIE
export const fetchSerieCredits = async (serieId) => {
  const response = await axios.get(
    `${BASE_URL}/tv/${serieId}/credits`,
    {
      params: {
        api_key: API_KEY,
        language: "pt-BR",
      },
    }
  );
  return response.data;
};
