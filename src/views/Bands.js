import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import Band from './Band';
import { ApiRequestHandler } from "ApiRequestHandler";
import { backendRoutes } from "routes.js";
import BandProfile from './profile/BandProfile';


const Bands = (props) => {
    const [cards, setCards] = useState([]);
    const [error, setError] = useState('');
    const [componentId, setComponentId] = useState('');
    const requestUrl = backendRoutes.band.all;

    const refreshAfterDelete = useCallback(() => {
      ApiRequestHandler.get(requestUrl, setCards, setError);
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
            An error occured while fetching the requested information. Please try
            again!
          </div>
        ) : (
          <div className="d-flex flex-wrap justify-content-start">
            {cards.map((card) => (
              <Band
                key={card.id}
                id={card.id}
                image={card.imageUrl}
                name={card.name}
                description={card.description}
                genres={card.genres}
                onClick={handleClick}
              />
            ))}
          </div>
        )}
      </div>
      ) : (
        <BandProfile id={componentId} onChange={setComponentId} refreshAfterDelete={refreshAfterDelete}  />
      )}
    </>
    );
  };

export default Bands;
