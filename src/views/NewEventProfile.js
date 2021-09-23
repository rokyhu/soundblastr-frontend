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

const getListOfBandsApiUrl = "http://localhost:8080/band/all";
const getListOfVenuesApiUrl = "http://localhost:8080/venue/all";
const saveNewEventURL = "http://localhost:8080/event/new";

function EventProfile() {
  const [listOfBands, setListOfBands] = useState([]);
  const [listOfVenues, setListOfVenues] = useState([]);
  const [date, setDate] = useState();
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState("Title");
  const [description, setDescription] = useState("Description");
  const [image, setImage] = useState("Image");
  const [error, setError] = useState({});
  const [bandDropdownOpen, setBandDropdownOpen] = useState(false);
  const [selectedBand, setSelectedBand] = useState({});
  const [selectedVenue, setSelectedVenue] = useState({});
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
    var today = new Date();
    setDate(
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    );
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
    setSelectedBand(band);
    setBandDropdownSelection(e.currentTarget.textContent);
  };

  const changeSelectedVenue = (e, venue) => {
    setSelectedVenue(venue);
    setVenueDropdownSelection(e.currentTarget.textContent);
  };

  const titleInputChange = (e) => {
    setTitle(e.currentTarget.value);
  };
  const dateInputChange = (e) => {
    setTitle(e.currentTarget.value);
  };

  const priceInputChange = (e) => {
    setPrice(e.currentTarget.value);
  };

  const urlInputChange = (e) => {
    setImage(e.currentTarget.value);
  };

  const descriptionInputChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const saveNewEvent = async (e) => {
    e.preventDefault();

    const newEvent = {
      title: e.target.title.value,
      date: e.target.date.value,
      ticketPrice: e.target.price.value,
      description: e.target.description.value,
      imageUrl: e.target.imageURL.value,
      bandId: selectedBand.id,
      venueId: selectedVenue.id,
    };
    await axios.post(saveNewEventURL, newEvent);
    history.push("/admin/events");
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  alt="NO EYE-MAGES"
                  src={listOfVenues.length > 0 ? selectedVenue.imageUrl : ""}
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="NO PIC"
                      className="avatar border-gray"
                      src={image}
                    />
                    <h5 className="title">{title}</h5>
                  </a>
                </div>
                <p className="description text-center">{description}</p>
                <p className="description text-center">Price: {price}</p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h6>{date}</h6>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h6>{bandDropdownSelection}</h6>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h6>{venueDropdownSelection}</h6>
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
                <Form onSubmit={saveNewEvent}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                          onBlur={titleInputChange}
                          defaultValue="Title"
                          placeholder={title}
                          type="text"
                          name="title"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Date</label>
                        <Input
                          onBlur={dateInputChange}
                          defaultValue={date}
                          placeholder="Date"
                          type="date"
                          name="date"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">Price</label>
                        <Input
                          onBlur={priceInputChange}
                          defaultValue={price}
                          placeholder="Price"
                          type="text"
                          name="price"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Image URL</label>
                        <Input
                          onBlur={urlInputChange}
                          defaultValue={"URL"}
                          placeholder="Image URL"
                          type="text"
                          name="imageURL"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
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
                          onBlur={descriptionInputChange}
                          defaultValue="Description"
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

export default EventProfile;
