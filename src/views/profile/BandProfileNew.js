import React, { useEffect, useState } from "react";
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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function EventProfile() {
  const bandDefaultImage = require("../../assets/img/venue-cover.jpg").default;
  const bandDefaultCover = require("assets/img/bands-image.jpg").default;

  const [listOfBands, setListOfBands] = useState([]);
  const [listOfVenues, setListOfVenues] = useState([]);
  const [date, setDate] = useState();
  const [price, setPrice] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [error, setError] = useState({});
  const [bandDropdownOpen, setBandDropdownOpen] = useState(false);
  const [selectedBand, setSelectedBand] = useState({
    id: null,
  });
  const [selectedVenue, setSelectedVenue] = useState({
    imageUrl: null,
    id: null,
  });
  const [bandDropdownSelection, setBandDropdownSelection] = useState();
  const [venueDropdownSelection, setVenueDropdownSelection] = useState();
  const [venueDropdownOpen, setVenueDropdownOpen] = useState(false);
  const toggleBandDropdown = () =>
    setBandDropdownOpen((prevState) => !prevState);
  const toggleVenueDropdown = () =>
    setVenueDropdownOpen((prevState) => !prevState);
  const history = useHistory();

  const requestUrlAddEvent = backendRoutes.event.base.concat("new");
  const requestUrlAllBands = backendRoutes.band.all;
  const requestUrlAllVenues = backendRoutes.venue.all;

  useEffect(() => {
    ApiRequestHandler.get(requestUrlAllBands, setListOfBands, setError);
  }, [error.message, requestUrlAllBands]);

  useEffect(() => {
    ApiRequestHandler.get(requestUrlAllVenues, setListOfVenues, setError);
  }, [error.message, requestUrlAllVenues]);

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
    setDate(e.currentTarget.value);
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
      bandId: selectedBand.hasOwnProperty("id") ? selectedBand.id : null,
      venueId: selectedVenue.hasOwnProperty("id") ? selectedVenue.id : null,
    };

    if (
      Object.keys(newEvent).some(
        (e) => newEvent[e] === null || newEvent[e] === ""
      )
    ) {
      console.log("some form elements weren't filled in!");
    } else {
      ApiRequestHandler.post(requestUrlAddEvent, newEvent, setError);
      history.push("/admin/events");
    }
  };

  const getToday = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    return yyyy + "-" + mm + "-" + dd;
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img alt="band default cover" src={bandDefaultCover} />
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
                      {title ? title : "Add event title"}
                    </h5>
                  </a>
                </div>
                <p className="description text-center">
                  {description ? description : "Add event Description"}
                </p>
                <div className="text-center">
                  <Button className="btn-round" color="info" type="submit">
                    {price ? price : 0} HUF
                  </Button>
                </div>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container d-flex even-spacing">
                  <p className="mx-2">{date ? date : getToday()}</p>
                  <p className="mx-2">
                    {bandDropdownSelection
                      ? bandDropdownSelection
                      : "Select Band"}
                  </p>
                  <p className="mx-2">
                    {venueDropdownSelection
                      ? venueDropdownSelection
                      : "Select Venue"}
                  </p>
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
                          onChange={titleInputChange}
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
                          onChange={dateInputChange}
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
                          onChange={priceInputChange}
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
                          {bandDropdownSelection
                            ? bandDropdownSelection
                            : "Select Band"}
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
                          {venueDropdownSelection
                            ? venueDropdownSelection
                            : "Select Venue"}
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
