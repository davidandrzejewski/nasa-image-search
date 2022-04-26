import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const SERVER_ROOT =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

const client = new ApolloClient({
  uri: `${SERVER_ROOT}/graphql`,
  cache: new InMemoryCache(),
});

const ConfiguredApolloProvider = ({ children }) => {
  // ApolloProvider was contained in a component so it can be reused in the testing page
  // With more time I would create a Mock instead for testing
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ConfiguredApolloProvider;
