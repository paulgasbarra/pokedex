import { render } from "@testing-library/react";
import SelectedPokemon from "./SelectedPokemon";

describe("SelectedPokemon", () => {
  it("renders without crashing", () => {
    render(<SelectedPokemon />);
  });
});
