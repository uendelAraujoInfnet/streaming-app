// Mock para buscar filmes populares
export const fetchPopularMovies = jest.fn(() =>
  Promise.resolve({
    results: [
      { id: 1, title: "Mock Movie 1", poster_path: "/path1.jpg", vote_average: 8 },
      { id: 2, title: "Mock Movie 2", poster_path: "/path2.jpg", vote_average: 7.5 },
    ],
  })
);

// Mock para buscar séries populares
export const fetchSeries = jest.fn(() =>
  Promise.resolve({
    results: [
      { id: 1, name: "Mock Series 1", poster_path: "/path1.jpg", vote_average: 8 },
      { id: 2, name: "Mock Series 2", poster_path: "/path2.jpg", vote_average: 7.5 },
    ],
  })
);

// Mock para buscar detalhes de um filme
export const fetchMovieDetails = jest.fn((id) =>
  Promise.resolve({
    id,
    title: `Mock Movie ${id}`,
    overview: `This is a mock overview for movie ${id}.`,
    poster_path: `/mock-movie-${id}.jpg`,
    release_date: "2024-12-12",
    vote_average: 8.5,
  })
);

// Mock para buscar detalhes de uma série
export const fetchSerieDetails = jest.fn((id) =>
  Promise.resolve({
    id,
    name: `Mock Series ${id}`,
    overview: `This is a mock overview for series ${id}.`,
    poster_path: `/mock-series-${id}.jpg`,
    first_air_date: "2024-11-11",
    vote_average: 8,
  })
);
