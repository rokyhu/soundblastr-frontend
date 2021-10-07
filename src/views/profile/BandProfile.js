import React from "react";
import { useState, useEffect, useCallback } from 'react';
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
import GenreSelection from "./GenreSelection";

function BandProfile(props) {

  const requestUrl = backendRoutes.band.base.concat(props.id);
  const fetchDataCallback = props.fetchData;
  const [genresList, setGenresList] = useState([]);

    const [band, setBand] = useState({
        name: null,
        genres: {
            all: [],
            selected: [],
        },
        imageUrl: null,
        description: null,
    });
    const [error, setError] = useState('');

    const assembleBand = (result) => {
        setBand({
            name: result.name,
            genres: {
                all: result.genreSelection.all,
                selected:  result.genreSelection.selected,
            },
            imageUrl: result.imageUrl,
            description: result.description,
          })
      }

    const fetchData = useCallback(() => {
        ApiRequestHandler.get(requestUrl, assembleBand, setError);
    }, [requestUrl]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const deleteEvent = (e) => {
        e.preventDefault();
        ApiRequestHandler.delete(requestUrl, fetchDataCallback, setError);
    };

    const updateBand = (e) => {
      e.preventDefault();
      const genres = [];
      genresList.forEach(g => genres.push(g.tag))
      const updatedBand = {
        name: e.target.name.value,
        genres: genres,
        imageUrl: e.target.imageUrl.value,
        description: e.target.description.value,
      };
      ApiRequestHandler.put(requestUrl, updatedBand, fetchData, setError);
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
                <img
                  alt={band.imageUrl}
                  src={band.imageUrl}
                />
              </div>
              <CardBody>
                <div>
                <h5 className="title text-center spaced-orange">{band.name}</h5>
                </div>
                <p className="description text-center">
                {band.description}
                </p>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit Band Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={updateBand}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                      <label>Band</label>
                        <Input
                          defaultValue={band.name}
                          placeholder="Band Name"
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
                          defaultValue={band.imageUrl}
                          placeholder="url"
                          type="text"
                          name="imageUrl"
                        />
                      </FormGroup>
                  </Col>
                  </Row>
                  <Row>
                  <Col md="12">
                      <FormGroup>
                        <label>Genres</label>
                        <GenreSelection genresAll={band.genres.all} genresSelected={band.genres.selected} onClick={setGenresList}/>
                      </FormGroup>
                  </Col>
                  </Row>         
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Description</label>
                        <Input
                          type="textarea"
                          defaultValue={band.description}
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
                        Update Band
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
    )}
    </>
  );
}

export default BandProfile;