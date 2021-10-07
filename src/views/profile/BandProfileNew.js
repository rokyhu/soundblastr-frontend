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
} from "reactstrap";

import GenreSelection from "./GenreSelection";

function EventProfile() {
  const bandDefaultImage = require("../../assets/img/venue-cover.jpg").default;
  const bandDefaultCover = require("assets/img/bands-image.jpg").default;
  const requestUrlAddBand = backendRoutes.band.base.concat("new");
  const requestUrlGetGenres = backendRoutes.genre.all;

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [genresList, setGenresList] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [error, setError] = useState({});
  const history = useHistory();

  useEffect(() => {
    const genres = [];
    genresList.forEach((g) => genres.push(g.tag));
    setSelectedGenres(genres);
  }, [genresList]);

  useEffect(() => {
    ApiRequestHandler.get(requestUrlGetGenres, setAllGenres, setError);
  }, [error.message, requestUrlGetGenres]);

  const nameInputChange = (e) => {
    setName(e.currentTarget.value);
    console.log(allGenres);
  };

  const urlInputChange = (e) => {
    setImage(e.currentTarget.value);
  };

  const descriptionInputChange = (e) => {
    setDescription(e.currentTarget.value);
  };

  const saveNewBand = () => {
    const newBand = {
      name: name,
      genres: selectedGenres,
      imageUrl: image,
      description: description,
    };

    if (
      Object.keys(newBand).some((e) => newBand[e] === null || newBand[e] === "")
    ) {
      console.log("some form elements weren't filled in!");
    } else {
      ApiRequestHandler.post(requestUrlAddBand, newBand, setError);
      history.push("/admin/bands");
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
                      {name ? name : "Add event name"}
                    </h5>
                  </a>
                </div>
                <p className="description text-center">
                  {description ? description : "Add event Description"}
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container d-flex even-spacing">
                  {selectedGenres.map((genre, i) => (
                    <div className="max30w simple-margin overflow-none" key={i}>
                      <button className="button-cstm">{genre}</button>
                    </div>
                  ))}
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Add Band Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={saveNewBand}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          onChange={nameInputChange}
                          placeholder="Name"
                          type="text"
                          name="name"
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
                    <Col md="12">
                      <FormGroup>
                        <label>Genres</label>
                        <GenreSelection
                          genresAll={allGenres}
                          genresSelected={selectedGenres}
                          onClick={setGenresList}
                        />
                      </FormGroup>
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
