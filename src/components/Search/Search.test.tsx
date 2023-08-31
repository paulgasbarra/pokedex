import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./Search";

describe("Search", () => {
  it("renders without crashing", () => {
    render(<Search onSearchChange={() => {}} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("invokes onSearchChange with input value when typing", () => {
    const onSearchChangeMock = jest.fn();

    render(<Search onSearchChange={onSearchChangeMock} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });

    expect(onSearchChangeMock).toHaveBeenCalledTimes(1);
    expect(onSearchChangeMock).toHaveBeenCalledWith("test");
  });
});
