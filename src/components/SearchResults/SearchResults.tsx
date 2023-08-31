import React from "react";
import { Pokemon } from "../../types";

interface SearchResultsProps {
  filteredPokemon: Pokemon[];
  searchValue: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  filteredPokemon,
  searchValue,
}) => {
  if (searchValue.length === 0) {
    return <div>Search for a Pokemon.</div>;
  }
  return (
    <div>
      {filteredPokemon.length > 0 && searchValue.length > 0 ? (
        filteredPokemon.map((pokemon: Pokemon) => {
          return <div key={pokemon.name}>{pokemon.name}</div>;
        })
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default SearchResults;
