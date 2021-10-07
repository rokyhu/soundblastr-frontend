import React from "react";
import { Card, CardBody, CardFooter } from "reactstrap";

const Venue = (props) => {
  
  const handleClick = () => {
    props.onClick(props.id);
  };

  const createAddress = () => {
    const address = props.address;
    return address.zipcode + ", " + address.city + ", " + address.street + ", " + address.houseNr;
}

  return (
    <Card className="card-user max30w simple-margin" onClick={handleClick}>
      <div className="image">
        <img
          className="card-image"
          alt={props.image}
          src={require("assets/img/venue-cover.jpg").default}
        />
      </div>
      <CardBody>
        <div className="author">
          <a href="#card" onClick={(e) => e.preventDefault()}>
            <img alt="..." className="avatar border-gray" src={props.image} />
          </a>
          <h5 className="title spaced-orange">{props.name}</h5>
        </div>
        <p className="description text-center">{createAddress()}</p>
        <p className="description text-center">{props.description}</p>
      </CardBody>
      <CardFooter>
        <hr />
        <div className="button-container d-flex even-spacing">
          Capactity: {props.capacity}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Venue;