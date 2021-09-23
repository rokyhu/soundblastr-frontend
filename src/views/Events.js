import React from "react";
import { useState, useEffect } from "react";
import Event from "./Event";
import axios from "axios";

const Events = (props) => {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");
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

  return (
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
              image={card.imageUrl}
              name={card.title}
              description={card.description}
              price={card.price}
              date={card.date}
              band={card.band}
              venue={card.venue}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
