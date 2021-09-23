import React from "react";
import { useState, useEffect } from "react";
import Event from "./Event";
import axios from "axios";
import { Button } from "reactstrap";
import EventProfile from "./EventProfile";

const Events = (props) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
  const [componentId, setComponentId] = useState('');
  const url = "http://localhost:8080/event/all";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCards(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleClick = (id) => {
    setComponentId(id);
    console.log(id);
} 

  return (
       <>
        {componentId === '' ? (
          <div className="content">
          {error ? (
        <div>
          An error occured while fetching the requested information. Please try
          again!
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {cards.map((card) => (
            <Event
              key={card.id}
              id={card.id}
              image={card.imageUrl}
              name={card.title}
              description={card.description}
              price={card.price}
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
      <EventProfile id={componentId} />
  )}
  </>
  );
};

export default Events;
