import React from "react";
import { useState, useEffect, useCallback } from "react";
import Event from "./Event";
import EventProfile from "./EventProfile";
import { ApiRequestHandler } from "ApiRequestHandler";
import { backendRoutes } from "routes.js";

const Events = (props) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [componentId, setComponentId] = useState("");
  const requestUrl = backendRoutes.event.all;

  const refreshAfterDelete = useCallback(() => {
    ApiRequestHandler.get(requestUrl, setEvents, setError);
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
              {events.map((card) => (
                <Event
                  key={card.id}
                  id={card.id}
                  venueImg={card.venue.imageUrl}
                  image={card.imageUrl}
                  title={card.title}
                  description={card.description}
                  price={card.ticketPrice}
                  date={card.date}
                  band={card.band}
                  venue={card.venue}
                  onClick={handleClick}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <EventProfile
          id={componentId}
          refreshAfterDelete={refreshAfterDelete}
        />
      )}
    </>
  );
};

export default Events;
