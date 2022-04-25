import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";

const SERVER_ROOT =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new ApolloClient({
  uri: `${SERVER_ROOT}/graphql`,
  cache: new InMemoryCache(),
});

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
