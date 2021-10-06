import React from "react";
import { backendRoutes } from "routes.js";
import { ApiRequestHandler } from "ApiRequestHandler";

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

const LoginForm = (props) => {
  const requestUrl = backendRoutes.auth.loginUrl;
  const attemptLogin = (e) => {
    e.preventDefault();
    const userCredentials = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    ApiRequestHandler.postLogin(requestUrl, userCredentials, props.setUserLogin)
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
