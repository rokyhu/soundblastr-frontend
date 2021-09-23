import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
const updateEventUrl = "http://localhost:8080/event/";
const deleteEventUrl = "http://localhost:8080/event/1";

function EventProfile() {
  const [updatingEvent, setUpdatingEvent] = useState(false);
  const [event, setEvent] = useState({ venue: { id: 0 }, band: { id: 0 } });
  const [listOfBands, setListOfBands] = useState([]);
  const [listOfVenues, setListOfVenues] = useState([]);
  const [error, setError] = useState({});
  const [bandDropdownOpen, setBandDropdownOpen] = useState(false);
  const [selectedBandId, setSelectedBandId] = useState(0);
  const [selectedVenueId, setSelectedVenueId] = useState(0);
  const [bandDropdownSelection, setBandDropdownSelection] =
    useState("Select Band");
  const [venueDropdownSelection, setVenueDropdownSelection] =
    useState("Select Venue");
  const [venueDropdownOpen, setVenueDropdownOpen] = useState(false);
  const toggleBandDropdown = () =>
    setBandDropdownOpen((prevState) => !prevState);
  const toggleVenueDropdown = () =>
    setVenueDropdownOpen((prevState) => !prevState);

  const history = useHistory();

  useEffect(() => {
    axios
      .get(getEventApiUrl)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [error.message, updatingEvent]);

  useEffect(() => {
    setBandDropdownSelection(event.band.name);
    setSelectedBandId(event.band.id);
    setVenueDropdownSelection(event.venue.name);
    setSelectedVenueId(event.venue.id);
  }, [event]);

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

  const changeSelectedBand = (e, band) => {
    setSelectedBandId(band.id);
    setBandDropdownSelection(e.currentTarget.textContent);
  };

  const changeSelectedVenue = (e, band) => {
    setSelectedVenueId(band.id);
    setVenueDropdownSelection(e.currentTarget.textContent);
  };

  const updateEvent = async (e) => {
    setUpdatingEvent(false);
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
    await axios.put(updateEventUrl + event.id, updatedEvent);
    setUpdatingEvent(true);
  };

  const deleteEvent = (e) => {
    e.preventDefault();
    axios.delete(deleteEventUrl);
    history.push("/admin/events");
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
                <div className="text-center">
                  <Button className="btn-round" color="info" type="submit">
                    {event.ticketPrice} HUF
                  </Button>
                </div>
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
