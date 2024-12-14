import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ContentCard from "./ContentCard";

describe("ContentCard", () => {
  it("deve renderizar o título e a imagem de um filme", () => {
    const movie = {
      id: 1,
      title: "Test Movie",
      poster_path: "/test.jpg",
      vote_average: 8,
    };

    render(
      <Router>
        <ContentCard content={movie} />
      </Router>
    );

    expect(screen.getByText(/Test Movie/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Test Movie/i })).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/test.jpg"
    );
  });

  it("deve renderizar o título e a imagem de uma série", () => {
    const series = {
      id: 2,
      name: "Test Series",
      poster_path: "/test-series.jpg",
      vote_average: 7,
    };

    render(
      <Router>
        <ContentCard content={series} />
      </Router>
    );

    expect(screen.getByText(/Test Series/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Test Series/i })).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/test-series.jpg"
    );
  });

  it("deve mostrar uma mensagem se os dados estiverem ausentes", () => {
    render(
      <Router>
        <ContentCard content={null} />
      </Router>
    );

    expect(screen.getByText(/conteúdo indisponível/i)).toBeInTheDocument();
  });
});
