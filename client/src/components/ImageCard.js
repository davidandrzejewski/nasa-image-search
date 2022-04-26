import React from "react";

const ImageCard = ({ title, description, uri, index }) => {
  return (
    <div className="col" data-testid={`image-card-${index}`}>
      <div className="card h-100 shadow-sm">
        <img
          src={uri}
          className="card-img-top img-fluid"
          alt={`Image of ${title}`}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
