import React from "react";
import { useQuery, gql } from "@apollo/client";

const IMAGES = gql`
  query fetchImages($q: String) {
    images(q: $q) {
      id
      title
      uri
      description
    }
  }
`;

const ImageGrid = ({ query }) => {
  const { loading, error, data } = useQuery(IMAGES, {
    variables: {
      q: query,
    },
  });

  console.log({ query, data, error, loading });

  if (loading)
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!query)
    return (
      <div className="pb-5 text-center ">
        <p>Type your query in the search bar above to begin.</p>
      </div>
    );

  return (
    <div className="py-5 bg-light">
      <div className="container">
        <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-3">
          {data.images.map((image) => {
            return (
              <div className="col" key={image.id}>
                <div className="card h-100 shadow-sm">
                  <img src={image.uri} className="card-img-top img-fluid" />
                  <div className="card-body">
                    <h5 className="card-title">{image.title}</h5>
                    <p className="card-text">{image.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ImageGrid;
