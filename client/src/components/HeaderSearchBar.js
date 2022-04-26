import React, { useState } from "react";
import "./HeaderSearchBar.css";

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
    <header className="p-2 bg-dark text-white sticky-top search-header">
      <div className="container d-flex align-items-center">
        <img
          src="https://api.nasa.gov/assets/img/favicons/favicon-192.png"
          alt="nasa-logo"
          height="80px"
        />
        <div className="w-100 p-4 pb-4 d-flex justify-content-center align-items-center flex-column">
          <div className="input-group w-100">
            <div className="form-outline flex-fill">
              <input
                value={query}
                onChange={handleChangeQuery}
                placeholder="Search NASA's image directory..."
                type="search"
                className="form-control"
                id="search-input"
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmitQuery}
            >
              GO
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SearchBar;
