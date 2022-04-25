import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import ImageGrid from "./components/ImageGrid";
import Header from "./components/Header";

function App() {
  const [query, setQuery] = useState("");

  const submitQuery = (q) => {
    // Once a user submits their query, update the query state in the App component
    // The query state is used to update the ImageGrid component
    setQuery(q);
  };

  return (
    <div className="App">
      <Header />
      <SearchBar submitQuery={submitQuery} />
      <ImageGrid query={query} />
    </div>
  );
}

export default App;
