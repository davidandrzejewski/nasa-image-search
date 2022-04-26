import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("The search bar", () => {
  it("changes text", () => {
    render(<SearchBar />);

    const searchInput = screen.getByRole("searchbox");

    // Changes the input
    fireEvent.change(searchInput, {
      target: {
        value: "Pluto's moons",
      },
    });

    expect(searchInput).toHaveValue("Pluto's moons");
  });
});
