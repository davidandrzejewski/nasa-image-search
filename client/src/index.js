import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ApolloProvider from "./services/ApolloProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
