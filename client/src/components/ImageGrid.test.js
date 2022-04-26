import React from "react";
import { render, screen } from "@testing-library/react";
import ImageGrid from "./ImageGrid";
import ApolloProvider from "../services/ApolloProvider";

describe("The results grid", () => {
  it("renders at least one item", async () => {
    render(
      <ApolloProvider>
        <ImageGrid query={"Pluto's moons"} />
      </ApolloProvider>
    );

    const firstImageCard = await screen.findByTestId("image-card-0");

    expect(firstImageCard).toBeInTheDocument();
  });

  it("renders multiple items", async () => {
    render(
      <ApolloProvider>
        <ImageGrid query={"Pluto's moons"} />
      </ApolloProvider>
    );

    const imageCards = await screen.findAllByTestId(/image-card/i);

    expect(imageCards.length).toBeGreaterThan(1);
  });
});
