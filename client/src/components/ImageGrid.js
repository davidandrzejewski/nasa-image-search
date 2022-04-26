import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import ImageCard from "./ImageCard";
import Pagination from "./Pagination";

// The query used to fetch all images + count from our GraphQL server
const IMAGES = gql`
  query fetchImages($q: String, $limit: Int, $offset: Int) {
    images(q: $q, limit: $limit, offset: $offset) {
      count
      items {
        id
        title
        uri
        description
      }
    }
  }
`;

// Page size is used to determine the limit and offset for the graphql query
const PAGE_SIZE = 20;

const ImageGrid = ({ query }) => {
  // page state which is passed to the graphql query
  const [page, setPage] = useState(1);
  // totalPages is used by the Pagination component
  const [totalPages, setTotalPages] = useState(null);

  // Query to GraphQL. Executed anytime page or query state updates
  const { loading, error, data } = useQuery(IMAGES, {
    variables: {
      q: query,
      limit: PAGE_SIZE,
      offset: PAGE_SIZE * (page - 1),
    },
  });

  useEffect(() => {
    // reset the page and totalPages state on new query
    setPage(1);
    setTotalPages(null);
  }, [query]);

  useEffect(() => {
    // The totalPages value was added to the state because data becomes null on new queries and causes a poor user experience on the pagination component
    // The solution was to only update the totalPages state when new data is provided
    if (data) {
      setTotalPages(Math.ceil(data.images.count / PAGE_SIZE));
    }
  }, [data]);

  // The function below is called within the Pagination component and updates the page state in this component
  const updatePage = (newPage) => {
    setPage(newPage);
  };

  // The function below conditionally renders data to the screen based on the current state of the query
  const displayResults = () => {
    if (loading)
      return (
        <div className="d-flex h-100 justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    if (error) return <div>{error.message}</div>;
    if (!data) {
      return (
        <div className="pb-5 text-center ">
          <p>No results found. Please try another search.</p>
        </div>
      );
    } else {
      return (
        <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3 g-3">
          {data.images.items.map((image, index) => {
            const { id, title, description, uri } = image;

            return (
              <ImageCard
                title={title}
                description={description}
                uri={uri}
                key={id}
                index={index}
              />
            );
          })}
        </div>
      );
    }
  };

  return (
    <>
      <Pagination page={page} onUpdate={updatePage} totalPages={totalPages} />
      <div className="py-3">
        <div className="container">{displayResults()}</div>
      </div>
    </>
  );
};

export default ImageGrid;
