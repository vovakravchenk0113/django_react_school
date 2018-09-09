import React, { Component } from 'react';
import SchoolService from '../services/SchoolService';

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
} from 'reactstrap';

import Page from 'components/Page';

class AddSchoolPage extends Component {

  constructor(props) {
    super(props);
    this.state = {school_name: ''};
    this.addSchoolService = new SchoolService();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(event) {
    this.setState({name: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    this.addSchoolService.sendSchoolName(this.state.school_name);
    window.location.reload();
    this.props.history.push('/index');
  }
  render() { 
    return (
      <Page title="Add school" breadcrumbs={[{ name: 'Add school  ', active: true }]}>
        <Row>
          <Col xl={12} lg={12} md={12}>
            <Card>
              <CardHeader>Add School Form</CardHeader>
              <CardBody>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="exampleSchool">School</Label>
                    <Input
                      type="text"
                      name="school"
                      placeholder="School name"
                      value={this.state.name}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                  <FormGroup check row>
                      <Button type="submit">Add</Button>
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
 
export default AddSchoolPage;
