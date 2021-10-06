import React from "react";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";

import { Button } from "reactstrap";

const Event = (props) => {
  const handleClick = () => {
    props.onClick(props.id);
  };

  return (
    <Card className="card-user max30w simple-margin" onClick={handleClick}>
      <div className="image">
        <img className="card-image" alt={props.image} src={props.venueImg} />
      </div>
      <CardBody>
        <div className="author">
          <a href="#card" onClick={(e) => e.preventDefault()}>
            <img alt="..." className="avatar border-gray" src={props.image} />
          </a>
          <h5 className="title spaced-orange">{props.title}</h5>
        </div>
        <p className="description text-center">{props.description}</p>
      </CardBody>
      <CardFooter>
        <hr />
        <div className="button-container d-flex even-spacing">
          <p className="mx-2">{props.date}</p>
          <p className="mx-2">{props.band.name}</p>
          <p className="mx-2">{props.venue.name}</p>
        </div>
      </CardFooter>
    </Card>

    // <Card
    //   className="card-user max30w simple-margin p-2 flex-sm-grow-0"
    //   onClick={handleClick}
    // >
    //   <div className="image">
    //     <img className="card-image" alt="..." src={props.venueImg} />
    //   </div>
    //   <CardBody>
    //     <div className="author">
    //       <a href="#pablo" onClick={(e) => e.preventDefault()}>
    //         <img alt="..." className="avatar border-gray" src={props.image} />
    //         <h5 className="title spaced-orange">{props.title}</h5>
    //       </a>
    //     </div>

    //     <p className="description text-center">{props.description}</p>
    //     <div className="text-center">
    //       <Button className="btn-round" color="info" type="submit">
    //         {props.price} HUF
    //       </Button>
    //     </div>
    //   </CardBody>
    //   <CardFooter>
    //     <hr />
    //     <div className="button-container d-flex even-spacing">
    //       <p className="mx-2">{props.date}</p>
    //       <p className="mx-2">{props.band.name}</p>
    //       <p className="mx-2">{props.venue.name}</p>
    //     </div>
    //   </CardFooter>
    // </Card>
  );
};

export default Event;
