import { render } from "@testing-library/react";
import Home from "../pages/Home";


jest.mock("../services/api");

import { fetchMovies } from "../services/api";

it("should call fetchMovies on render", async () => {
  render(<Home />);
  expect(fetchMovies).toHaveBeenCalled();
});
