import React, { useEffect, useState, useCallback } from "react";
import { ApiRequestHandler } from "ApiRequestHandler";
import { backendRoutes } from "routes";
import { useAlert } from "react-alert";

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

function EventProfile(props) {
  const venueDefaultImage = require("../assets/img/venue-cover.jpg").default;
  const bandDefaultImage = require("../assets/img/band-cover.jpeg").default;
  const alert = useAlert();
  const [event, setEvent] = useState({ venue: { id: 0 }, band: { id: 0 } });
  const [listOfBands, setListOfBands] = useState([]);
  const [listOfVenues, setListOfVenues] = useState([]);
  const [error, setError] = useState({});
  const [bandDropdownOpen, setBandDropdownOpen] = useState(false);
  const [selectedBandId, setSelectedBandId] = useState();
  const [selectedVenueId, setSelectedVenueId] = useState();
  const [bandDropdownSelection, setBandDropdownSelection] = useState();
  const [venueDropdownSelection, setVenueDropdownSelection] = useState();
  const [venueDropdownOpen, setVenueDropdownOpen] = useState(false);
  const toggleBandDropdown = () =>
    setBandDropdownOpen((prevState) => !prevState);
  const toggleVenueDropdown = () =>
    setVenueDropdownOpen((prevState) => !prevState);
  const refreshCallback = props.refreshAfterDelete;

  const requestUrlSingleEvent = backendRoutes.event.base.concat(props.id);
  const requestUrlAllBands = backendRoutes.band.all;
  const requestUrlAllVenues = backendRoutes.venue.all;

  const fetchData = useCallback(() => {
    ApiRequestHandler.get(requestUrlSingleEvent, setEvent, setError);
  }, [requestUrlSingleEvent]);

  const displayError = useCallback(
    (e) => {
      alert.error(e);
    },
    [alert]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setBandDropdownSelection(event.band.name);
    setSelectedBandId(event.band.id);
    setVenueDropdownSelection(event.venue.name);
    setSelectedVenueId(event.venue.id);
  }, [event]);

  useEffect(() => {
    ApiRequestHandler.get(requestUrlAllBands, setListOfBands, setError);
  }, [error.message, requestUrlAllBands]);

  useEffect(() => {
    ApiRequestHandler.get(requestUrlAllVenues, setListOfVenues, setError);
  }, [error.message, requestUrlAllVenues]);

  const refreshAfterDelete = () => {
    alert.success("Event successfully deleted!");
    refreshCallback();
  };

  const refreshAfterUpdate = () => {
    alert.success("Event successfully updated!");
    fetchData();
  };

  const changeSelectedBand = (e, band) => {
    setSelectedBandId(band.id);
    setBandDropdownSelection(e.currentTarget.textContent);
  };

  const changeSelectedVenue = (e, band) => {
    setSelectedVenueId(band.id);
    setVenueDropdownSelection(e.currentTarget.textContent);
  };

  const updateEvent = (e) => {
    e.preventDefault();

    const updatedEvent = {
      title: e.target.title.value,
      date: e.target.date.value,
      ticketPrice: e.target.ticketPrice.value,
      description: e.target.description.value,
      imageUrl: e.target.imageURL.value,
      bandId: selectedBandId,
      venueId: selectedVenueId,
    };
    if (
      Object.keys(updatedEvent).some(
        (e) => updatedEvent[e] === null || updatedEvent[e] === ""
      )
    ) {
      console.log("some form elements weren't filled in!");
    } else {
      ApiRequestHandler.put(
        requestUrlSingleEvent,
        updatedEvent,
        refreshAfterUpdate,
        displayError
      );
    }
  };

  const deleteEvent = (e) => {
    e.preventDefault();
    ApiRequestHandler.delete(
      requestUrlSingleEvent,
      refreshAfterDelete,
      displayError
    );
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  className="card-image"
                  alt="event venue cover"
                  src={
                    event.venue.imageUrl
                      ? event.venue.imageUrl
                      : venueDefaultImage
                  }
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={event.imageUrl ? event.imageUrl : bandDefaultImage}
                    />
                    <h5 className="title spaced-orange">{event.title}</h5>
                  </a>
                </div>
                <p className="description text-center">{event.description}</p>
                <div className="text-center">
                  <Button className="btn-round" color="info" type="submit">
                    {event.ticketPrice} HUF
                  </Button>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container d-flex even-spacing">
                  <p className="mx-2">{event.date}</p>
                  <p className="mx-2">{event.band.name}</p>
                  <p className="mx-2">{event.venue.name}</p>
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
                <Form onSubmit={updateEvent}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                          defaultValue={event.title}
                          placeholder="Title"
                          type="text"
                          name="title"
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
                          name="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Ticket Price (HUF)
                        </label>
                        <Input
                          defaultValue={event.ticketPrice}
                          placeholder="Ticket Price"
                          type="number"
                          name="ticketPrice"
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
                          name="imageURL"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <span>Band:</span>
                      <Dropdown
                        isOpen={bandDropdownOpen}
                        toggle={toggleBandDropdown}
                        name="band"
                      >
                        <DropdownToggle caret>
                          {bandDropdownSelection}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>Available bands</DropdownItem>
                          {listOfBands.map((band) => (
                            <DropdownItem
                              onClick={(e) => {
                                changeSelectedBand(e, band);
                              }}
                              key={band.id}
                            >
                              {band.name}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </Col>
                    <Col className="pr-1" md="4">
                      <span>Venue:</span>
                      <Dropdown
                        isOpen={venueDropdownOpen}
                        toggle={toggleVenueDropdown}
                        name="venue"
                      >
                        <DropdownToggle caret>
                          {venueDropdownSelection}
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem header>Available venues</DropdownItem>
                          {listOfVenues.map((venue) => (
                            <DropdownItem
                              onClick={(e) => {
                                changeSelectedVenue(e, venue);
                              }}
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
                        Update
                      </Button>
                      <Button
                        onClick={deleteEvent}
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
