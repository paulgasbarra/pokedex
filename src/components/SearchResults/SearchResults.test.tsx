import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SearchResults from "./SearchResults";
import { Pokemon } from "../../types";

describe("SearchResults", () => {
  const samplePokemon = [
    { name: "Pikachu", url: "https://pokeapi.co/api/v2/pokemon/25/" },
    { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    { name: "Bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  ];

  it('renders "Search for a Pokemon." if no search value is given', () => {
    const { getByText } = render(
      <SearchResults filteredPokemon={[]} searchValue="" />
    );

    expect(getByText("Search for a Pokemon.")).toBeInTheDocument();
  });

  it('renders "No results found" if there are no matches', () => {
    const { getByText } = render(
      <SearchResults filteredPokemon={[]} searchValue="Mewtwo" />
    );

    expect(getByText("No results found")).toBeInTheDocument();
  });

  it("displays the filtered Pokemon if any are provided", () => {
    const { getByText } = render(
      <SearchResults filteredPokemon={samplePokemon} searchValue="a" />
    );

    expect(getByText("Pikachu")).toBeInTheDocument();
    expect(getByText("Charmander")).toBeInTheDocument();
    expect(getByText("Bulbasaur")).toBeInTheDocument();
  });
});
