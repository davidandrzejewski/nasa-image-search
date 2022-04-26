import React, { useState } from "react";
import HeaderSearchBar from "./components/HeaderSearchBar";
import ImageGrid from "./components/ImageGrid";

function App() {
  const [query, setQuery] = useState("");

  const submitQuery = (q) => {
    // Once a user submits their query, update the query state
    // The query state is used to update the ImageGrid component
    setQuery(q);
  };

  return (
    <div className="App">
      <HeaderSearchBar submitQuery={submitQuery} />
      {query ? (
        <ImageGrid query={query} />
      ) : (
        /* Display placeholder text if no query was entered */
        <div className="p-5 text-center">
          <p>Type your query in the search bar above to begin.</p>
        </div>
      )}
    </div>
  );
}

export default App;
