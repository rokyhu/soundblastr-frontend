import React from "react";
import { useState, useEffect, useCallback } from "react";
import Venue from "./Venue";
import { backendRoutes } from "routes.js";
import { ApiRequestHandler } from "ApiRequestHandler";
import VenueDetail from "./VenueDetail";

const Venues = (props) => {
  const [venues, setVenues] = useState([]);
  const [error, setError] = useState("");
  const [componentId, setComponentId] = useState("");
  const requestUrl = backendRoutes.venue.all;

  const refreshAfterDelete = useCallback(() => {
    ApiRequestHandler.get(requestUrl, setVenues, setError);
    setComponentId("");
  }, [requestUrl]);

  useEffect(() => {
    refreshAfterDelete();
  }, [refreshAfterDelete]);

  const handleClick = (id) => {
    setComponentId(id);
  };

  return (
    <>
      {componentId === "" ? (
        <div className="content">
          {error ? (
            <div>
              An error occured while fetching the requested information. Please
              try again!
            </div>
          ) : (
            <div className="d-flex flex-wrap justify-content-start">
              {venues.map((venue) => (
                <Venue
                  key={venue.id}
                  id={venue.id}
                  image={venue.imageUrl}
                  name={venue.name}
                  address={venue.address}
                  description={venue.description}
                  capacity={venue.capacity}
                  onClick={handleClick}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <VenueDetail
          id={componentId}
          onChange={setComponentId}
          refreshAfterDelete={refreshAfterDelete}
        />
      )}
    </>
  );
};
export default Venues;
