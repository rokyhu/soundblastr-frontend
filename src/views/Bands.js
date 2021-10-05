import React from 'react';
import { useState, useEffect } from 'react';
import Band from './Band';
import { ApiRequestHandler } from 'ApiRequestHandler';

const Bands = (props) => {
    
    const [cards, setCards] = useState([]);
    const [error, setError] = useState('');
    const url = "http://localhost:8080/band/all";


    useEffect(() => {
      ApiRequestHandler.apiGet(url, setCards, setError)
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
                <Band
                 key={card.id}
                 image={card.imageUrl}
                 name={card.name}
                 description={card.description}
                 genres={card.genres}/>
            ))}
            </div>
        )}
        </div>
    )
}

export default Bands
