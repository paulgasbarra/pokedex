import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useDispatch, useSelector } from "react-redux";
import App from "./App";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockDispatch = jest.fn();

describe("App", () => {
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      const mockState = {
        pokedex: {
          pokemons: [],
          apiStatus: "idle",
          apiError: null,
        },
      };
      return selectorFn(mockState);
    });
  });

  it("dispatches fetchPokemons on initial render if apiStatus is idle", () => {
    render(<App />);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it("renders an error message if apiStatus is failed", () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      const mockState = {
        pokedex: {
          pokemons: [],
          apiStatus: "failed",
          apiError: "An error occurred.",
        },
      };
      return selectorFn(mockState);
    });

    const { getByText } = render(<App />);
    expect(getByText("Error")).toBeInTheDocument();
    expect(getByText("An error occurred.")).toBeInTheDocument();
  });

  it("renders a loading message if apiStatus is loading", () => {
    (useSelector as jest.Mock).mockImplementation((selectorFn) => {
      const mockState = {
        pokedex: {
          pokemons: [],
          apiStatus: "loading",
          apiError: null,
        },
      };
      return selectorFn(mockState);
    });

    const { getByText } = render(<App />);
    expect(getByText("Loading Pokemon...")).toBeInTheDocument();
  });
});
