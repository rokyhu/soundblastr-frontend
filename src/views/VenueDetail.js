import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';

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

    const baseUrl = "http://localhost:8080/venue/"

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
        }
    });
    const [error, setError] = useState('');
    const { zipcode, city, street, houseNr } = venue.address;
    
    useEffect(() => {
        axios
            .get(baseUrl + props.id)
            .then((res) => {
                setVenue({
                    id: res.data.id,
                    description: res.data.description,
                    capacity: res.data.capacity,
                    imageUrl:  res.data.imageUrl,
                    name: res.data.name,
                    address: {
                        city: res.data.address.city,
                        zipcode: res.data.address.zipcode,
                        street: res.data.address.street,
                        houseNr: res.data.address.houseNr,
                    }
                });
            })
            .catch((err) => {
              setError(err.message)
            })
        }, [props.id]);

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
                <img
                  alt={venue.imageUrl}
                  src={venue.imageUrl}
                />
              </div>
              <CardBody>
                <div>
                <h5 className="title text-center spaced-orange">{venue.name}</h5>
                    <p className="description text-center">{zipcode + ", " + city + ", " + street + ", " + houseNr}</p>
                </div>
                <p className="description text-center">
                {venue.description}
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container d-flex even-spacing">
                   Capactity: {venue.capacity}
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
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                      <label>Company</label>
                        <Input
                          defaultValue={venue.name}
                          placeholder="Company Name"
                          type="text"
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
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue={venue.address.city}
                          placeholder="City"
                          type="text"
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
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input
                            defaultValue={venue.address.zipcode}
                            placeholder="ZIP Code"
                            type="number" />
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
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        onClick={(e) => e.preventDefault()}
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
