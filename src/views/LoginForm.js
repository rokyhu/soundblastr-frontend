import React from "react";
import axios from "axios";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

const loginUrl = "http://localhost:8080/login";

const LoginForm = (props) => {
  const attemptLogin = (e) => {
    e.preventDefault();
    const userCredentials = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    axios.post(loginUrl, userCredentials).then((res) => {
      if (
        res.status === 200 &&
        res.data.hasOwnProperty("username") &&
        res.data.hasOwnProperty("roles") &&
        res.data.hasOwnProperty("token")
      ) {
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("roles", res.data.roles);
        localStorage.setItem("token", res.data.token);
      }
    });
    props.setLocalStorageChanged(true);
  };

  return (
    <>
      <div className="content align-items-center">
        <Row className="justify-content-md-center">
          <Col md="5">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Login</CardTitle>
              </CardHeader>
              <CardBody>
                <Form onSubmit={attemptLogin}>
                  <Row>
                    <Col className="pr-20 pl-20">
                      <FormGroup>
                        <label>Username</label>
                        <Input type="text" name="username" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-20 pl-20">
                      <FormGroup>
                        <label>Password</label>
                        <Input type="password" name="password" />
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
                        Submit
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
};

export default LoginForm;
