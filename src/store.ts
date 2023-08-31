import {configureStore} from '@reduxjs/toolkit';
import pokedexReducer from './slices/pokedexSlice';

const store = configureStore({
    reducer: {
        pokedex: pokedexReducer
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;