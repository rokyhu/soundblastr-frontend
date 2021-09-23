import React from 'react';
import { useState, useEffect } from 'react';
import Venue from './Venue';
import axios from 'axios';
import VenueDetail from './VenueDetail';


const Venues = (props) => {
    const [venues, setVenues] = useState([]);
    const [error, setError] = useState('');
    const [componentId, setComponentId] = useState('');
    const url = "http://localhost:8080/venue/all";

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                setVenues(res.data);
            })
            .catch((err) => {
              setError(err.message)
            })
        }, []);

    const handleClick = (id) => {
        setComponentId(id);
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
        ):(
            <VenueDetail id={componentId} />
        )}
        </>
    )
}
export default Venues
