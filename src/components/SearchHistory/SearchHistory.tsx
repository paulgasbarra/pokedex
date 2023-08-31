import React from "react";
import { Pokemon } from "../../types";

interface SearchHistoryProps {
  searchHistory: Pokemon[];
  setSelectedPokemon: (pokemon: Pokemon) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchHistory,
  setSelectedPokemon,
}) => {
  if (searchHistory.length === 0) {
    return (
      <div>
        <h1>Search History</h1>
        No stored Pokemon.
      </div>
    );
  }

  return (
    <div>
      <h1>Search History</h1>
      {searchHistory.map((pokemon: Pokemon) => {
        return (
          <div key={pokemon.name} onClick={() => setSelectedPokemon(pokemon)}>
            {pokemon.name}
          </div>
        );
      })}
    </div>
  );
};

export default SearchHistory;
