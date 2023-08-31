import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import SearchResults from "./components/SearchResults/SearchResults";
import SelectedPokemon from "./components/SelectedPokemon/SelectedPokemon";
import SearchHistory from "./components/SearchHistory/SearchHistory";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { fetchPokemons, selectPokemon } from "./slices/pokedexSlice";

interface Pokemon {
  name: string;
  url: string;
}

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchHistory, setSearchHistory] = useState<Pokemon[]>([]);

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
    filterPokemons(searchString.toLowerCase());
  };

  const filterPokemons = (searchString: string) => {
    const filteredPokemons = pokemons.filter((pokemon: Pokemon) => {
      return pokemon.name.includes(searchString);
    });
    setFilteredPokemon(filteredPokemons);
  };

  const setSelectedPokemon = (pokemon: Pokemon) => {
    dispatch(selectPokemon(pokemon));
    if (!searchHistory.includes(pokemon)) {
      setSearchHistory([...searchHistory, pokemon]);
    }
  };

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
      <SelectedPokemon />
      <div className="sections">
        <Search onSearchChange={onSearchChange} />
        <SearchResults
          filteredPokemon={filteredPokemon}
          searchValue={searchValue}
          setSelectedPokemon={setSelectedPokemon}
        />
        <SearchHistory
          searchHistory={searchHistory}
          setSelectedPokemon={setSelectedPokemon}
        />
      </div>
    </div>
  );
}

export default App;
