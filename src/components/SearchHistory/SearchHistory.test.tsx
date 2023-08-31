import { render, fireEvent } from "@testing-library/react";
import SearchHistory from "./SearchHistory";
import { Pokemon } from "../../types";

describe("SearchHistory", () => {
  it("renders without crashing", () => {
    render(<SearchHistory searchHistory={[]} setSelectedPokemon={() => {}} />);
  });

  it('should display "No stored Pokemon." when searchHistory is empty', () => {
    const { getByText } = render(
      <SearchHistory searchHistory={[]} setSelectedPokemon={jest.fn()} />
    );
    expect(getByText("No stored Pokemon.")).toBeInTheDocument();
  });

  it("should display a list of Pokemon when searchHistory is provided", () => {
    const mockPokemonList: Pokemon[] = [
      { name: "pikachu", url: "some-url" },
      { name: "charmander", url: "another-url" },
    ];
    const { getByText } = render(
      <SearchHistory
        searchHistory={mockPokemonList}
        setSelectedPokemon={jest.fn()}
      />
    );
    expect(getByText("pikachu")).toBeInTheDocument();
    expect(getByText("charmander")).toBeInTheDocument();
  });

  it("should call setSelectedPokemon with the correct Pokemon when a Pokemon name is clicked", () => {
    const mockSetSelectedPokemon = jest.fn();
    const mockPokemonList: Pokemon[] = [{ name: "pikachu", url: "some-url" }];
    const { getByText } = render(
      <SearchHistory
        searchHistory={mockPokemonList}
        setSelectedPokemon={mockSetSelectedPokemon}
      />
    );

    fireEvent.click(getByText("pikachu"));
    expect(mockSetSelectedPokemon).toHaveBeenCalledWith(mockPokemonList[0]);
  });
});
