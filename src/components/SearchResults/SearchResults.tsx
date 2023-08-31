import React from "react";
import ListItem from "../ListItem/ListItem";
import { Pokemon } from "../../types";

interface SearchResultsProps {
  filteredPokemon: Pokemon[];
  setSelectedPokemon: (pokemon: Pokemon) => void;
  searchValue: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  filteredPokemon,
  searchValue,
  setSelectedPokemon,
}) => {
  if (searchValue.length === 0) {
    return (
      <div>
        <h1>Search Results</h1>
        Search for a Pokemon.
      </div>
    );
  }
  return (
    <div>
      <h1>Search Results</h1>
      <h4>Click on a name to select Pokemon</h4>
      {filteredPokemon.length > 0 && searchValue.length > 0 ? (
        filteredPokemon.map((pokemon: Pokemon) => {
          return (
            <ListItem
              key={pokemon.name}
              pokemon={pokemon}
              setSelectedPokemon={setSelectedPokemon}
            />
          );
        })
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default SearchResults;
