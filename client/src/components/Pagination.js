import React from "react";
import "./Pagination.css";

const Pagination = ({ page, onUpdate, totalPages }) => {
  const handleIncreasePage = () => {
    onUpdate(Math.min(totalPages, page + 1));
  };

  const handleDecreasePage = () => {
    onUpdate(Math.max(1, page - 1));
  };
  return (
    <div className="d-flex p-2 shadow-sm border-dark justify-content-end align-items-center sticky-top bg-light pagination-container">
      <button
        className="border border-dark rounded mx-1"
        onClick={handleDecreasePage}
      >
        Prev
      </button>

      <div className="mx-1">
        {page && totalPages ? `Page ${page} of ${totalPages}` : "Loading..."}
      </div>
      <button
        className="border border-dark rounded mx-1"
        onClick={handleIncreasePage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
