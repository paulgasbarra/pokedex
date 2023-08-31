import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface PokedexState {
    pokemons: Pokemon[];
    selectedPokemon: Pokemon | null;
    searchQuery: string;
    filter: string | null;
    apiStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    apiError: string | null;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initialState: PokedexState = {
    pokemons: [],
    selectedPokemon: null,
    searchQuery: '',
    filter: null,
    apiStatus: 'idle',
    apiError: null,
  };

export const fetchPokemons = createAsyncThunk('pokedex/fetchPokemons', async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1020');  // 1020 pokemons, gotta catch 'em all!
  const data = await response.json();
  return data.results;
});

const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState: {
    pokemons: [],
    selectedPokemon: null,
    searchQuery: '',
    filter: null,
    apiStatus: 'idle',
    apiError: ""
  },
  reducers: {
    selectPokemon: (state, action) => {
      state.selectedPokemon = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.apiStatus = 'loading';
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.apiStatus = 'succeeded';
        state.pokemons = action.payload;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.apiStatus = 'failed';
        state.apiError = action.error.message || 'Unknown error';
      });
  }
});

export default pokedexSlice.reducer;
export const { selectPokemon } = pokedexSlice.actions;
