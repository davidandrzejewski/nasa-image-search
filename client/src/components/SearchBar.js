import React, { useState } from "react";

const SearchBar = ({ submitQuery }) => {
  const [query, setQuery] = useState("");

  const handleChangeQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmitQuery = (event) => {
    event.preventDefault();

    submitQuery(query);
  };

  return (
    <div className="w-100 p-4 pb-4 d-flex justify-content-center align-items-center flex-column">
      <div className="input-group w-100">
        <div className="form-outline flex-fill">
          <input
            value={query}
            onChange={handleChangeQuery}
            placeholder="Begin typing your query..."
            type="search"
            className="form-control"
            id="search-input"
          />
        </div>

        <button
          type="button"
          class="btn btn-primary"
          onClick={handleSubmitQuery}
        >
          GO
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
