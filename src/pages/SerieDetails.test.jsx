jest.mock("../services/api");


import { fetchSerieDetails } from "../services/api";

it("should render series details correctly", async () => {
  // Sobrescrevendo o mock para retornar dados específicos
  fetchSerieDetails.mockResolvedValueOnce({
    id: 1,
    name: "Specific Mock Series",
    overview: "This is a specific mock overview.",
    poster_path: "/specific-mock-series.jpg",
    first_air_date: "2023-10-10",
    vote_average: 9.2,
  });

  // Renderiza o componente e verifica os dados
  render(<SerieDetails id={1} />);
  expect(await screen.findByText(/Specific Mock Series/i)).toBeInTheDocument();
});
