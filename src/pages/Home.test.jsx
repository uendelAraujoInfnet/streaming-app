import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";

describe("Home Page", () => {
  it("should render the Home page with title", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/Bem-vindo ao Streaming App/i)).toBeInTheDocument();
  });
});
