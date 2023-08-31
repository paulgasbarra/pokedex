import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Pokemon } from "../../types";

const SelectedPokemon = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const selectedPokemon: Pokemon | any = useSelector(
    (state: RootState) => state.pokedex.selectedPokemon
  );

  if (!selectedPokemon) {
    return <div>No Pokemon selected</div>;
  }

  return (
    <div>
      <h2>Selected Pokemon</h2>
      <img
        src={getImageUrlFromPokemonUrl(selectedPokemon && selectedPokemon.url)}
        alt={selectedPokemon.name}
      />
      <p>Name: {selectedPokemon.name}</p>
    </div>
  );
};

function getImageUrlFromPokemonUrl(pokemonUrl: string): string {
  const id = pokemonUrl.split("/").slice(-2, -1)[0];
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

export default SelectedPokemon;
