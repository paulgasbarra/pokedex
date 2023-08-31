import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SelectedPokemon from "./SelectedPokemon";
import { Pokemon } from "../../types";

const mockStore = configureStore([]);
const defaultState = {
  pokedex: {
    selectedPokemon: null,
  },
};

describe("SelectedPokemon", () => {
  it("renders without crashing", () => {
    const store = mockStore(defaultState);
    render(
      <Provider store={store}>
        <SelectedPokemon />
      </Provider>
    );
  });

  it('should display "No Pokemon selected" when no Pokemon is selected', () => {
    const store = mockStore(defaultState);
    const { getByText } = render(
      <Provider store={store}>
        <SelectedPokemon />
      </Provider>
    );
    expect(getByText("No Pokemon selected")).toBeInTheDocument();
  });

  it("should display the name and image of the selected Pokemon when provided", () => {
    const mockPokemon: Pokemon = { name: "pikachu", url: "some-url/25/" };
    const updatedState = {
      ...defaultState,
      pokedex: {
        selectedPokemon: mockPokemon,
      },
    };
    const store = mockStore(updatedState);
    const { getByText, getByAltText } = render(
      <Provider store={store}>
        <SelectedPokemon />
      </Provider>
    );
    expect(getByAltText("pikachu")).toHaveAttribute(
      "src",
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
    );
  });
});
