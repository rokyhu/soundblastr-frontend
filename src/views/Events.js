import React from "react";
import { useState, useEffect } from "react";
import Event from "./Event";
import { Button } from "reactstrap";
import EventProfile from "./EventProfile";
import { ApiRequestHandler } from "ApiRequestHandler";

const Events = (props) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [componentId, setComponentId] = useState("");
  const url = "http://localhost:8080/event/all";
  

  useEffect(() => {
    ApiRequestHandler.apiGet(url, setCards, setError)
  }, [componentId]);

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
            <div className="d-flex flex-wrap">
              {cards.map((card) => (
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
          <a href="event/new">
            <Button>New Event</Button>
          </a>
        </div>
      ) : (
        <EventProfile id={componentId} onDelete={setComponentId} />
      )}
    </>
  );
};

export default Events;
