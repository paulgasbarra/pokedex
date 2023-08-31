import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import SearchResults from "./components/SearchResults/SearchResults";
import SelectedPokemon from "./components/SelectedPokemon/SelectedPokemon";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { fetchPokemons } from "./slices/pokedexSlice";

interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const dispatch: AppDispatch = useDispatch();
  const pokemons = useSelector((state: RootState) => state.pokedex.pokemons);
  const apiStatus = useSelector((state: RootState) => state.pokedex.apiStatus);
  const apiError = useSelector((state: RootState) => state.pokedex.apiError);

  useEffect(() => {
    if (apiStatus === "idle") {
      dispatch(fetchPokemons());
    }
  }, [apiStatus, dispatch]);

  const onSearchChange = (searchString: string) => {
    setSearchValue(searchString.toLowerCase());
    filterPokemons(searchString);
  };

  const filterPokemons = (searchString: string) => {
    const filteredPokemons = pokemons.filter((pokemon: Pokemon) => {
      return pokemon.name.includes(searchString);
    });
    setFilteredPokemon(filteredPokemons);
  };

  // need to store history of search values

  // need to display pokemon if only one result

  // need to allow user to select pokemon if multiple results

  if (apiStatus === "failed") {
    return (
      <div>
        <h1>Error</h1>
        {apiError}
      </div>
    );
  }

  if (apiStatus === "loading") {
    return (
      <div>
        <h1>Pokedex</h1>
        Loading Pokemon...
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Pokedex</h1>
      <Search onSearchChange={onSearchChange} />
      <SearchResults
        filteredPokemon={filteredPokemon}
        searchValue={searchValue}
      />
      <SelectedPokemon />
    </div>
  );
}

export default App;
