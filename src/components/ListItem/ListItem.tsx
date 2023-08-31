import React from "react";
import "./ListItem.css";
import { Pokemon } from "../../types";

interface ListItemProps {
  pokemon: Pokemon;
  setSelectedPokemon: (pokemon: Pokemon) => void;
}

const ListItem: React.FC<ListItemProps> = ({ pokemon, setSelectedPokemon }) => {
  return (
    <div className="listItem" onClick={() => setSelectedPokemon(pokemon)}>
      {pokemon.name}
    </div>
  );
};

export default ListItem;
