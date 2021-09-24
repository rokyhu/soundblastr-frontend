import React from "react";
import { Card, CardBody, CardFooter, Row, Col } from "reactstrap";

import { Button } from "reactstrap";

const Event = (props) => {
  const handleClick = () => {
    props.onClick(props.id);
  };

  return (
    <Col md="4">
      <Card className="card-user" onClick={handleClick}>
        <div className="image">
          <img alt="..." src={props.venueImg} />
        </div>
        <CardBody>
          <div className="author">
            <a href="#pablo" onClick={(e) => e.preventDefault()}>
              <img alt="..." className="avatar border-gray" src={props.image} />
              <h5 className="title spaced-orange">{props.title}</h5>
            </a>
          </div>

          <p className="description text-center">{props.description}</p>
          <div className="text-center">
            <Button className="btn-round" color="info" type="submit">
              {props.price} HUF
            </Button>
          </div>
        </CardBody>
        <CardFooter>
          <hr />
          <div className="button-container">
            <Row>
              <Col className="ml-auto" lg="3" md="6" xs="6">
                <h6>{props.date}</h6>
              </Col>
              <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                <h6>{props.band.name}</h6>
              </Col>
              <Col className="mr-auto" lg="3">
                <h6>{props.venue.name}</h6>
              </Col>
            </Row>
          </div>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default Event;
