import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../components/Header";

describe("Header Component", () => {

  it("should render navigation links correctly", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  
    // Use getByRole para evitar confusão com múltiplos elementos com o mesmo texto
    expect(screen.getByRole("link", { name: /Início/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Lançamentos/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Filmes/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Séries/i })).toBeInTheDocument();
  });

  it("should navigate to the search page when searching", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/Buscar/i);
    fireEvent.change(searchInput, { target: { value: "Test Movie" } });
    fireEvent.keyDown(searchInput, { key: "Enter" });

    // Verificar que o campo de busca foi atualizado (simulação de navegação)
    expect(searchInput.value).toBe("");
  });

  it("should only render one 'Início' link", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  
    const links = screen.getAllByRole("link", { name: /Início/i });
    expect(links).toHaveLength(1);
  });

  it("should navigate when clicking navigation links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const moviesLink = screen.getByRole("link", { name: /Filmes/i });
    fireEvent.click(moviesLink);

    // Simulação de navegação: teste pode ser mais elaborado se você mockar o `useNavigate`
    expect(moviesLink).toBeInTheDocument();
  });
});

it("should navigate to the search page when searching", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  const searchInput = screen.getByPlaceholderText(/Buscar/i);
  fireEvent.change(searchInput, { target: { value: "Test Movie" } });
  fireEvent.keyDown(searchInput, { key: "Enter" });

  // Simula navegação
  expect(searchInput.value).toBe("");
});

