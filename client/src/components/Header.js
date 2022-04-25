import React from "react";

const Header = () => {
  return (
    <header className="p-3 bg-dark text-white">
      <div className="container d-flex align-items-center">
        <img
          src="https://api.nasa.gov/assets/img/favicons/favicon-192.png"
          alt="nasa-logo"
          height="100px"
        />
        <h1 className="p-3">NASA Image Seach</h1>
      </div>
    </header>
  );
};

export default Header;
