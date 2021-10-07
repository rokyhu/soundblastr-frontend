import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ApiRequestHandler } from "ApiRequestHandler";
import { backendRoutes } from "routes";

// reactstrap components
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

function VenueDetailNew() {
  const venueDefaultImage = require("../assets/img/venue-cover.jpg").default;
  const bandDefaultImage = require("../assets/img/band-cover.jpeg").default;

  const [name, setName] = useState();
  const [capacity, setCapacity] = useState();
  const [image, setImage] = useState();
  const [addressCity, setAddressCity] = useState();
  const [addressStreet, setAddressStreet] = useState();
  const [addressZipCode, setAddressZipCode] = useState();
  const [addressHouseNr, setAddressHouseNr] = useState();
  const [description, setDescription] = useState();

  const [setError] = useState({});
  const history = useHistory();

  const requestUrlAddVenue = backendRoutes.venue.base.concat("new");

  const nameInputChange = (e) => {
    setName(e.currentTarget.value);
  };

  const capacityInputChange = (e) => {
    setCapacity(e.currentTarget.value);
  };

  const urlInputChange = (e) => {
    setImage(e.currentTarget.value);
  };

  const descriptionInputChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const addressCityInputChange = (e) => {
    setAddressCity(e.currentTarget.value);
  };

  const addressZipCodeInputChange = (e) => {
    setAddressZipCode(e.currentTarget.value);
  };

  const addressHouseNrInputChange = (e) => {
    setAddressHouseNr(e.currentTarget.value);
  };

  const addressStreetInputChange = (e) => {
    setAddressStreet(e.currentTarget.value);
  };

  const saveNewVenue = (e) => {
    e.preventDefault();

    const newVenue = {
      name: name,
      capacity: capacity,
      imageUrl: image,
      address: {
        city: addressCity,
        zipcode: addressZipCode,
        street: addressStreet,
        houseNr: addressHouseNr,
      },
      description: description,
    };

    if (
      Object.keys(newVenue).some(
        (e) => newVenue[e] === null || newVenue[e] === ""
      )
    ) {
      console.log("some form elements weren't filled in!");
    } else {
      ApiRequestHandler.post(requestUrlAddVenue, newVenue, setError);
      history.push("/admin/venues");
      history.go();
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img alt="img" src={venueDefaultImage} />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="img"
                      className="avatar border-gray"
                      src={image ? image : bandDefaultImage}
                    />
                    <h5 className="title spaced-orange">
                      {name ? name : "Add venue name"}
                    </h5>
                  </a>
                  <p className="description text-center">
                    {addressZipCode &&
                    addressCity &&
                    addressStreet &&
                    addressHouseNr
                      ? addressZipCode +
                        " " +
                        addressCity +
                        ", " +
                        addressStreet +
                        " " +
                        addressHouseNr
                      : "Add address"}
                  </p>
                </div>
                <p className="description text-center">
                  {description ? description : "Add venue Description"}
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container d-flex even-spacing">
                  Capacity: {capacity ? capacity : "Add venue Capacity"}
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add Venue Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={saveNewVenue}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Venue</label>
                        <Input
                          onChange={nameInputChange}
                          placeholder="Venue"
                          type="text"
                          name="name"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Capacity</label>
                        <Input
                          onChange={capacityInputChange}
                          placeholder="Capacity"
                          type="number"
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
                          onChange={urlInputChange}
                          placeholder="Image URL"
                          type="text"
                          name="imageURL"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          onChange={addressCityInputChange}
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
                          onChange={addressStreetInputChange}
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
                          onChange={addressHouseNrInputChange}
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
                          onChange={addressZipCodeInputChange}
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
                          onChange={descriptionInputChange}
                          placeholder="Description"
                          type="text"
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
                        Save
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default VenueDetailNew;
