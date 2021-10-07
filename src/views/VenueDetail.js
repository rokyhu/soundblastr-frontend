import React from "react";
import { useState, useEffect, useCallback } from "react";
import { backendRoutes } from "routes";
import { ApiRequestHandler } from "ApiRequestHandler";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function VenueDetail(props) {
  const requestUrl = backendRoutes.venue.base.concat(props.id);
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const [venue, setVenue] = useState({
    id: null,
    description: null,
    capacity: null,
    imageUrl: null,
    name: null,
    address: {
      city: null,
      zipcode: null,
      street: null,
      houseNr: null,
    },
  });
  const [error, setError] = useState("");
  const { zipcode, city, street, houseNr } = venue.address;

  const assembleVenue = (result) => {
    setVenue({
      id: result.id,
      description: result.description,
      capacity: result.capacity,
      imageUrl: result.imageUrl,
      name: result.name,
      address: {
        city: result.address.city,
        zipcode: result.address.zipcode,
        street: result.address.street,
        houseNr: result.address.houseNr,
      },
    });
  };

  const fetchData = useCallback(() => {
    ApiRequestHandler.get(requestUrl, assembleVenue, setError);
  }, [requestUrl]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateVenue = (e) => {
    e.preventDefault();
    const updatedVenue = {
      name: e.target.name.value,
      capacity: e.target.capacity.value,
      imageUrl: e.target.imageUrl.value,
      address: {
        city: e.target.city.value,
        street: e.target.street.value,
        houseNr: e.target.houseNr.value,
        zipcode: e.target.zipcode.value,
      },
      description: e.target.description.value,
    };
    ApiRequestHandler.put(requestUrl, updatedVenue, fetchData, setError);
    setTriggerUpdate(!triggerUpdate);
  };

  return (
    <>
      {error ? (
        <div>
          An error occured while fetching the requested information. Please try
          again!
        </div>
      ) : (
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img alt={venue.imageUrl} src={venue.imageUrl} />
                </div>
                <CardBody>
                  <div>
                    <h5 className="title text-center spaced-orange">
                      {venue.name}
                    </h5>
                    <p className="description text-center">
                      {zipcode + ", " + city + ", " + street + ", " + houseNr}
                    </p>
                  </div>
                  <p className="description text-center">{venue.description}</p>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container d-flex even-spacing">
                    Capacity: {venue.capacity}
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Edit Venue Profile</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={updateVenue}>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Venue</label>
                          <Input
                            defaultValue={venue.name}
                            placeholder="Company Name"
                            type="text"
                            name="name"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Capacity</label>
                          <Input
                            defaultValue={venue.capacity}
                            placeholder="Capacity"
                            type="text"
                            name="capacity"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Image URL</label>
                          <Input
                            defaultValue={venue.imageUrl}
                            placeholder="url"
                            type="text"
                            name="imageUrl"
                          />
                        </FormGroup>
                      </Col>
                      <Col md="12">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue={venue.address.city}
                            placeholder="City"
                            type="text"
                            name="city"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>Street</label>
                          <Input
                            defaultValue={venue.address.street}
                            placeholder="Street"
                            type="text"
                            name="street"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>House number</label>
                          <Input
                            defaultValue={venue.address.houseNr}
                            placeholder="House number"
                            type="text"
                            name="houseNr"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input
                            defaultValue={venue.address.zipcode}
                            placeholder="ZIP Code"
                            type="number"
                            name="zipcode"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Description</label>
                          <Input
                            type="textarea"
                            defaultValue={venue.description}
                            name="description"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                          color="primary"
                          type="submit"
                        >
                          Update Venue
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default VenueDetail;
