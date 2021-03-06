import React from "react";
import { Card, CardBody, CardFooter } from "reactstrap";

const Band = (props) => {

  const handleClick = () => {
    props.onClick(props.id);
  };

  return (
    <Card className="card-user max30w simple-margin" onClick={handleClick}>
      <div className="image">
        <img
          className="card-image"
          alt={props.image}
          src={require("assets/img/bands-image.jpg").default}
        />
      </div>
      <CardBody>
        <div className="author">
          <a href="#card" onClick={(e) => e.preventDefault()}>
            <img alt="..." className="avatar border-gray" src={props.image} />
          </a>
          <h5 className="title spaced-orange">{props.name}</h5>
        </div>
        <p className="description text-center">{props.description}</p>
      </CardBody>
      <CardFooter>
        <hr />
        <div className="button-container d-flex even-spacing">
          {props.genres.map((genre, i) => (
            <div className="max30w simple-margin overflow-none" key={i}>
              <button className="button-cstm">{genre}</button>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Band;
