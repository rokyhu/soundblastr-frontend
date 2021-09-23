import React, { useEffect, useState } from "react";
import axios from "axios";

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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const getEventApiUrl = "http://localhost:8080/event/1";
const getListOfBandsApiUrl = "http://localhost:8080/band/all";
const getListOfVenuesApiUrl = "http://localhost:8080/venue/all";

function EventProfile() {
  const [event, setEvent] = useState({ venue: {}, band: {} });
  const [listOfBands, setListOfBands] = useState([]);
  const [listOfVenues, setListOfVenues] = useState([]);
  const [error, setError] = useState({});
  const [bandDropdownOpen, setBandDropdownOpen] = useState(false);
  const [bandDropdownSelection, setBandDropdownSelection] =
    useState("Select Band");
  const [venueDropdownSelection, setVenueDropdownSelection] =
    useState("Select Venue");
  const [venueDropdownOpen, setVenueDropdownOpen] = useState(false);

  const toggleBandDropdown = () =>
    setBandDropdownOpen((prevState) => !prevState);
  const toggleVenueDropdown = () =>
    setVenueDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    axios
      .get(getEventApiUrl)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [error.message]);

  useEffect(() => {
    axios
      .get(getListOfBandsApiUrl)
      .then((res) => {
        setListOfBands(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [error.message]);

  useEffect(() => {
    axios
      .get(getListOfVenuesApiUrl)
      .then((res) => {
        setListOfVenues(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [error.message]);

  const changeBandDropdownValue = (e) => {
    setBandDropdownSelection(e.currentTarget.textContent);
  };

  const changeVenueDropdownValue = (e) => {
    setVenueDropdownSelection(e.currentTarget.textContent);
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img alt="..." src={event.venue.imageUrl} />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={event.imageUrl}
                    />
                    <h5 className="title">{event.title}</h5>
                  </a>
                </div>
                <p className="description text-center">{event.description}</p>
                <p className="description text-center">Price: {event.price}</p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h6>{event.date}</h6>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h6>{event.band.name}</h6>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h6>{event.venue.name}</h6>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit Details</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                          defaultValue={event.title}
                          placeholder="Title"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Date</label>
                        <Input
                          defaultValue={event.date}
                          placeholder="Date"
                          type="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Price</label>
                        <Input
                          defaultValue={event.price}
                          placeholder="Price"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Image URL</label>
                        <Input
                          defaultValue={event.imageUrl}
                          placeholder="Image URL"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Dropdown
                        isOpen={bandDropdownOpen}
                        toggle={toggleBandDropdown}
                      >
                        <DropdownToggle caret>
                          {bandDropdownSelection}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>Available bands</DropdownItem>
                          {listOfBands.map((band) => (
                            <DropdownItem
                              onClick={changeBandDropdownValue}
                              key={band.id}
                            >
                              {band.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                    <Col className="pr-1" md="4">
                      <Dropdown
                        isOpen={venueDropdownOpen}
                        toggle={toggleVenueDropdown}
                      >
                        <DropdownToggle caret>
                          {venueDropdownSelection}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>Available venues</DropdownItem>
                          {listOfVenues.map((venue) => (
                            <DropdownItem
                              onClick={changeVenueDropdownValue}
                              key={venue.id}
                            >
                              {venue.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                          defaultValue={event.description}
                          placeholder="Description"
                          type="text"
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
                        Update
                      </Button>
                      <Button
                        className="btn-round"
                        color="danger"
                        type="submit"
                      >
                        Delete
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

export default EventProfile;