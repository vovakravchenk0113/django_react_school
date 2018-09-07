import React, { Component } from 'react';

import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';

import Page from 'components/Page';

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {

      }
    }
  }
  
  render() { 
    return (
      <Page title="Edit Profile" breadcrumbs={[{ name: 'Profile', active: true }]}>
        <Row>
          <Col xl={{ size: 8, offset: 2 }} lg={12} md={12}>
            <Card>
              <CardHeader>Edit Profile</CardHeader>
              <CardBody>
                <Form>
                  <FormGroup row>
                    <Label for="firstName" sm={2}>
                      First Name
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="lastName" sm={2}>
                      Last Name
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="username" sm={2}>
                      Email
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="password1" sm={2}>
                      Password
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="confirmPassword" sm={2}>
                      Confirm Password
                    </Label>
                    <Col sm={10}>
                      <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="imageFile" sm={2}>
                      Photo
                    </Label>
                    <Col sm={10}>
                      <Input type="file" name="file" />
                      <FormText color="muted">
                        You can select the image for your profile.
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label for="checkbox2" sm={2}>
                      Checkbox
                    </Label>
                    <Col sm={{ size: 10 }}>
                      <FormGroup check>
                        <Label check>
                          <Input type="checkbox" id="checkbox2" /> Check me out
                        </Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                      <Button>Save</Button>
                    </Col>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Page>
    );
  }
}
 

export default ProfilePage;
